// src/app/api/seed/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';

export async function GET() {
  await db.insert(products).values([
    { name: 'Nike Air Force 1', description: 'Classic white sneakers', price: '100.00', stock: 50 },
    { name: 'Nike React Element 55', description: 'Comfortable running shoes', price: '130.00', stock: 30 },
    { name: 'Nike Zoom Pegasus', description: 'Performance running gear', price: '120.00', stock: 40 },
    { name: 'Nike Blazer Mid', description: 'Retro basketball shoes', price: '110.00', stock: 25 },
  ]);
  return NextResponse.json({ message: '✅ Seeding complete!' });
}
