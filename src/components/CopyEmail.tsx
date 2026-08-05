'use client'

import { useState } from 'react'

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0 text-turq-deep"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

function CopyIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-3.5 w-3.5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m20 6-11 11-5-5" />
    </svg>
  )
}

// The email address: tap/click to copy it, with clear "Copied" feedback.
// (A mailto link does nothing on devices without a mail client set up.)
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    let ok = false
    try {
      await navigator.clipboard.writeText(email)
      ok = true
    } catch {
      // Fallback for browsers/contexts where the async clipboard API is blocked.
      try {
        const ta = document.createElement('textarea')
        ta.value = email
        ta.setAttribute('readonly', '')
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        ok = document.execCommand('copy')
        document.body.removeChild(ta)
      } catch {
        ok = false
      }
    }
    if (!ok) return
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={copy}
      title="Click to copy"
      aria-label={
        copied
          ? 'Email address copied to clipboard'
          : `Copy email address ${email}`
      }
      className="group flex max-w-full items-center gap-3 text-base text-deep transition-colors hover:text-orange sm:text-lg"
    >
      <MailIcon />
      <span className="min-w-0 break-all text-left">{email}</span>
      <span
        aria-live="polite"
        className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium uppercase tracking-[0.12em] text-turq-deep"
      >
        {copied ? (
          <>
            <CheckIcon />
            Copied
          </>
        ) : (
          <CopyIcon className="text-mid/40 transition-colors group-hover:text-turq-deep" />
        )}
      </span>
    </button>
  )
}
