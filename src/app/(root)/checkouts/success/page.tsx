import Link from "next/link"
import { Suspense } from "react"

export default async function SuccessPage({ params }: { params: Promise<{ order_id?: string }> }) {
  const { order_id } = await params
  
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <h1 className="text-2xl font-bold text-green-600">Payment Successful 🎉</h1>
          <p className="mt-2 text-gray-700">
            Thank you for your payment! Your order has been successfully processed.
          </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/orders"
                className="block w-full bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all text-center"
              >
                View My Orders
              </Link>
              <Link
                href="/"
                className="block w-full bg-dark-900 text-white px-6 py-3 rounded-lg hover:bg-dark-800 transition-all text-center"
              >
                Continue Shopping
              </Link>             
          </div>
        </div>
      </div>
    </Suspense>
  )
}
