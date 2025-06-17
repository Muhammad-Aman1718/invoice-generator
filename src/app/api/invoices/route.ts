import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/config/prisma';
import { Prisma, InvoiceStatus } from '@/generated/prisma'; // Import InvoiceStatus

// Define a type for InvoiceItem creation, as it's nested
interface InvoiceItemCreateInput {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

// Define a type for the POST request body
interface CreateInvoiceDto {
  customerId: string;
  userId?: string; // Optional: if you associate invoices with users
  issueDate: string | Date;
  dueDate: string | Date;
  status?: InvoiceStatus; // Optional: default to DRAFT or PENDING
  items: InvoiceItemCreateInput[];
  notes?: string;
}

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        customer: true,
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateInvoiceDto;
    const { customerId, userId, issueDate, dueDate, status, items, notes } = body;

    // Basic validation
    if (!customerId || !issueDate || !dueDate || !items || items.length === 0) {
      return NextResponse.json({ error: 'Missing required fields: customerId, issueDate, dueDate, and at least one item are required.' }, { status: 400 });
    }

    // Validate each item
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

    const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

    // Use Prisma transaction
    const newInvoice = await prisma.$transaction(async (tx) => {
      const createdInvoice = await tx.invoice.create({
        data: {
          customerId,
          userId, // This will be null if not provided
          issueDate: new Date(issueDate),
          dueDate: new Date(dueDate),
          status: status || InvoiceStatus.DRAFT, // Default status
          totalAmount,
          notes,
          items: {
            create: items.map(item => ({
              description: item.description,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              total: item.quantity * item.unitPrice, // Calculate total for each item
            })),
          },
        },
        include: {
          customer: true,
          items: true,
        },
      });
      return createdInvoice;
    });

    return NextResponse.json(newInvoice, { status: 201 });
  } catch (error) {
    console.error('Error creating invoice:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // e.g., Foreign key constraint failed
      if (error.code === 'P2003') {
        return NextResponse.json({ error: `Invalid customerId: ${body.customerId} does not exist.` }, { status: 400 });
      }
    }
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
  }
}
