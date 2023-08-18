'use client'

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
}

export default SignUp