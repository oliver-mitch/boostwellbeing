import requests, csv, re, ssl
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

BASE = 'https://www.boostwellbeing.co.nz'
domain = urlparse(BASE).netloc
visited, to_visit = set(), [BASE]
results, broken_links = [], []

print(f'🚀 Starting full crawl for {BASE}\n')

while to_visit:
    url = to_visit.pop(0)
    if url in visited: continue
    visited.add(url)
    try:
        r = requests.get(url, timeout=10, allow_redirects=True)
        status = r.status_code
        final_url = r.url
        results.append((url, status, final_url))
        print(f'[{status}] {url}')

        # Crawl internal links only
        if 'text/html' in r.headers.get('Content-Type','') and status == 200:
            soup = BeautifulSoup(r.text, 'html.parser')
            for a in soup.find_all('a', href=True):
                href = a['href']
                if href.startswith(('mailto:', 'tel:', 'javascript:')):
                    continue
                full = urljoin(BASE, href.split('#')[0])
                if urlparse(full).netloc == domain and full not in visited:
                    to_visit.append(full)

            # Footer check
            footer = soup.find('footer')
            if footer:
                footer_text = footer.get_text(' ', strip=True).lower()
                if 'privacy' not in footer_text or 'terms' not in footer_text:
                    print(f'⚠️ Missing legal links on {url}')
                    broken_links.append((url, 'missing-footer-legal', ''))

            # Navigation check
            nav = soup.find('nav')
            if nav:
                for a in nav.find_all('a', href=True):
                    href = urljoin(BASE, a['href'])
                    if re.search(r'/(how-it-works|case-studies|resources)', href):
                        try:
                            test = requests.head(href, allow_redirects=True, timeout=10)
                            if test.status_code == 404:
                                broken_links.append((url, 'broken-nav-link', href))
                        except Exception as e:
                            broken_links.append((url, 'nav-check-error', str(e)))

    except Exception as e:
        print(f'⚠️ Error fetching {url}: {e}')
        broken_links.append((url, 'fetch-error', str(e)))

# --- Save crawl report ---
with open('boostwellbeing_crawl_report.csv', 'w', newline='', encoding='utf-8') as f:
    w = csv.writer(f)
    w.writerow(['url', 'status', 'final_url'])
    w.writerows(results)
print(f'\n✅ Crawl complete. {len(results)} pages scanned.\n')

# --- Generate redirect rules ---
redirects = []
for url, status, final in results:
    if status == 404:
        path = urlparse(url).path
        redirects.append(f'location = {path} {{ return 301 https://www.boostwellbeing.co.nz/; }}')

if redirects:
    with open('boostwellbeing_redirects.conf', 'w') as f:
        f.write('\n'.join(redirects))
    print('✅ Created boostwellbeing_redirects.conf with suggested Nginx redirects.')
else:
    print('✅ No 404 pages found.')

# --- HTML patch suggestions ---
footer_patch = '''\n<!-- ✅ Footer Patch -->\n<footer>\n  <a href="/privacy-policy" id="footer-privacy">Privacy Policy</a> |\n  <a href="/terms-of-service" id="footer-terms">Terms of Service</a>\n</footer>\n'''

nav_patch = '''\n<!-- ✅ Navigation Patch -->\n<nav>\n  <ul>\n    <li><a href="#how-it-works">How It Works</a></li>\n    <li><a href="#case-studies">Case Studies</a></li>\n    <li><a href="#resources">Resources</a></li>\n    <li><a href="/contact">Contact</a></li>\n  </ul>\n</nav>\n'''

with open('boostwellbeing_html_patches.txt', 'w') as f:
    f.write(footer_patch + '\n\n' + nav_patch)
print('✅ Suggested HTML patches written to boostwellbeing_html_patches.txt')

# --- Robots, sitemap, SSL checks ---
def safe_get(url):
    try:
        r = requests.get(url, timeout=10)
        return r.status_code
    except Exception as e:
        print(f'⚠️ {url} check error: {e}')
        return None

print('\n🔍 SEO & Config Checks:')
robots = safe_get(BASE + '/robots.txt')
print(f'robots.txt status: {robots}')
sitemap = safe_get(BASE + '/sitemap.xml')
print(f'sitemap.xml status: {sitemap}')

try:
    cert = ssl.get_server_certificate((domain, 443))
    print('✅ SSL certificate retrieved successfully.')
except Exception as e:
    print(f'⚠️ SSL check failed: {e}')

# --- Summary ---
print('\n📊 Summary:')
print(f'Total pages visited: {len(results)}')
print(f'Broken links found: {len(broken_links)}')

if broken_links:
    print('\n⚠️ Issues:')
    for b in broken_links:
        print(b)
else:
    print('🎉 No broken links detected in nav/footer.')

print('\n➡️ Files generated:')
print('  - boostwellbeing_crawl_report.csv')
print('  - boostwellbeing_redirects.conf')
print('  - boostwellbeing_html_patches.txt')
print('\n🏁 Done.')
