import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/config/prisma';
import { Prisma, InvoiceStatus } from '@/generated/prisma';

interface Params {
  id: string;
}

// Define a type for InvoiceItem updates
interface InvoiceItemUpdateInput {
  id?: string; // Include ID for existing items to update, omit for new items
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

// Define a type for the PUT request body
interface UpdateInvoiceDto {
  customerId?: string;
  userId?: string;
  issueDate?: string | Date;
  dueDate?: string | Date;
  status?: InvoiceStatus;
  items?: InvoiceItemUpdateInput[]; // Allow updating items
  notes?: string;
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { id } = params;
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        customer: true,
        items: true,
      },
    });
    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }
    return NextResponse.json(invoice);
  } catch (error) {
    console.error(`Error fetching invoice ${id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch invoice' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Params }) {
  const { id } = params;
  try {
    const body = (await request.json()) as UpdateInvoiceDto;
    const { customerId, userId, issueDate, dueDate, status, items, notes } = body;

    // Basic validation: Ensure at least one field is being updated
    if (Object.keys(body).length === 0) {
      return NextResponse.json({ error: 'No fields provided for update.' }, { status: 400 });
    }

    if (items) {
        for (const item of items) {
          if (!item.description || item.quantity == null || item.unitPrice == null ) {
            return NextResponse.json({ error: 'Each invoice item must have description, quantity, and unitPrice.' }, { status: 400 });
          }
          if (typeof item.quantity !== 'number' || item.quantity <= 0) {
            return NextResponse.json({ error: 'Item quantity must be a positive number.' }, { status: 400 });
          }
          if (typeof item.unitPrice !== 'number' || item.unitPrice < 0) {
            return NextResponse.json({ error: 'Item unit price must be a non-negative number.' }, { status: 400 });
          }
        }
    }

    const totalAmount = items ? items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0) : undefined;

    const updatedInvoice = await prisma.$transaction(async (tx) => {
      // 1. Update the Invoice itself
      const invoiceUpdateData: Prisma.InvoiceUpdateInput = {};
      if (customerId) invoiceUpdateData.customer = { connect: { id: customerId } };
      if (userId) invoiceUpdateData.user = { connect: { id: userId } }; // Assuming user relation
      if (issueDate) invoiceUpdateData.issueDate = new Date(issueDate);
      if (dueDate) invoiceUpdateData.dueDate = new Date(dueDate);
      if (status) invoiceUpdateData.status = status;
      if (notes !== undefined) invoiceUpdateData.notes = notes;
      if (totalAmount !== undefined) invoiceUpdateData.totalAmount = totalAmount;


      // 2. Handle Invoice Items: Delete existing and create new ones
      // This is a common simplified approach. More complex logic could be used for partial updates.
      if (items && items.length > 0) {
        await tx.invoiceItem.deleteMany({
          where: { invoiceId: id },
        });
        invoiceUpdateData.items = {
          create: items.map(item => ({
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: item.quantity * item.unitPrice,
          })),
        };
      } else if (items && items.length === 0) {
        // If an empty items array is provided, it means all items should be removed.
         await tx.invoiceItem.deleteMany({
          where: { invoiceId: id },
        });
         invoiceUpdateData.items = { set: [] }; // Disassociate all items
      }

      const result = await tx.invoice.update({
        where: { id },
        data: invoiceUpdateData,
        include: {
          customer: true,
          items: true,
        },
      });
      return result;
    });

    return NextResponse.json(updatedInvoice);
  } catch (error) {
    console.error(`Error updating invoice ${id}:`, error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') { // Record to update not found
        return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
      }
       if (error.code === 'P2003' && error.meta?.field_name === 'customerId') {
        return NextResponse.json({ error: `Customer with ID ${body.customerId} not found.`}, { status: 400});
      }
    }
    return NextResponse.json({ error: 'Failed to update invoice' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  const { id } = params;
  try {
    // Assuming 'onDelete: Cascade' is set in Prisma schema for InvoiceItems related to Invoice.
    // If not, InvoiceItems must be deleted manually first or in a transaction.
    await prisma.invoice.delete({
      where: { id },
    });
    return NextResponse.json(null, { status: 204 }); // No content
  } catch (error) {
    console.error(`Error deleting invoice ${id}:`, error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') { // Record to delete not found
        return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
      }
    }
    return NextResponse.json({ error: 'Failed to delete invoice' }, { status: 500 });
  }
}
