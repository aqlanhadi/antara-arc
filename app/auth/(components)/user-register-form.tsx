"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentURL = new URLSearchParams(Array.from(searchParams.entries()));

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(null)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    let email = event.target.email?.value
    if (!email) {
      setError('Please enter an email address')
      return
    }
    setIsLoading(true)

    // check if email is already registered
    try {
      const res = await fetch('/api/user/userExists', {
        method: 'POST',
        body: JSON.stringify({ email }),
      })

      if (res.status === 404) {
        // redirect to set password page
        currentURL.set('email', email)
        router.push(`/auth/register?${currentURL.toString()}`)
      } else {
        setError('Email already in use. Please login or use a different email address.')
      }
    } catch (e) {
      console.error(e)
    }
    setIsLoading(false)
  }

  return (
    <>
    <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to create your account
          </p>
        </div>
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={() => setError(null)}
            />
            { error && <p className="text-xs flex text-red-600">{error}</p>}
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Continue with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or sign up with
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="outline" type="button" disabled={isLoading} onClick={() => signIn('facebook', { callbackUrl: '/' })}>
            {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
            <Icons.facebook className="mr-2 h-4 w-4" />
            )}{" "}
            Facebook
        </Button>
        <Button variant="outline" type="button" disabled={isLoading} onClick={() => signIn('google', { callbackUrl: '/' })}>
            {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
            <Icons.google className="mr-2 h-4 w-4" />
            )}{" "}
            Google
        </Button>
      </div>
    </div>
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
  </>
  )
}
