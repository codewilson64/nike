'use client'

import { useState } from "react"

export default function DeliveryForm() {
  const [formData, setFormData] = useState({
      type: 'shipping',
      firstName: '',
      lastName: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      phone: '',
    })
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        console.log('Submitting address:', formData)
        // TODO: call your server action (e.g. saveAddress(formData))
      } catch (err) {
        console.error('Failed to save address:', err)
      }
    }
  
    return (
      <div className="lg:col-span-2">
        {/* Delivery Form */}
        <div className="space-y-8">
          <h2 className="text-heading-3 text-dark-900 mb-4">Delivery Details</h2>
  
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Address Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-dark-900 focus:outline-none"
              >
                <option value="shipping">Shipping</option>
                <option value="billing">Billing</option>
              </select>
            </div>
  
            {/* Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-dark-900 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-dark-900 focus:outline-none"
                  required
                />
              </div>
            </div>
  
            {/* Address Lines */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1</label>
              <input
                type="text"
                name="line1"
                value={formData.line1}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-dark-900 focus:outline-none"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2</label>
              <input
                type="text"
                name="line2"
                value={formData.line2}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-dark-900 focus:outline-none"
              />
            </div>
  
            {/* City, State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-dark-900 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-dark-900 focus:outline-none"
                  required
                />
              </div>
            </div>
  
            {/* Country, Postal Code */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-dark-900 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-dark-900 focus:outline-none"
                  required
                />
              </div>
            </div>
  
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-dark-900 focus:outline-none"
                required
              />
            </div>
  
            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full sm:w-auto bg-dark-900 text-white font-medium py-3 px-8 rounded-lg hover:bg-dark-800 transition-all"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    )
}