Staging deploy for Vercel

1. Create a `staging` branch and push changes.
2. In GitHub repo settings, add repository secrets:
   - `VERCEL_TOKEN` (from Vercel account)
   - `VERCEL_ORG_ID` (Vercel organization id)
   - `VERCEL_PROJECT_ID` (Vercel project id)
   - `GEMINI_API_KEY` (your Gemini API key)
   - `APP_URL` (https://your-staging-url.vercel.app)

3. Push to `staging` branch — GitHub Action will trigger a Vercel preview deploy.

4. Once deployed, test endpoints:

  - Health: `GET https://<staging-url>/api/health`
  - RSS: `GET https://<staging-url>/api/rss` or `/rss.xml`
  - Sitemap: `GET https://<staging-url>/sitemap.xml`
  - Gemini plan: `POST https://<staging-url>/api/gemini/plan` (JSON body)

Notes:
- Make sure `GEMINI_API_KEY` is set in repo secrets. Vercel will inject it as an environment variable.
- If you want to preview on every PR, change the workflow trigger accordingly.
