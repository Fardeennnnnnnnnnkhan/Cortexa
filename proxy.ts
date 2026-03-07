import arcjet, { detectBot, shield, slidingWindow, tokenBucket } from '@arcjet/next';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { env } from './data/env/server';
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', "/", "/api/webhooks(.*)", "/arcjet-error(.*)"])


// arcjet
const aj = arcjet({
  key: env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "DRY_RUN", // Switched to DRY_RUN to monitor instead of block
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "CATEGORY:MONITOR",
        "CATEGORY:PREVIEW",
      ],
    }),
    slidingWindow({
      mode: "LIVE",
      interval: "1m",
      max: 1000, // Significantly increased from 200
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 100, // Increased from 5
      interval: 10,
      capacity: 200, // Increased from 10
    }),
  ],
});
export default clerkMiddleware(async (auth, req) => {
  // const decision  = await aj.protect(req)
  const decision = await aj.protect(req, { requested: 1 })
  if (decision.isDenied()) {
    return Response.redirect(new URL("/arcjet-error", req.url))
  }
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})



export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}