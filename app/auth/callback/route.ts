// @/app/auth/callback/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  // Hum apne 'next' aur 'action' params ko yahan se uthayenge
  const next = searchParams.get('next') ?? '/dashboard'
  const action = searchParams.get('action')

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Success! Ab user ko uski manpasand jagah bhejain
      const redirectUrl = new URL(next, origin)
      if (action) redirectUrl.searchParams.set('action', action)
      
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Error case
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}