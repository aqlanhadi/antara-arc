'use client'

import React from 'react'
import { Mail, Facebook } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { signIn } from "next-auth/react";
import { useRouter, redirect } from 'next/navigation'
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from '@/components/ui/button'
import { UserAuthForm } from '@/app/auth/(components)/user-register-form'
import { cn } from '@/lib/utils'

function AuthLayout({ children }: { children: React.ReactNode }) {

  const router = useRouter()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordMatch, setPasswordMatch] = React.useState<null | Boolean>(null)

  const passwordMatchCheck = (password: string, reenterPassword: string): Boolean => (password === reenterPassword)

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (res.ok) {

        await signIn('credentials', {
          username: email,
          password,
          callbackUrl: '/',
        })
        
        // redirect('/home')

      } else {
        console.log('An error occured during registration:', res)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* <Link
          href="/auth/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link> */}
        {children}
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Image src='/icon.png' width={24} height={24} alt='Antara Logo'/>
            Antara
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;I stumbled upon antarakita.com while searching for wedding ideas, and I am absolutely blown away! The range of creative inspiration and practical advice is unparalleled. This website is a treasure trove for brides-to-be like me who want to make their wedding day truly magical. Thank you for curating such an enchanting space for us dreamers!&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default AuthLayout