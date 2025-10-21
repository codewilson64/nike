import { NextResponse } from "next/server";
import { PrismaClient, OrderStatus, PaymentStatus, PaymentProvider, PaymentMethod } from "@prisma/client";

const prisma = new PrismaClient();

const MIDTRANS_BASE = process.env.MIDTRANS_BASE_URL!;
const SERVER_KEY = process.env.MIDTRANS_SERVER_KEY!;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { order_id: orderId, transaction_status, fraud_status, payment_type, transaction_id } = body;

    // Fetch latest transaction status from Midtrans to verify
    const auth = "Basic " + Buffer.from(`${SERVER_KEY}:`).toString("base64");

    const res = await fetch(`${MIDTRANS_BASE}/v2/${orderId}/status`, {
      headers: { Authorization: auth },
    });

    const data = await res.json();

    // Determine new order and payment status
    let orderStatus: OrderStatus = OrderStatus.pending;
    let paymentStatus: PaymentStatus = PaymentStatus.initiated;

    if (transaction_status === "capture" || transaction_status === "settlement") {
      orderStatus = OrderStatus.paid;
      paymentStatus = PaymentStatus.completed;
    } else if (
      transaction_status === "cancel" ||
      transaction_status === "deny" ||
      transaction_status === "expire"
    ) {
      orderStatus = OrderStatus.cancelled;
      paymentStatus = PaymentStatus.failed;
    }

    // Try to find existing payment
    const existingPayment = await prisma.payment.findFirst({
      where: { orderId },
    });

    if(!existingPayment) {
      throw new Error("Payment is empty")
    }

    if (existingPayment) {
      await prisma.payment.update({
        where: { id: existingPayment.id },
        data: {
          status: paymentStatus,
          method: payment_type as PaymentMethod, // Midtrans sends lowercase (e.g. 'qris', 'bank_transfer')
          provider: PaymentProvider.midtrans,
          transactionId: transaction_id,
          rawResponse: data,
          paidAt: paymentStatus === PaymentStatus.completed ? new Date() : null,
        },
      });
    }

    // Update order
    await prisma.order.update({
      where: { id: orderId },
      data: { status: orderStatus },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("❌ Midtrans notification error:", err);
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
