/**
 * Build script to inject Supabase credentials into index.html
 * This runs during Vercel build to replace placeholders with actual env vars
 */

const fs = require('fs');
const path = require('path');

// Read environment variables
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON = process.env.SUPABASE_ANON || '';

if (!SUPABASE_URL || !SUPABASE_ANON) {
  console.warn('⚠️  Warning: SUPABASE_URL or SUPABASE_ANON not set in environment variables');
  console.warn('   Forms will not save data until these are configured in Vercel dashboard');
} else {
  console.log('✅ Supabase credentials found, injecting into HTML...');
}

// Read index.html
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Replace placeholders with actual values
if (SUPABASE_URL && SUPABASE_ANON) {
  html = html.replace(
    'window.__ENV__.SUPABASE_URL = "SUPABASE_URL_PLACEHOLDER";',
    `window.__ENV__.SUPABASE_URL = "${SUPABASE_URL.replace(/"/g, '\\"')}";`
  );
  html = html.replace(
    'window.__ENV__.SUPABASE_ANON = "SUPABASE_ANON_PLACEHOLDER";',
    `window.__ENV__.SUPABASE_ANON = "${SUPABASE_ANON.replace(/"/g, '\\"')}";`
  );
  console.log('✅ Supabase config injected successfully');
} else {
  console.log('ℹ️  No credentials provided - keeping placeholders for local dev');
}

// Write back
fs.writeFileSync(indexPath, html, 'utf8');
console.log('✅ index.html updated successfully');
