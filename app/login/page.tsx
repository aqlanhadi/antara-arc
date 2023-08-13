'use client'

import React from 'react'
import { Mail, Facebook } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'

function Login() {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const router = useRouter()

  const passwordMatchCheck = (password: string, reenterPassword: string): Boolean => (password === reenterPassword)


  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/home',
      })
      
      // router.replace('/home')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='flex h-screen'>

      <div className="flex flex-col basis-1/2 px-10 justify-center text-center">

        <form className='flex flex-col p-2 gap-2' onSubmit={handleSubmit} >
            <Input type='text' placeholder='Email' onChange={e => setEmail(e.target.value)} />
            <Input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />

            <Button type='submit' className='mt-4'>Login</Button>
        </form>

      </div>

      <div className="basis-1/2">
        Pic
      </div>
    </div>
  )
}

export default Login