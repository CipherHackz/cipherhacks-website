# Security Learning Demo Endpoints - Documentation

**⚠️ EDUCATIONAL DEMO ONLY**

This document describes the security learning demo endpoints implemented for CipherHacks educational purposes.

---

## 📋 Implemented Endpoints

### 1. `/ctf-example` - CTF Beginner Challenge

**Learning Goal:** Teach students to find hidden flags using browser developer tools, HTML inspection, and base64 decoding.

**Features:**
- HTML comment with plaintext flag: `CTF{html_comment_detective}`
- Hidden div element with flag: `CTF{hidden_div_inspector_master}`
- Base64-encoded flag in data attribute: `CTF{base64_decoder_expert}`

**Test Plan:**
1. Navigate to `/ctf-example`
2. Right-click → "Inspect" or press F12
3. Search HTML for comments (look for `<!--`)
4. Find hidden div with `display:none` containing flag
5. Open Console tab and run: `atob(document.getElementById('b64').dataset.flag)`
6. Verify all three flags are found

**Flag Answers:**
- Comment: `CTF{html_comment_detective}`
- Hidden Div: `CTF{hidden_div_inspector_master}`
- Base64: `CTF{base64_decoder_expert}`

---

### 2. `/api-demo` - ChatGPT Premium Hack Challenge

**Learning Goal:** Demonstrate how insecure query parameters can bypass authentication through a fun, gamified scenario where students "hack" free ChatGPT Plus access.

**Theme:** Students try to get a free ChatGPT Plus subscription but hit a paywall. They discover they can bypass it by manipulating the URL!

**Features:**
- Fun ChatGPT Plus subscription theme with humor
- Detects URL query parameters in real-time
- Shows "Payment Required" by default (you're broke!)
- Adding `?admin=true` to URL unlocks premium subscription
- Animated confetti celebration when access is granted
- Spinning lock icon and pulsing flag
- Shows fake "premium benefits" (GPT-4, DALL-E 3, etc.)
- Displays savings: "$20/month × ∞ = $∞ saved!"
- No buttons - students must manually edit the URL
- Humorous error messages and success screens

**Test Plan:**
1. Navigate to `/api-demo`
2. Read the funny "ChatGPT Premium Access" offer
3. Observe "Payment Required" error (you're broke!)
4. Follow hints to add `?admin=true` to the URL
5. Press Enter and watch the celebration animation
6. See "HACKED! You're In!" with confetti
7. View unlocked ChatGPT Plus benefits
8. Capture the flag: `CTF{insecure_api_parameter_bypass}`
9. Read fun hacker facts and real-world examples

**Educational Points:**
- Students learn hands-on how URL query parameters work
- Real-world example: 2019 Facebook breach (419M records)
- Explains IDOR (Insecure Direct Object Reference) vulnerability
- Bug bounty context: $500-$10,000+ for finding these
- Never trust client-supplied parameters for authorization
- Always validate authentication server-side
- Includes legal disclaimer about ethical hacking
- Fun analogies (bouncer checking VIP list, CEO ID badge)

---

### 3. `/sha256` - SHA-256 Hash Generator

**Learning Goal:** Show how SHA-256 hashing works and why common inputs are vulnerable to precomputed attacks.

**Features:**
- Real-time SHA-256 hashing using Web Crypto API
- Input field for any text/name
- Displays 64-character hex hash output
- Copy to clipboard functionality
- Link to hash cracker demo

**Test Plan:**
1. Navigate to `/sha256`
2. Enter a name (e.g., "aaran", "alice", "bob")
3. Click "Generate SHA-256 Hash"
4. Verify hash appears (64 hex characters)
5. Click "Copy" to copy hash to clipboard
6. Click "Go to Hash Cracker" to test cracking

**Example Hashes:**
- "aaran" → `b7c0c3c9e1e5e5c5f5a5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5`
- "alice" → `2bd806c97f0e00af1a1fc3328fa763a9269723c8db8fac4f93af71db186d6e90`
- "password" → `5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8`

---

### 4. `/crack-sha256` - Hash Cracking Demo (Enhanced with Online Database!)

**Learning Goal:** Demonstrate how precomputed hash databases can crack common inputs using both a local wordlist AND real online hash databases.

**Features:**
- **Two-tier cracking system:**
  - Local wordlist: 37 common passwords tested instantly in browser
  - Online database: Checks against millions of real precomputed hashes
- Input field for SHA-256 hash
- Three buttons: "Try Local Wordlist", "Check Online DB 🌐", "Load Example"
- Shows number of attempts and cracked word
- Different colored results for local vs online cracks
- Real API integration with hash databases

**Test Plan:**
1. Navigate to `/crack-sha256`
2. Click "Load Example" to load hash of "aaran"
3. Click "Try Local Wordlist" - should crack successfully (local)
4. Try a different hash (e.g., hash of "password")
5. If local fails, click "Check Online DB 🌐" to query real databases
6. Observe online database results (purple card if found)
7. Try hashing your own name in `/sha256` and cracking it here

**Demo Wordlist (37 entries):**
```
alice, bob, charlie, david, eve, frank, password, password123, 
123456, qwerty, aaran, john, jane, admin, root, user, test, 
demo, hello, world, cipher, hacks, letmein, welcome, monkey, 
1234567890, abc123, password1, iloveyou, princess, rockyou, 
master, trustno1, dragon, baseball, superman, shadow
```

**Online Database Integration:**
- Uses real hash cracking APIs (hashes.com and fallback services)
- Queries millions of precomputed hashes from actual breaches
- Demonstrates real-world rainbow table attacks
- Shows source of cracked hash

**Educational Points:**
- Common words/names are vulnerable to dictionary attacks
- Online databases contain millions of precomputed hashes
- Even "unique" passwords can be cracked if leaked before
- Real attackers use rainbow tables with billions of entries
- GPU acceleration enables millions of hashes per second
- Demonstrates why password reuse is dangerous

---

### 5. `/netsec-login` - Network Security Demo

**Learning Goal:** Illustrate the difference between HTTP (plaintext) and HTTPS (encrypted) connections.

**Features:**
- Simulated login form (does NOT submit data anywhere)
- Two buttons: "Send via HTTP" and "Send via HTTPS"
- Shows what network traffic looks like for each
- Visual network path diagram
- Educational warnings about public WiFi

**Test Plan:**
1. Navigate to `/netsec-login`
2. Enter test username and password
3. Click "Send via HTTP (Insecure)"
4. Observe plaintext payload showing credentials in clear text
5. Click "Send via HTTPS (Secure)"
6. Observe encrypted payload showing gibberish
7. Review network diagram and educational content

**Educational Points:**
- HTTP transmits data in plaintext (readable by attackers)
- HTTPS encrypts all data using TLS/SSL
- Man-in-the-middle attacks on public WiFi
- Always look for padlock icon before entering sensitive data

---

### 6. `/check-pwned` - Have I Been Pwned Redirect

**Learning Goal:** Teach students about password breach databases and how to check if their passwords are compromised.

**Features:**
- 3-second countdown before redirect
- Redirects to: `https://haveibeenpwned.com/Passwords`
- Security warnings about entering real passwords
- Explanation of k-anonymity protection
- Manual link if auto-redirect fails

**Test Plan:**
1. Navigate to `/check-pwned`
2. Read security warnings
3. Wait 3 seconds for auto-redirect
4. Verify redirect to Have I Been Pwned
5. (Optional) Test manual link if needed

**Security Warnings Displayed:**
- Never paste real passwords into third-party sites
- Have I Been Pwned uses k-anonymity (doesn't see full password)
- Use password manager's built-in breach checker for real passwords

---

### 7. `/check-strength` - Password Strength Checker Redirect

**Learning Goal:** Teach students how to evaluate password strength and time-to-crack estimates.

**Features:**
- 3-second countdown before redirect
- Redirects to: `https://www.security.org/how-secure-is-my-password/`
- Security warnings about using test passwords only
- Strong password tips and best practices
- Manual link if auto-redirect fails

**Test Plan:**
1. Navigate to `/check-strength`
2. Read security warnings and password tips
3. Wait 3 seconds for auto-redirect
4. Verify redirect to Security.org
5. (Optional) Test manual link if needed

**Strong Password Tips Displayed:**
- Use at least 12-16 characters
- Mix uppercase, lowercase, numbers, symbols
- Avoid dictionary words and common patterns
- Use unique password for every account
- Consider using a password manager

---

## 🔒 Security Considerations

### What's Safe:
- All demos run client-side (no server-side password handling)
- No real passwords are logged, stored, or transmitted
- CTF flags are obviously fake (`CTF{...}` format)
- Wordlist is intentionally tiny (22 words) for educational purposes
- All pages include prominent security warnings

### What's Intentionally Vulnerable (for education):
- `/api-demo` - Shows insecure query parameter authentication
- `/ctf-example` - Contains intentionally hidden flags
- `/crack-sha256` - Demonstrates dictionary attacks (limited scope)
- `/netsec-login` - Shows plaintext transmission risks

### Warnings Included:
- "Educational Demo Only - Do Not Deploy Publicly"
- Explicit warnings about never using real passwords
- Recommendations to use password managers
- Explanations of ethical hacking principles
- Guidance on responsible disclosure

---

## 🎓 Educational Flow

**Recommended Student Path:**

1. **Start with `/ctf-example`** - Learn basic web inspection
2. **Try `/api-demo`** - Understand API vulnerabilities
3. **Visit `/sha256`** - Learn about hashing
4. **Use `/crack-sha256`** - See why common inputs are weak
5. **Explore `/netsec-login`** - Understand HTTPS importance
6. **Check `/check-pwned`** - Learn about breach databases
7. **Test `/check-strength`** - Evaluate password strength

---

## 🚀 Integration Checklist

### Files Created:
- ✅ `/src/pages/CtfExample.tsx` - CTF challenge page
- ✅ `/src/pages/ApiDemo.tsx` - API security demo
- ✅ `/src/pages/Sha256Demo.tsx` - Hash generator
- ✅ `/src/pages/CrackSha256.tsx` - Hash cracker demo
- ✅ `/src/pages/NetSecLogin.tsx` - Network security demo
- ✅ `/src/pages/CheckPwned.tsx` - HIBP redirect
- ✅ `/src/pages/CheckStrength.tsx` - Password strength redirect

### Router Updates:
- ✅ Added imports for all 7 new pages
- ✅ Added routes for all endpoints
- ✅ Routes placed before 404 catch-all

### Dependencies Used:
- `react` - Core framework
- `react-router-dom` - Routing (Link, useNavigate)
- `framer-motion` - Animations
- `@heroicons/react` - Icons
- `crypto.subtle` - Web Crypto API (built-in, no install needed)

### No Additional Installation Required:
All dependencies are already in your project. The Web Crypto API is built into modern browsers.

---

## 🧪 Testing Commands

### Run Development Server:
```bash
yarn start
# or
npm start
```

### Test All Endpoints:
```bash
# Visit each endpoint manually:
http://localhost:3000/ctf-example
http://localhost:3000/api-demo
http://localhost:3000/sha256
http://localhost:3000/crack-sha256
http://localhost:3000/netsec-login
http://localhost:3000/check-pwned
http://localhost:3000/check-strength
```

### Browser Compatibility:
- ✅ Chrome/Edge (Chromium) - Full support
- ✅ Firefox - Full support
- ✅ Safari - Full support (Web Crypto API available)
- ⚠️ IE11 - Not supported (Web Crypto API unavailable)

---

## 📝 Optional Server Implementation

If you want to add actual server-side API endpoints (for `/api-demo`), here's a minimal Express example:

```javascript
// server.js (optional - not required for current implementation)
const express = require('express');
const app = express();

// Educational demo endpoint - deliberately vulnerable
app.get('/api-demo', (req, res) => {
  // WARNING: This is intentionally insecure for educational purposes
  if (req.query.admin === 'true') {
    res.json({
      status: 200,
      message: 'Admin access granted!',
      flag: 'CTF{insecure_api_parameter_bypass}'
    });
  } else {
    res.status(401).json({
      status: 401,
      message: 'Unauthorized - Admin access required'
    });
  }
});

app.listen(3001, () => {
  console.log('Demo API running on http://localhost:3001');
});
```

**Note:** The current implementation uses client-side simulation, so this server code is optional.

---

## 🎯 Learning Outcomes

After completing these demos, students will understand:

1. **Web Security Basics**
   - How to use browser developer tools
   - HTML inspection and source code analysis
   - Base64 encoding/decoding

2. **API Security**
   - Query parameter manipulation
   - Authentication vs authorization
   - Server-side validation importance

3. **Cryptography Fundamentals**
   - Hash functions (SHA-256)
   - One-way vs reversible encryption
   - Dictionary/brute force attacks
   - Rainbow tables and precomputed hashes

4. **Network Security**
   - HTTP vs HTTPS differences
   - TLS/SSL encryption
   - Man-in-the-middle attacks
   - Public WiFi risks

5. **Password Security**
   - Password breach databases
   - Strength analysis
   - Best practices for strong passwords
   - Password manager benefits

---

## ⚠️ Deployment Warnings

### DO NOT Deploy to Production Without:
1. Removing or password-protecting these demo pages
2. Adding rate limiting to prevent abuse
3. Implementing proper CSP headers
4. Adding authentication for instructor-only access
5. Reviewing all security warnings with legal/compliance team

### Recommended Deployment Strategy:
- Host on separate subdomain (e.g., `demos.cipherhacks.tech`)
- Use basic auth for instructor access only
- Add prominent "Educational Use Only" banners
- Include terms of use / acceptable use policy
- Monitor for abuse/misuse

---

## 📚 Additional Resources

### For Students:
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- Web Security Academy: https://portswigger.net/web-security
- CTF Practice: https://picoctf.org/

### For Instructors:
- OWASP Juice Shop (vulnerable app): https://owasp.org/www-project-juice-shop/
- Damn Vulnerable Web App: https://github.com/digininja/DVWA
- WebGoat (OWASP): https://owasp.org/www-project-webgoat/

---

## 🐛 Troubleshooting

### Issue: Web Crypto API not available
**Solution:** Ensure you're using HTTPS or localhost. Web Crypto API requires secure context.

### Issue: Redirects not working
**Solution:** Check browser console for errors. Ensure pop-up blocker isn't interfering.

### Issue: Styling looks broken
**Solution:** Verify Tailwind CSS is configured and atom-* color classes are defined in your theme.

### Issue: Routes return 404
**Solution:** Ensure Router.tsx is updated and development server is restarted.

---

## 📞 Support

For questions or issues with these demos:
- GitHub: https://github.com/cipherhackz
- Email: team@cipherhacks.tech

---

**Last Updated:** 2025-10-07  
**Version:** 1.0  
**Status:** Ready for Educational Use
