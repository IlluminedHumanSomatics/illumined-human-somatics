'use client'

import Link from 'next/link'
import { useState } from 'react'

const navItems = [
  { label: 'About', href: '/about' },
  { label: 'Massage', href: '/massage' },
  { label: 'Yoga', href: '/yoga' },
  { label: 'Retreats & Workshops', href: '/workshops' },
  { label: 'Contact', href: '/contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-cream/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-5 sm:px-8">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="whitespace-nowrap font-sans text-[13px] font-normal uppercase tracking-[0.2em] text-deep sm:text-sm"
        >
          Illumined <span className="font-semibold">Human</span> Somatics
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-10 md:flex">
          <nav className="flex items-center gap-9">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative font-sans text-[11px] font-light uppercase tracking-[0.18em] text-mid transition-colors hover:text-turq"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 right-0 h-px origin-left scale-x-0 bg-turq transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>
          <Link
            href="/massage"
            className="rounded-full bg-orange px-6 py-2.5 font-sans text-[11px] font-light uppercase tracking-[0.18em] text-white transition-colors hover:bg-terra-deep"
          >
            Book
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-deep md:hidden"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
            {open ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-mid/10 bg-cream/95 backdrop-blur-md md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 font-sans text-[12px] font-light uppercase tracking-[0.18em] text-mid transition-colors hover:text-turq"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/massage"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-orange px-6 py-3 text-center font-sans text-[12px] font-light uppercase tracking-[0.18em] text-white transition-colors hover:bg-terra-deep"
            >
              Book
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
