# DNS Configuration for siso.delivery

## Current Status
- ✅ SSL Certificate: Enabled and active for `siso.delivery`
- ⚠️ SSL Certificate: Pending for `www.siso.delivery` (waiting for DNS configuration)

## DNS Records Required

You need to configure the following DNS records with your domain registrar (where you purchased `siso.delivery`):

### 1. Apex Domain (siso.delivery)
**Record Type:** `ALIAS` or `ANAME` (if supported) or `A` record  
**Name/Host:** `@` or `siso.delivery`  
**Value/Target:** `immense-crag-pp16k0tyl6tlu0sqtl1qm7xh.herokudns.com`  
**TTL:** 3600 (or default)

**Note:** If your DNS provider doesn't support ALIAS/ANAME records, you'll need to use an A record. Contact Heroku support or use a DNS provider that supports ALIAS records (like Cloudflare, DNSimple, etc.).

### 2. WWW Subdomain (www.siso.delivery)
**Record Type:** `CNAME`  
**Name/Host:** `www`  
**Value/Target:** `structural-indominus-dvuid6vwxtk1o04slk4m61o2.herokudns.com`  
**TTL:** 3600 (or default)

## DNS Provider Instructions

### Common DNS Providers:

#### Cloudflare
1. Log in to Cloudflare
2. Select your domain `siso.delivery`
3. Go to DNS settings
4. Add:
   - **Type:** CNAME, **Name:** @, **Target:** `immense-crag-pp16k0tyl6tlu0sqtl1qm7xh.herokudns.com`, **Proxy:** Off
   - **Type:** CNAME, **Name:** www, **Target:** `structural-indominus-dvuid6vwxtk1o04slk4m61o2.herokudns.com`, **Proxy:** Off

#### GoDaddy
1. Log in to GoDaddy
2. Go to DNS Management
3. Add:
   - **Type:** A, **Name:** @, **Value:** (Get IP from Heroku support or use ALIAS if available)
   - **Type:** CNAME, **Name:** www, **Value:** `structural-indominus-dvuid6vwxtk1o04slk4m61o2.herokudns.com`

#### Namecheap
1. Log in to Namecheap
2. Go to Domain List → Manage → Advanced DNS
3. Add:
   - **Type:** A Record, **Host:** @, **Value:** (Contact Heroku for IP or use ALIAS)
   - **Type:** CNAME Record, **Host:** www, **Value:** `structural-indominus-dvuid6vwxtk1o04slk4m61o2.herokudns.com`

## Verification

After configuring DNS, verify the setup:

```bash
# Check DNS propagation
nslookup siso.delivery
nslookup www.siso.delivery

# Check SSL certificate status
heroku certs:auto --app shuk2-delivery

# Wait for SSL certificate (if www is still pending)
heroku certs:auto:wait --app shuk2-delivery
```

## Expected Results

Once DNS is properly configured:
- ✅ `https://siso.delivery` - Should work (already active)
- ✅ `https://www.siso.delivery` - Will redirect to `https://siso.delivery` (after DNS is configured)
- ✅ SSL certificates will auto-renew
- ✅ All traffic will be HTTPS

## Troubleshooting

If SSL certificate for www.siso.delivery is still failing:
1. Verify DNS records are correct
2. Wait 24-48 hours for DNS propagation
3. Check: `heroku certs:auto --app shuk2-delivery`
4. Contact Heroku support if issues persist

## Current Heroku App Info
- **App Name:** shuk2-delivery
- **Heroku URL:** https://shuk2-delivery-48f885e6c5da.herokuapp.com/
- **Custom Domain:** https://siso.delivery (after DNS is configured)

