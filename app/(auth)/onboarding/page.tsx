'use client'

import React from 'react'
import { Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { UserOnboardingForm } from '@/app/(auth)/(components)/user-onboarding-form'

function Onboard() {

  const router = useRouter()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordMatch, setPasswordMatch] = React.useState<null | Boolean>(null)

  const passwordMatchCheck = (password: string, reenterPassword: string): Boolean => (password === reenterPassword)

  // async function signUp(data) {
  //   'use server'

  //   console.log('hitr')
  //   const { email, name, partner_name, username, password } = data
  //   console.log(data.get('name'))

  //   // const params = new URLSearchParams(window.location.search)
  //   // params.set('email', email)


  // }

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
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to Antara!
          </h1>
          <p className="text-sm text-muted-foreground">
            We just need a couple more details and we&apos;ll get you started!
          </p>
        </div>
        <UserOnboardingForm />
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
      </div>
    </div>
  )

  return (
    <div className='flex h-screen'>

      <div className="flex flex-col basis-1/2 px-10 justify-center text-center">

        <form className='flex flex-col p-2 gap-2' onSubmit={handleSubmit} >
            <Input type='text' placeholder='Email' onChange={e => setEmail(e.target.value)} />
            {
              <>
                <Input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
                <Input type='password' placeholder='Reenter password' onChange={e => {
                  if (e.target.value === '') {
                    setPasswordMatch(null)
                  } else {
                    setPasswordMatch(passwordMatchCheck(password, e.target.value))
                  }
                }} />
                {
                  passwordMatch === null ? <></>
                  : passwordMatch
                  ? <></>
                  : <p className='text-right text-xs text-red-700'>Password don&apos;t match</p>
                }
              </>

            }

            <Button type='submit' className='mt-4'><Mail className="mr-2 h-4 w-4" />Continue with email</Button>
        </form>
        
        <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-400"></div>
        </div>
        {/* <div className="fb-login-button" data-width="" data-size="" data-button-type="" data-layout="" data-auto-logout-link="true" data-use-continue-as="false"></div>
        <Button type='submit'><Facebook className="mr-2 h-4 w-4" />Continue with Google</Button> */}

        <p className='text-muted-foreground text-sm'>By signing up, you agree to the terms & conditions</p>
        <p className=''>Already have an account? Sign in</p>

      </div>

      <div className="basis-1/2">
        Pic
      </div>
    </div>
  )
}

export default Onboard