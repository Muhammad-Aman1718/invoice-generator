import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const customers = await prisma.customer.findMany();
    return NextResponse.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, address } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const newCustomer = await prisma.customer.create({
      data: {
        name,
        email,
        phone,
        address,
      },
    });
    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error('Error creating customer:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle specific Prisma errors, e.g., unique constraint violation
      if (error.code === 'P2002') {
        return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
      }
    }
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
  }
}
