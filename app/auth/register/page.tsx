'use client'

import { Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { UserAuthForm } from '@/app/auth/(components)/user-register-form'
import { UserSetPasswordForm } from '../(components)/user-set-password-form'
import { useSearchParams } from 'next/navigation'

function SignUp() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {
          email 
          ? <UserSetPasswordForm />
          : <UserAuthForm />
        }
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

export default SignUp