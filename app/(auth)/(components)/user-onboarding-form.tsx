"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { redirect } from "next/navigation"

interface UserOnboardingFromProps extends React.HTMLAttributes<HTMLDivElement> {
  user: string;
}

export function UserOnboardingForm({ className, ...props }: UserOnboardingFromProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [name, setName] = React.useState<string>("")
  const [partner, setPartner] = React.useState<string>("")
  const [username, setUsername] = React.useState<string>("@")
  const [disableUsernameField, setDisableUsernameField] = React.useState<boolean>(true)

  async function onSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const name = event.target.s_name?.value
    const p_name = event.target.p_name?.value
    const username = event.target.username?.value

    console.log(props.user, name, p_name, username)

    // check this later https://www.youtube.com/watch?v=SFQwto0rvps

    try {
      const res = await fetch(`/api/user/update/${props.user}`, {
        method: 'PUT',
        body: JSON.stringify({
          name,
          p_name,
          username,
        }),
      }).then(() => redirect('/feed'))

    } catch (e) {
      console.error(e)
    }
    // setIsLoading(false)
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
                id="s_name"
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
                id="p_name"
                placeholder=""
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
                placeholder=""
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
