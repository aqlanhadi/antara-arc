"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserLoginForm({ className, ...props }: UserLoginFormProps) {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  React.useEffect(() => {
    const error = searchParams.get('error')
    if (error === 'CredentialsSignin') {
      setErrorMessage('Invalid email or password')
    }
  }, [searchParams])

  async function onSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    let email = event.target.email?.value
    let password = event.target.password?.value

    let authorize = await signIn('credentials', {
      username: email,
      password,
      callbackUrl: '/feed',
    })

    // clear the form
    if (authorize?.ok) {
      event.target.reset()
    }

    setIsLoading(false)
  }

  async function onProviderLogin(provider: string) {
    setIsLoading(true)
    let authorize = await signIn(provider, { callbackUrl: '/' })
    // setIsLoading(false)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Input
              id="password"
              placeholder="••••••••••"
              type="password"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
            { errorMessage && <p className="text-xs flex text-red-600">{errorMessage}</p>}
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex-col gap-2">
        <Button variant="outline" type="button" disabled={isLoading} onClick={() => onProviderLogin('facebook')}>
            {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
            <Icons.facebook className="mr-2 h-4 w-4" />
            )}{" "}
            Facebook
        </Button>
        <Button variant="outline" type="button" disabled={isLoading} onClick={() => onProviderLogin('google')}>
            {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
            <Icons.google className="mr-2 h-4 w-4" />
            )}{" "}
            Google
        </Button>
      </div>
    </div>
  )
}
