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
          <p className="mt-4 text-sm text-gray-500">Order ID: {order_id}</p>

          <a
            href="/orders"
            className="mt-6 inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            View My Orders
          </a>
        </div>
      </div>
    </Suspense>
  )
}
