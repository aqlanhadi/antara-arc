'use client'

import React from 'react'
import Link from 'next/link'
import { Mail, Facebook } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { signIn } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { UserLoginForm } from '../(components)/user-login-form'

function Login() {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const searchParams = useSearchParams();

  const passwordMatchCheck = (password: string, reenterPassword: string): Boolean => (password === reenterPassword)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      await signIn('credentials', {
        username: email,
        password,
        callbackUrl: searchParams.get('callbackUrl') || '/',
      })
      
      // router.replace('/home')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back!
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email or username below to login to your account
          </p>
        </div>
        <UserLoginForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="underline underline-offset-4 hover:text-primary"
          >
            Create an account
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Login