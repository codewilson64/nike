'use client'

import { Trash2 } from 'lucide-react'

export default function Orders() {
  const orders = [
    {
      id: 1,
      name: "Nike Air Force 1 Mid '07",
      category: "Men's Shoes",
      size: 10,
      quantity: 2,
      price: 98.3,
      status: 'Estimated arrival 24 Sep 2025',
      statusColor: 'text-orange-500',
      image:
        'https://static.nike.com/a/images/t_default/12e2b978-17a9-46f7-a3df-5141c6e4c92d/air-force-1-mid-07-shoes-4ZrjDn.png',
    },
    {
      id: 2,
      name: "Air Max 1 '86 Original",
      category: "Men's Shoes",
      size: 10,
      quantity: 2,
      price: 104.26,
      status: 'Delivered on 04 August',
      statusColor: 'text-green-600',
      image:
        'https://static.nike.com/a/images/t_default/1b2a5c9a-05a5-4675-aef8-f71ebc11dca8/air-max-1-86-og-g-big-kids-shoes.png',
    },
    {
      id: 3,
      name: 'Nike Air Force 1 Low Retro',
      category: "Men's Shoes",
      size: 8,
      quantity: 1,
      price: 185.67,
      status: 'Delivered on 04 August',
      statusColor: 'text-green-600',
      image:
        'https://static.nike.com/a/images/t_default/44f70ec0-f4ee-4d3c-ae71-351b880da6de/air-force-1-low-retro-shoes.png',
    },
  ]

  return (
    <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">My Orders</h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-5 last:border-none"
          >
            <div className="flex items-start gap-4">
              <img
                src={order.image}
                alt={order.name}
                className="w-28 h-28 object-contain rounded-md border"
              />
              <div>
                <p className={`text-sm font-medium ${order.statusColor}`}>{order.status}</p>
                <h3 className="text-gray-900 font-semibold mt-1">{order.name}</h3>
                <p className="text-sm text-gray-500">{order.category}</p>
                <p className="text-sm text-gray-700 mt-1">
                  Size <span className="font-semibold">{order.size}</span> &nbsp; Quantity{' '}
                  <span className="font-semibold">{order.quantity}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-2 mt-4 sm:mt-0">
              <p className="text-gray-900 font-semibold">${order.price.toFixed(2)}</p>
              <button className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm font-medium">
                <Trash2 size={16} />
                Cancel Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
