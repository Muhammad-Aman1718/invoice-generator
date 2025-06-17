import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@/generated/prisma';

const prisma = new PrismaClient();

interface Params {
  id: string;
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { id } = params;
  try {
    const customer = await prisma.customer.findUnique({
      where: { id },
    });
    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }
    return NextResponse.json(customer);
  } catch (error) {
    console.error(`Error fetching customer ${id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch customer' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Params }) {
  const { id } = params;
  try {
    const body = await request.json();
    const { name, email, phone, address } = body;

    // Basic validation
    if (!name && !email && !phone && !address) {
      return NextResponse.json({ error: 'At least one field must be provided for update' }, { status: 400 });
    }

    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: {
        name,
        email,
        phone,
        address,
      },
    });
    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.error(`Error updating customer ${id}:`, error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') { // Record to update not found
        return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
      }
      if (error.code === 'P2002') { // Unique constraint violation
        return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
      }
    }
    return NextResponse.json({ error: 'Failed to update customer' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  const { id } = params;
  try {
    await prisma.customer.delete({
      where: { id },
    });
    return NextResponse.json(null, { status: 204 }); // No content
  } catch (error) {
    console.error(`Error deleting customer ${id}:`, error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') { // Record to delete not found
        return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
      }
    }
    return NextResponse.json({ error: 'Failed to delete customer' }, { status: 500 });
  }
}
