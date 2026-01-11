import { ClerkProvider as OriginakClerkProvider } from '@clerk/nextjs'
import {ReactNode} from 'react'

export function ClerkProvider({ children }: { children: ReactNode }) {
  return <OriginakClerkProvider>{children}</OriginakClerkProvider>
}