'use client'

import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { useActionState } from 'react'

import { authenticate } from '@/lib/actions'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  )

  return (
    <form action={formAction}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                defaultValue={
                  process.env.NEXT_PUBLIC_ENVIRONMENT === 'demo'
                    ? 'user@nextmail.com'
                    : ''
                }
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                required
                defaultValue={
                  process.env.NEXT_PUBLIC_ENVIRONMENT === 'demo' ? '123456' : ''
                }
              />
            </div>
            <Button
              loading={isPending}
              type="submit"
              className="w-full"
              aria-disabled={isPending}
            >
              Login
            </Button>
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {errorMessage && (
                <>
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
