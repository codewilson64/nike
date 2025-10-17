'use client'

import { useState } from 'react'
import { User, Package, ShoppingBag, LogOut, Trash2 } from 'lucide-react'
import Orders from './Orders'
import { useCartStore } from 'app/zustand/useCartStore'
import { useRouter } from 'next/navigation'

type Logout = () => Promise<void>

export default function ProfilePage({ logout }: { logout: Logout }) {
  const [activeTab, setActiveTab] = useState('info')
  const router = useRouter()
  const clearCart = useCartStore((state) => state.clearCart)

  const handleLogout = async () => {
    await logout() 
    clearCart() 
    router.push('/')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-6">
          <div className="flex flex-col items-center mb-6 md:mb-8">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-gray-600">
              F
            </div>
            <p className="mt-2 font-medium text-lg">Faizan</p>
            <p className="text-sm text-gray-500 text-center break-all">
              developingfaizan@gmail.com
            </p>
          </div>

          <nav className="flex md:flex-col justify-center md:justify-start flex-wrap gap-2 md:gap-5">
            <button
              onClick={() => setActiveTab('info')}
              className={`flex items-center gap-2 py-2 px-3 rounded-md text-sm font-medium hover:bg-gray-100 transition ${
                activeTab === 'info' ? 'bg-gray-100 text-black' : 'text-gray-600'
              }`}
            >
              <User size={18} /> <span className="hidden sm:inline">Personal Information</span>
            </button>

            <button
              onClick={() => setActiveTab('purchases')}
              className={`flex items-center gap-2 py-2 px-3 rounded-md text-sm font-medium hover:bg-gray-100 transition ${
                activeTab === 'purchases' ? 'bg-gray-100 text-black' : 'text-gray-600'
              }`}
            >
              <ShoppingBag size={18} /> <span className="hidden sm:inline">My Purchases</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 py-2 px-3 rounded-md text-sm font-medium hover:bg-gray-100 transition ${
                activeTab === 'orders' ? 'bg-gray-100 text-black' : 'text-gray-600'
              }`}
            >
              <Package size={18} /> <span className="hidden sm:inline">My Orders</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 py-2 px-3 rounded-md text-sm font-medium text-red-500 hover:bg-red-50 transition"
            >
              <LogOut size={18} /> <span className="hidden sm:inline">Logout</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <section className="flex-1">
          {activeTab === 'info' && (
            <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    defaultValue="faizan@gmail.com"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Faizan"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <p className="text-sm text-gray-600">
                  Change your account details below, or{' '}
                  <a href="#" className="text-black underline">
                    click here
                  </a>{' '}
                  to change your password.
                </p>

                <button className="w-full sm:w-1/3 bg-black text-white py-3 rounded-full hover:bg-gray-900 transition text-sm">
                  Update Account
                </button>
              </form>
            </div>
          )}

          {activeTab === 'purchases' && (
            <div className="p-6 border border-gray-200 rounded-lg shadow-sm text-gray-500">
              <p>No purchases yet.</p>
            </div>
          )}

          {activeTab === 'orders' && <Orders />}
        </section>
      </div>
    </div>
  )
}
