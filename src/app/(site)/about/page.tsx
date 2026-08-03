import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getAbout, urlFor } from '@/lib/sanity'
import { safe } from '@/lib/safe'
import type { About, SanityImage } from '@/lib/types'
import { PatternDivider } from '@/components/PatternDivider'
import { FadeIn } from '@/components/FadeIn'

export const metadata: Metadata = {
  title: 'About · Illumined Human Somatics',
  description:
    'Meet Molly Dilg — somatic massage, private yoga, and psychosomatic coaching in Portland, Oregon.',
}

const tagline = 'I add light through grounded gratitude and empathic inquiry.'

const storyP = 'mt-8 leading-loose text-mid'
const dropCap =
  'first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[3.4rem] first-letter:font-normal first-letter:leading-[0.7] first-letter:text-orange'

// Molly's story — hardcoded so the photos can be woven precisely between
// paragraphs. (Photos come from the Studio; the text lives here.)
const bio = [
  `One of my earliest memories is me as a toddler lying down underneath my mom while she is holding a plank pose doing her Jane Fonda cassette tape workout. I am looking at a picture book of kids doing yoga; I have decided to practice Embryo Pose and proudly place myself below my mom's pelvis while saying "I'm your egg!" Astute, and, a little annoying, but my mom was trying desperately to get back into her own body after hatching her egg and supporting the autonomy of that person's (my!) body and was glad to have me distracted enough to give her the time (if not entirely the space) to get moving. I love the fact that that earliest memory includes yoga, movement, learning, and relationally exploring both bodily autonomy, similarity, and interdependent connection.`,
  `It was my mom who later took me to my first yoga class at the age of 12, successfully bribing me with the promise of a donut after class. While I loved the donut (pink with sprinkles), I actually loved the yoga class more. I felt seen by the teacher, welcomed by the community, curious about the practice, and at home in my body (a rare somatic experience as a tween). Between classes, I poured over books about yoga philosophy, as well as the trusty picture books focused on anatomy and alignment. I pursued independent study with dance instructor Arianne MacBean, at my school and taught my very first class when I was 16.`,
  `In 2008, as the economy turned and the prospects for my liberal arts degree in Southwest Studies waned, I decided to graduate a semester early from Colorado College and use the extra time to obtain my 200 hour yoga teacher certification. For 12 years I worked full time in yoga, where every day I got to witness the transformation that arose from practicing presence, patience, peace, and personal power in hour-long formats of self-discovery.`,
  `The pivot spurred by Covid gave me the unexpected experience of shifting my teaching skills to a virtual format, scaling my teacher training leadership experience from a group of 25 to over 1,000, and managing a group of 9 studios to 17 across the upper left coast of the US. I experienced severe burnout in getting those studios reopened pre-vaccine and during a time when teachers were still receiving higher pay in stimulus checks to stay home than to return to an uncertain and speculatively unsafe work environment. In 2021 I took a break from my yoga career, which clarified its importance in my life and its contribution to my wholeness. I hope to teach, share, practice and participate in yoga for the rest of my life.`,
  `The large scale disorientation of the pandemic left my body/mind less connected and more fractious. I developed an autoimmune disorder and symptoms were synchronous with time spent working long hours on the computer, in ergonomically questionable positions, with stress seeping into my psyche and somatic landscape with a permeability that was palpable. In 2024 I was laid off with a severance that afforded me the opportunity to make a courageous change, I chose to go back to school for massage therapy and psychosomatic integration.`,
  `My mom talks about being pregnant with me and sensing "the pacific influence of Molly Dilg" - she felt a settling and calm coming from the energy that was collecting inside her as I took shape. From the time I was little she talked about my "healing hands" and shared hers with me through Reiki any time I wasn't feeling well. When I was 12, she enrolled us both in a level 1 Reiki certification program and I deep dove into chakras and energy work, loving every minute of it. At nights I would beg my dad to massage, rather than read, me to sleep (which, as an English teacher, he'd somewhat begrudgingly accommodate). I grew up present to the power of touch, and the way even subtle touch could communicate so much presence. I always knew massage therapy would be a part of my career collage, but it wasn't until 2025 that I started working formally in the field.`,
  `Awakening aliveness through massage by connecting body, mind, heart, and nervous system in coregulated attunement has been a deeply fulfilling professional addition to the somatic inquiry offered by yoga. I believe our bodies are wise and geared towards balance and that our modern world, trauma and tribulation, and the context of culture can interrupt that wisdom and innate intelligence. Through massage, I aim to offer space, setting, and settling, so that clients can listen to the body's whispers before they become yells. As a massage therapist, I listen in for those whispers through breath, presentation, and responsiveness to touch so that each session is formed in presence, wholeness, and custom-tailored treatment plans to meet the client where they're at from a mind, body, heart, and nervous system perspective.`,
  `My favorite modalities and techniques to weave into a Swedish style massage are myofascial release, tui na, craniosacral, deep tissue, trigger point therapy, breathwork, and vagal toning exercises. My favorite aspects of teaching yoga are the opportunities to somatically experiment with the embodiment of yoga philosophy through theme, the playful presencing of strength and mobility to open and access different parts of our selves and our anatomy, and the collective effervescence that comes with moving and breathing in a shared and synchronized rhythm to music. And my favorite type of client is YOU :) Hope to work with you soon!`,
]

// A portrait that floats beside the text — the story wraps around it.
function FloatPhoto({
  image,
  align,
}: {
  image: SanityImage
  align: 'left' | 'right'
}) {
  return (
    <FadeIn
      className={`mx-auto mb-6 w-2/3 max-w-[15rem] sm:mb-4 sm:mt-2 sm:w-[40%] sm:max-w-[14rem] ${
        align === 'right'
          ? 'sm:float-right sm:ml-8'
          : 'sm:float-left sm:mr-8'
      }`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
        <Image
          src={urlFor(image).width(600).height(750).quality(82).url()}
          alt={image.alt ?? 'Molly Dilg'}
          fill
          sizes="(min-width: 640px) 224px, 66vw"
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

  return (
    <>
      {/* ── Intro ────────────────────────────────────────────── */}
      <section className="px-6 pb-8 pt-20">
        <div className="mx-auto grid max-w-4xl items-center justify-center gap-12 md:grid-cols-[17rem_auto] md:gap-14">
          {about?.photo ? (
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[17rem] overflow-hidden rounded-3xl md:mx-0">
              <Image
                src={urlFor(about.photo).width(680).height(906).url()}
                alt={about.photo.alt ?? about.fullName}
                fill
                priority
                sizes="(min-width: 768px) 272px, 100vw"
                className="rounded-3xl object-cover"
              />
            </div>
          ) : (
            <div className="mx-auto flex aspect-[3/4] w-full max-w-[17rem] items-center justify-center rounded-3xl border border-orange/15 bg-gradient-to-br from-orange/[0.06] to-turq/[0.05] font-sans text-[11px] uppercase tracking-[0.14em] text-mid/30 md:mx-0">
              Molly&rsquo;s photo
            </div>
          )}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-orange/70" />
              <span className="font-sans text-[10px] font-light uppercase tracking-[0.28em] text-orange">
                About {about?.fullName ?? 'Molly'}
              </span>
            </div>
            <h1 className="mt-5 max-w-[18ch] text-balance text-3xl leading-[1.18] text-deep sm:text-4xl">
              I add <em className="italic text-orange">light</em> through
              grounded gratitude and empathic inquiry.
            </h1>
            <p className="mt-6 font-sans text-[11px] font-light uppercase tracking-[0.18em] text-turq-deep">
              Trained at East West · Portland, OR
            </p>
            <Link
              href="/massage"
              className="mt-8 mx-auto block w-fit rounded-full bg-orange px-7 py-3 font-sans text-[11px] font-light uppercase tracking-[0.22em] text-white transition-colors hover:bg-terra-deep md:mx-0"
            >
              Book a session
            </Link>
          </div>
        </div>
      </section>

      <PatternDivider />

      {/* ── Her story (photos woven in) ──────────────────────── */}
      <section className="pb-24 pt-6">
        <div className="mx-auto max-w-2xl px-6">
          <p className={`leading-loose text-mid ${dropCap}`}>{bio[0]}</p>

          <div className="mt-8 flow-root">
            {story[0] && <FloatPhoto image={story[0]} align="right" />}
            <p className="leading-loose text-mid">{bio[1]}</p>
          </div>

          <div className="mt-8 flow-root">
            {story[1] && <FloatPhoto image={story[1]} align="left" />}
            <p className="leading-loose text-mid">{bio[2]}</p>
            <p className="mt-6 leading-loose text-mid">{bio[3]}</p>
          </div>

          {about?.featureImage && <FeatureImage image={about.featureImage} />}

          <p className={storyP}>{bio[4]}</p>

          <FadeIn>
            <blockquote className="my-10 border-y border-turq/25 py-8 text-center">
              <p className="mx-auto max-w-lg font-display text-2xl italic leading-snug text-deep sm:text-3xl">
                &ldquo;&hellip;so clients can listen to the body&rsquo;s whispers
                before they become yells.&rdquo;
              </p>
            </blockquote>
          </FadeIn>

          <div className="mt-8 flow-root">
            {story[2] && <FloatPhoto image={story[2]} align="right" />}
            <p className="leading-loose text-mid">{bio[5]}</p>
          </div>

          <div className="mt-8 flow-root">
            {story[3] && <FloatPhoto image={story[3]} align="left" />}
            <p className="leading-loose text-mid">{bio[6]}</p>
          </div>

          <div className="mt-8 flow-root">
            {story[4] && <FloatPhoto image={story[4]} align="right" />}
            <p className="leading-loose text-mid">{bio[7]}</p>
          </div>
        </div>
      </section>
    </>
  )
}
