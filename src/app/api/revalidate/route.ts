import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

/**
 * Sanity → site revalidation webhook.
 *
 * Set up in Sanity (manage.sanity.io → API → Webhooks):
 *   URL:     https://<your-domain>/api/revalidate
 *   Trigger: Create, Update, Delete
 *   Filter:  _type in ["homePage","massagePage","about","contactInfo","workshop","testimonial","service","practiceLocation"]
 *           (or leave the filter empty to revalidate on ANY document change)
 *   Projection: {_type}
 *   Secret:  same value as the SANITY_REVALIDATE_SECRET env var
 *
 * On publish, this invalidates the matching tag (see tags in src/lib/sanity.ts)
 * so only the affected pages regenerate.
 */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    )

    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 })
    }
    if (!body?._type) {
      return new Response('Bad request: missing _type', { status: 400 })
    }

    // 2nd arg = stale-while-revalidate window (Next 16); 'max' serves stale
    // content while the affected pages regenerate in the background.
    revalidateTag(body._type, 'max')

    return NextResponse.json({
      revalidated: true,
      tag: body._type,
      now: Date.now(),
    })
  } catch (err) {
    console.error('Revalidation webhook error:', err)
    return new Response((err as Error).message, { status: 500 })
  }
}
