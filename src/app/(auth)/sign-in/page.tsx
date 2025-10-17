"use client"

import { migrateGuestToUser, signIn } from "lib/actions/auth-actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault()
      try {
        const response = await signIn(email, password)
        if(response.user) {
          await migrateGuestToUser()
          router.push('/')
        }
      } catch (error) {
        console.log("Error", error)
      }
  }

  return (
    <div>
      <p className="text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="font-medium text-black">
          Sign Up
        </Link>
      </p>
      <h1 className="text-center mt-6 text-2xl font-bold">Welcome Back</h1>
      <p className="text-center text-sm text-gray-500 mb-6">
        Sign in to continue your fitness journey
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
        <span className="px-2 text-gray-400 text-sm">Or sign in with</span>
        <hr className="flex-1 border-gray-300" />
      </div>

      <form onSubmit={handleSignin} className="space-y-4">
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
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
