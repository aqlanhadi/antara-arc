"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"

interface UserOnboardingFromProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserOnboardingForm({ className, ...props }: UserOnboardingFromProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [name, setName] = React.useState<string>("")
  const [partner, setPartner] = React.useState<string>("")
  const [username, setUsername] = React.useState<string>("@")
  const [disableUsernameField, setDisableUsernameField] = React.useState<boolean>(true)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  React.useEffect(() => {
    setUsername('@' + name.split(' ')[0] + partner.split(' ')[0])
  }, [name, partner])

  React.useEffect(() => {
    if (username.length < 1 || username === '@') {
      setDisableUsernameField(true)
      setUsername('@')
    } else {
      setDisableUsernameField(false)
    }
  }, [username])

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <div>
              <Label className="text-muted-foreground" htmlFor="name">
                Your Name
              </Label>
              <Input
                id="name"
                placeholder=""
                type="text"
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect="off"
                disabled={isLoading}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label className="text-muted-foreground" htmlFor="partner">
                Partner&apos;s Name
              </Label>
              <Input
                id="partner"
                placeholder="Partner&apos;s name"
                type="text"
                autoCapitalize="none"
                autoComplete="partner-name"
                autoCorrect="off"
                disabled={isLoading}
                onChange={(e) => setPartner(e.target.value)}
              />
            </div>
            <div>
              <Label className="text-muted-foreground" htmlFor="username">Suggested username</Label>
              <Input
                id="username"
                prefix="@"
                placeholder="Partner&apos;s name"
                value={username}
                type="text"
                autoCapitalize="none"
                autoComplete="partner-name"
                autoCorrect="off"
                disabled={disableUsernameField || isLoading}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Lets go!
          </Button>
        </div>
      </form>
    </div>
  )
}
