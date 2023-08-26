"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

interface UserSetPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserSetPasswordForm({ className, ...props }: UserSetPasswordFormProps) {
  const searchParams = useSearchParams()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(null)

  const email = searchParams.get('email')
  const passwordMatchCheck = (password: string, reenterPassword: string): Boolean => (password === reenterPassword)

  const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()

    let password = event.target.password?.value
    let passwordCheck = event.target.passwordCheck?.value

    if (!passwordMatchCheck(password, passwordCheck)) {
        setError('Passwords do not match')
        return
    }

    setIsLoading(true)
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
          callbackUrl: '/feed',
        })

      } else {
        setError('An error occured. Please try again later')
      }
    } catch (error) {
        setError('An error occured. Please try again later')
        console.error(error)
    }
    setIsLoading(false)
  }

  return (
    <>
    <div className="flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Set a password for {email}
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter a password to complete your account creation
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
              id="password"
              name="password"
              placeholder="Set password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              onChange={() => setError(null)}
            />
            <Input
              id="passwordCheck"
              name="passwordCheck"
              placeholder="Reenter password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
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
            Continue
          </Button>
        </div>
      </form>

    </div>
    <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Login
          </Link>
          .
        </p>

  </>
  )
}
