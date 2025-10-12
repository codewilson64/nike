"use client"

import { useState } from 'react'
import Link from "next/link";
import { signUp } from 'lib/actions/auth-actions';
import { useRouter } from 'next/navigation';
import { syncGuestCart } from 'lib/actions/cart-actions';

type GuestCartItem = {
  id: string             
  name: string            
  price: number          
  size: string             
  quantity: number      
}

export default function SignUpPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await signUp(name, email, password)

      if(response.user) {
        const guestData = JSON.parse(localStorage.getItem('guest-cart') || '{}')
        const guestCartItems = guestData?.state?.cart || []

        if (guestCartItems.length > 0) {
          // map your guest items into backend-compatible format
          const formattedCart = guestCartItems.map((item: GuestCartItem) => ({
            productVariantId: item.id, // assuming your localStorage id matches ProductVariant id
            quantity: item.quantity,
          }))

          await syncGuestCart(formattedCart)
          localStorage.removeItem('guest-cart')
        }
        router.push('/')
      }
    } catch (error) {
      console.log("Error", error)
    }
  }

  return (
    <div>
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-medium text-black">
          Sign In
        </Link>
      </p>
      <h1 className="text-center mt-6 text-2xl font-bold">Join Nike Today!</h1>
      <p className="text-center text-sm text-gray-500 mb-6">
        Create your account to start your fitness journey
      </p>

      <div className="space-y-4">
        <button className="w-full border rounded-lg py-2 font-medium hover:bg-gray-50">
          Continue with Google
        </button>
        <button className="w-full border rounded-lg py-2 font-medium hover:bg-gray-50">
          Continue with Apple
        </button>
      </div>

      <div className="flex items-center my-6">
        <hr className="flex-1 border-gray-300" />
        <span className="px-2 text-gray-400 text-sm">Or sign up with</span>
        <hr className="flex-1 border-gray-300" />
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="johndoe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="minimum 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800"
        >
          Sign Up
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-4">
        By signing up, you agree to our{" "}
        <Link href="#" className="underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className="underline">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
