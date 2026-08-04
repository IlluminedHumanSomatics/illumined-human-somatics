import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import type { Metadata } from 'next'
import { getAbout, urlFor } from '@/lib/sanity'
import { safe } from '@/lib/safe'
import type { About, PortableTextBlock, SanityImage } from '@/lib/types'
import { PatternDivider } from '@/components/PatternDivider'
import { FadeIn } from '@/components/FadeIn'
import { HighlightText } from '@/components/HighlightText'

export const metadata: Metadata = {
  title: 'About · Illumined Human Somatics',
  description:
    'Meet Molly Dilg — somatic massage, private yoga, and psychosomatic coaching in Portland, Oregon.',
}

const dropCap =
  'first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[3.4rem] first-letter:font-normal first-letter:leading-[0.7] first-letter:text-orange'

// Plain text of a Portable Text paragraph block.
function blockText(block: PortableTextBlock): string {
  const children = block.children as { text?: string }[] | undefined
  return children?.map((c) => c.text ?? '').join('') ?? ''
}

// Pull the intrinsic dimensions out of a Sanity asset ref (…-WxH-ext).
function refDims(ref?: string) {
  const m = ref?.match(/-(\d+)x(\d+)-[a-z]+$/)
  return m ? { w: Number(m[1]), h: Number(m[2]) } : { w: 4, h: 5 }
}

// Mobile: the whole photo at full column width, uncropped. Desktop (sm+): a
// 4:5 portrait that floats beside the text, with the story wrapping around it.
function FloatPhoto({
  image,
  align,
}: {
  image: SanityImage
  align: 'left' | 'right'
}) {
  const { w, h } = refDims(image.asset?._ref)
  return (
    <FadeIn
      className={`mb-6 sm:mb-4 sm:mt-2 sm:w-[40%] sm:max-w-[14rem] ${
        align === 'right'
          ? 'sm:float-right sm:ml-8'
          : 'sm:float-left sm:mr-8'
      }`}
    >
      {/* Mobile: whole image (no crop). Portrait shots are narrowed so they
          don't tower over the column; wide/square ones fill it. */}
      <Image
        src={urlFor(image).width(900).quality(82).url()}
        alt={image.alt ?? 'Molly Dilg'}
        width={w}
        height={h}
        sizes={h > w ? '70vw' : '100vw'}
        className={`h-auto rounded-2xl sm:hidden ${
          h > w ? 'mx-auto w-[70%]' : 'w-full'
        }`}
      />
      {/* Desktop: 4:5 hotspot crop, floated beside the text */}
      <div className="relative hidden aspect-[4/5] overflow-hidden rounded-2xl sm:block">
        <Image
          src={urlFor(image).width(600).height(750).quality(82).url()}
          alt={image.alt ?? 'Molly Dilg'}
          fill
          sizes="224px"
          className="object-cover"
        />
      </div>
    </FadeIn>
  )
}

// One contained landscape "moment" — sized to the reading column, not full-bleed.
function FeatureImage({ image }: { image: SanityImage }) {
  return (
    <FadeIn className="clear-both my-12">
      <figure className="relative aspect-[16/10] overflow-hidden rounded-3xl sm:aspect-[16/9]">
        <Image
          src={urlFor(image).width(1400).quality(82).url()}
          alt={image.alt ?? 'Molly Dilg'}
          fill
          sizes="(min-width: 672px) 672px, 100vw"
          className="object-cover"
        />
      </figure>
    </FadeIn>
  )
}

export default async function AboutPage() {
  const about = await safe<About | null>(getAbout(), null)
  const story = about?.storyImages ?? []

  const heroHeading =
    about?.heroHeading ??
    'I add light through grounded gratitude and empathic inquiry.'
  const heroHighlight = about?.heroHighlight ?? 'light'
  const credential = about?.credential ?? 'Trained at East West · Portland, OR'

  // Story paragraphs from the CMS.
  const paragraphs = (about?.bio ?? []).filter((b) => b._type === 'block')
  const total = paragraphs.length

  // Weave the story photos through the paragraphs (never on the intro one),
  // spread evenly and alternating sides. The feature image sits near the middle.
  const featureAfter = total > 1 ? Math.floor((total - 1) / 2) : -1
  const photoByPara = new Map<number, { image: SanityImage; align: 'left' | 'right' }>()
  const usable = story.slice(0, Math.max(0, total - 1))
  const used = new Set<number>()
  usable.forEach((image, j) => {
    let idx = Math.min(
      total - 1,
      Math.max(1, 1 + Math.round((j * (total - 1)) / usable.length)),
    )
    while (used.has(idx) && idx < total - 1) idx++
    while (used.has(idx) && idx > 1) idx--
    if (used.has(idx)) return
    used.add(idx)
    photoByPara.set(idx, { image, align: j % 2 === 0 ? 'right' : 'left' })
  })

  return (
    <>
      {/* ── Intro ────────────────────────────────────────────── */}
      <section className="px-6 pb-4 pt-8 md:pb-8 md:pt-20">
        <div className="mx-auto grid max-w-4xl items-center justify-center gap-8 md:grid-cols-[17rem_auto] md:gap-14">
          {about?.photo ? (
            <div className="mx-auto w-full max-w-[24rem] md:mx-0 md:max-w-[17rem]">
              {/* Mobile: the whole landscape photo, full column width */}
              <Image
                src={urlFor(about.photo).width(1200).height(800).url()}
                alt={about.photo.alt ?? about.fullName}
                width={1200}
                height={800}
                priority
                sizes="(min-width: 640px) 384px, 100vw"
                className="h-auto w-full rounded-3xl md:hidden"
              />
              {/* Desktop: 3:4 portrait crop beside the text */}
              <div className="relative hidden aspect-[3/4] overflow-hidden rounded-3xl md:block">
                <Image
                  src={urlFor(about.photo).width(680).height(906).url()}
                  alt={about.photo.alt ?? about.fullName}
                  fill
                  priority
                  sizes="272px"
                  className="rounded-3xl object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="mx-auto flex aspect-[3/2] w-full max-w-[24rem] items-center justify-center rounded-3xl border border-orange/15 bg-gradient-to-br from-orange/[0.06] to-turq/[0.05] font-sans text-[11px] uppercase tracking-[0.14em] text-mid/30 md:mx-0 md:aspect-[3/4] md:max-w-[17rem]">
              Molly&rsquo;s photo
            </div>
          )}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <span className="h-px w-8 bg-orange/70" />
              <span className="font-sans text-[10px] font-light uppercase tracking-[0.28em] text-orange">
                About {about?.fullName ?? 'Molly'}
              </span>
            </div>
            <h1 className="mt-5 mx-auto max-w-[18ch] text-balance text-3xl leading-[1.18] text-deep sm:text-4xl md:mx-0">
              <HighlightText text={heroHeading} word={heroHighlight} />
            </h1>
            {credential && (
              <p className="mt-6 font-sans text-[11px] font-light uppercase tracking-[0.18em] text-turq-deep">
                {credential}
              </p>
            )}
            <Link
              href="/massage"
              className="mt-8 mx-auto block w-fit rounded-full bg-orange px-7 py-3 font-sans text-[11px] font-light uppercase tracking-[0.22em] text-white transition-colors hover:bg-terra-deep md:mx-0"
            >
              Book a session
            </Link>
          </div>
        </div>
      </section>

      <PatternDivider className="!py-4 md:!py-8" />

      {/* ── Her story (photos woven in from the CMS) ─────────── */}
      <section className="pb-24 pt-1 md:pt-6">
        <div className="mx-auto max-w-2xl px-6">
          {paragraphs.map((block, i) => {
            const photo = photoByPara.get(i)
            return (
              <Fragment key={block._key ?? i}>
                {i === 0 ? (
                  <p className={`leading-loose text-mid ${dropCap}`}>
                    {blockText(block)}
                  </p>
                ) : (
                  <div className="mt-8 flow-root">
                    {photo && (
                      <FloatPhoto image={photo.image} align={photo.align} />
                    )}
                    <p className="leading-loose text-mid">{blockText(block)}</p>
                  </div>
                )}
                {about?.featureImage && i === featureAfter && (
                  <FeatureImage image={about.featureImage} />
                )}
                {about?.pullQuote && i === featureAfter + 1 && (
                  <FadeIn>
                    <blockquote className="my-10 border-y border-turq/25 py-8 text-center">
                      <p className="mx-auto max-w-lg font-display text-2xl italic leading-snug text-deep sm:text-3xl">
                        &ldquo;{about.pullQuote}&rdquo;
                      </p>
                    </blockquote>
                  </FadeIn>
                )}
              </Fragment>
            )
          })}
        </div>
      </section>
    </>
  )
}
