import { createClient } from '@supabase/supabase-js'

// These come from .env.local (on your computer) or your host's environment
// variables (on Vercel). The publishable key is safe to put in a website:
// the database's row-level security rules decide what each user may read.
const url = import.meta.env.VITE_SUPABASE_URL
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// Accounts are optional. Without these settings, the site works exactly as
// before and simply hides the sign-in button.
export const accountsEnabled = Boolean(url && publishableKey)

export const supabase = accountsEnabled ? createClient(url, publishableKey) : null
