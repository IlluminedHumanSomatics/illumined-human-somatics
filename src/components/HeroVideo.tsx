'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

type HeroVideoProps = {
  videoUrl?: string
  posterUrl?: string
  alt?: string
}

// Full-bleed background media for the hero. When a video is present it
// autoplays muted + looped; for visitors who prefer reduced motion it is
// paused so the poster frame shows instead.
export function HeroVideo({ videoUrl, posterUrl, alt }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => {
      if (media.matches) {
        video.pause()
      } else {
        void video.play().catch(() => {})
      }
    }

    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  if (!videoUrl) {
    if (posterUrl) {
      return (
        <Image
          src={posterUrl}
          alt={alt ?? ''}
          fill
          priority
          sizes="100vw"
          className="object-contain md:object-cover"
        />
      )
    }
    // Nothing uploaded yet — a warm wash so the hero still glows.
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-gold/50 via-orange/40 to-terra/50" />
    )
  }

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-contain md:object-cover"
      autoPlay
      muted
      loop
      playsInline
      poster={posterUrl}
    >
      <source src={videoUrl} />
    </video>
  )
}
