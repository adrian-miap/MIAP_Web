# Cloudflare CDN setup

GitHub Pages already uses a global CDN. Cloudflare can sit in front when the custom domain is ready, adding edge caching, DNS, TLS and protection.

1. First verify the temporary `github.io/Makeitaplan-Website/` deployment.
2. Add the domain to Cloudflare and copy every existing DNS record before changing nameservers.
3. Add `makeitaplan.com` as the GitHub Pages custom domain.
4. Add proxied `A` records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
5. Add a proxied `CNAME` for `www` to `<github-account>.github.io`.
6. Once GitHub verifies DNS, enable **Enforce HTTPS**.

Use **Full (strict)** SSL. Enable Always Use HTTPS, Brotli and HTTP/3. Keep Auto Minify off because Vite already minifies. Create a Cache Rule for `makeitaplan.com/assets/*` with a one-month Edge TTL. Leave HTML on standard caching so deployments appear promptly. Do not enable Rocket Loader because it can interfere with JavaScript modules.

## Security response headers

Create a Cloudflare **Transform Rule > Modify Response Header** for all paths with:

- `Strict-Transport-Security: max-age=31536000; includeSubDomains` (enable only after every subdomain supports HTTPS)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()`

The site also includes a restrictive Content Security Policy in `index.html`. Test the policy after adding third-party services and explicitly allow only the domains they require.
