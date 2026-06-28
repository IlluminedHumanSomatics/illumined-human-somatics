# Deploy & Go-Live

The site is **Next.js 16 + Sanity**. Pages are statically generated and refresh
two ways:

- **Time-based:** every page revalidates hourly (safety net).
- **On-demand:** publishing in Sanity Studio fires a webhook that instantly
  refreshes only the affected pages (see `src/app/api/revalidate/route.ts`).

## 1. Deploy to Vercel

1. In the Vercel dashboard → **Add New… → Project** → import the GitHub repo
   `IlluminedHumanSomatics/illumined-human-somatics`.
2. Framework preset: **Next.js** (auto-detected). No build-command changes needed.
3. Add **Environment Variables** (Production + Preview + Development):

   | Name | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | `t12cluka` |
   | `NEXT_PUBLIC_SANITY_DATASET` | `production` |
   | `NEXT_PUBLIC_SANITY_API_VERSION` | `2026-05-22` |
   | `SANITY_REVALIDATE_SECRET` | *(the value from `.env.local` — keep it secret)* |

4. **Deploy.** Every push to `main` auto-deploys after this.
5. (Optional) Add the custom domain under Vercel → Project → **Domains** once
   Molly provides it.

## 2. Sanity → site revalidation webhook

So Studio edits go live without a redeploy:

1. Go to **https://manage.sanity.io** → project **t12cluka** → **API → Webhooks → Create Webhook**.
2. Configure:
   - **Name:** Revalidate site
   - **URL:** `https://<your-vercel-domain>/api/revalidate`
   - **Dataset:** `production`
   - **Trigger on:** Create, Update, Delete
   - **Filter:** `_type in ["homePage","about","contactInfo","workshop","testimonial","service"]`
   - **Projection:** `{_type}`
   - **HTTP method:** POST
   - **API version:** `v2021-03-25` (or latest)
   - **Secret:** the **same** `SANITY_REVALIDATE_SECRET` value used in Vercel
3. Save. Publishing any document now refreshes the matching pages within seconds.

### Test it

Edit something in Studio (e.g. a testimonial) → Publish → reload the live page.
The webhook's recent deliveries (in the Sanity webhook UI) should show `200`.

## CORS (Studio at /studio)

The Studio is hosted at `/studio` on the same domain, so no extra CORS setup is
needed. If you ever host Studio elsewhere, add the origin under Sanity → API →
**CORS origins**.
