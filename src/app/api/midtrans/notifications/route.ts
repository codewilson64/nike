import { NextResponse } from "next/server";
import { PrismaClient, OrderStatus } from "@prisma/client";

const prisma = new PrismaClient();
const MIDTRANS_BASE = process.env.MIDTRANS_BASE_URL!;
const SERVER_KEY = process.env.MIDTRANS_SERVER_KEY!;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const orderId = body.order_id;
    const transactionStatus = body.transaction_status;
    const fraudStatus = body.fraud_status;

    const auth = "Basic " + Buffer.from(`${SERVER_KEY}:`).toString("base64");

    const res = await fetch(`${MIDTRANS_BASE}/v2/${orderId}/status`, {
      headers: { Authorization: auth },
    });

    const data = await res.json();

    let newStatus: OrderStatus = OrderStatus.pending;

    if (transactionStatus === "capture" || transactionStatus === "settlement") {
      newStatus = OrderStatus.paid;
    } else if (
      transactionStatus === "cancel" ||
      transactionStatus === "deny" ||
      transactionStatus === "expire"
    ) {
      newStatus = OrderStatus.cancelled;
    }

    await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Midtrans notification error:", err);
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
