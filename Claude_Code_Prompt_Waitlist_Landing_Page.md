# Claude Code Prompt: Premium Matchmaking Waitlist Landing Page

## COPY AND PASTE THE ENTIRE TEXT BELOW INTO CLAUDE CODE

---

You are an expert frontend developer. Build a stunning, modern landing page for a premium matchmaking events company launching in the Greater Toronto Area. This is the waitlist sign-up page that will be the first touchpoint for potential attendees.

## CORE REQUIREMENTS

### Page Purpose
Create a high-converting waitlist landing page for a premium matchmaking events company with these key messages:
- Mission: "Help people find genuine, long-term partners"
- Approach: Premium in-person events (not another dating app)
- Target: Professionals seeking authentic connections
- Location: Greater Toronto Area (Canada)

### Design Philosophy
- **Premium & Sophisticated**: Not flashy or cheap-looking. Think luxury dating/lifestyle brands
- **Modern & Clean**: Minimalist with generous whitespace, high-end typography
- **Trustworthy & Authentic**: Should feel genuine, not manipulative or salesy
- **Animated & Engaging**: Smooth, subtle animations that enhance (not distract)
- **Mobile-First**: Must look stunning on phones, tablets, and desktops

## VISUAL DESIGN SPECIFICATIONS

### Color Palette
- Primary: Deep Navy Blue (#1a1f3a) or Charcoal (#2c2c2c)
- Accent: Gold/Rose Gold (#d4af37 or #c97e6f) - conveys premium, romance
- Secondary: Soft White/Cream (#f8f7f5)
- Text: Dark gray (#333333) on light, white on dark
- Accent highlights: Subtle peachy/coral tones for CTAs

### Typography
- Headings: Elegant serif font (e.g., Playfair Display, Georgia, or similar - conveys luxury)
- Body: Clean sans-serif (e.g., Inter, Poppins, or Segoe UI - modern, readable)
- Headlines: Large, bold, confident (60-80px on desktop, 36-48px mobile)

### Layout Structure
1. **Hero Section** (100vh viewport height)
   - Headline: "Find Your Forever Someone"
   - Subheadline: About genuine connections and premium events
   - Background: Elegant gradient or subtle pattern
   - Call-to-action button to form (below the fold slightly)
   - Optional: Subtle hero image (silhouettes, candlelit dinner, elegant venue) - very subtle, not stock photo cheesy

2. **Why Us Section** (3-4 key differentiators)
   - "Vetted Community" (genuine people, not tire-kickers)
   - "In-Person Connection" (no swiping, real conversations)
   - "Curated Events" (premium venues, carefully designed)
   - "Proven Track Record" (success stories, matches made)
   - Use icons or small illustrations (minimal, elegant)

3. **How It Works Section** (3-4 steps)
   - Step 1: Join our waitlist
   - Step 2: Attend your first curated event
   - Step 3: Meet genuine singles in premium setting
   - Step 4: Find your match (or make great friends)
   - Each step should have a small visual/animation

4. **Testimonials/Social Proof Section**
   - 2-3 testimonials from past event attendees
   - Short quotes about genuine connections, meeting someone special
   - Include first name and city only (privacy-focused)
   - Example: "Finally met someone who actually wants a real relationship" - Sarah, Toronto
   - Display as cards with subtle shadows and hover effects

5. **The Waitlist Form Section** (prominent, centered)
   - Large, clean form with clear labels
   - Headline: "Join Our Launch Community"
   - Subtext: "Early members get exclusive first-event access and pricing"
   - Form fields (see detailed specs below)
   - Submit button with hover animation
   - Success message after submission

6. **FAQ Section** (optional, collapse/expand)
   - Common questions about events, pricing, safety, vetting
   - Accordion-style (one open at a time)
   - Simple, honest answers

7. **Footer**
   - Social media links (Instagram, TikTok, LinkedIn)
   - Contact email
   - Privacy policy / Terms of Service (links)
   - Copyright

## FORM SPECIFICATIONS

### Form Fields (In This Order)
1. **Full Name**
   - Type: Text input
   - Placeholder: "Your full name"
   - Required: Yes
   - Validation: Min 2 characters

2. **Email Address**
   - Type: Email input
   - Placeholder: "your.email@example.com"
   - Required: Yes
   - Validation: Valid email format

3. **Phone Number**
   - Type: Tel input
   - Placeholder: "+1 (XXX) XXX-XXXX" or "(XXX) XXX-XXXX"
   - Required: Yes
   - Validation: Valid Canadian/North American format
   - Format the input automatically (JavaScript)

4. **City**
   - Type: Dropdown select
   - Placeholder: "Select your city"
   - Required: Yes
   - Cities list (Canadian provinces with major cities):
     ```
     Toronto, ON
     Vancouver, BC
     Montreal, QC
     Calgary, AB
     Edmonton, AB
     Ottawa, ON
     Mississauga, ON
     Winnipeg, MB
     Quebec City, QC
     Hamilton, ON
     Brampton, ON
     Kitchener, ON
     London, ON
     Halifax, NS
     St. Catharines, ON
     Markham, ON
     Vaughan, ON
     Windsor, ON
     Saskatoon, SK
     Regina, SK
     Kelowna, BC
     Victoria, BC
     Barrie, ON
     Thunder Bay, ON
     Other
     ```
   - Sort alphabetically by city name
   - Allow search/filter in dropdown (user can type to find)

### Form Container
- Max width: 500px
- Clean white or light background with subtle shadow
- Rounded corners (12-16px)
- Padding: 40px
- Spacing between fields: 20px

### Input Styling
- Border: 1px solid light gray (#e0e0e0)
- Border-radius: 8px
- Padding: 12px 16px
- Font size: 16px (prevents mobile zoom)
- Focus state: Border changes to accent color, subtle glow effect
- Placeholder color: Light gray (#999)
- All inputs have smooth transitions

### Submit Button
- Text: "Join the Waitlist" (or "Get Early Access")
- Size: Full width of form
- Padding: 16px 32px (tall button, premium feel)
- Background: Gradient (dark navy to accent color) or solid accent color
- Text color: White
- Border-radius: 8px
- Font: Bold, 16px, sans-serif
- Cursor: Pointer
- States:
  - Default: Slight shadow, confident
  - Hover: Background shifts darker, shadow grows, subtle lift animation
  - Active/Clicked: Button shows loading state (spinner icon inside, text "Joining...")
  - Success: Button changes color to green with checkmark, text "Welcome to our community!"

### Form Validation
- Real-time validation (show error messages as user types)
- Error messages: Small, red text below field
- Success state: Green checkmark icon next to field
- Submit button disabled until all fields valid
- Show clear error if submission fails

### Success Message
After successful form submission:
- Modal or overlay appears
- Message: "Welcome! Check your email for next steps"
- Subtext: "We're excited to have you. Early members get exclusive access to our launch events."
- Button: "Close" or auto-close after 3 seconds
- Optional: Confetti animation (subtle, tasteful)

## ANIMATION SPECIFICATIONS

### Hero Section
- Fade-in on load (text staggered, 200ms between each line)
- Subtle parallax effect on background image (if used) as user scrolls
- Smooth scroll-to-form animation when CTA button clicked

### Section Transitions
- Each section fades in as it enters viewport (Intersection Observer API)
- Stagger effect: Elements appear in sequence (left-to-right or top-to-bottom)
- Duration: 500-800ms per animation
- Easing: ease-out or ease-in-out (smooth, not bouncy)

### Why Us / How It Works Cards
- Hover effect: Subtle lift (transform: translateY(-8px))
- Shadow increases on hover
- Border accent appears/animates on hover (colored left or top border)
- Transition duration: 300ms

### Form
- Form container slides in from bottom or fades in (smooth)
- Input focus: Border glows with accent color (box-shadow animation)
- On submit: Button scales slightly, loader appears

### Testimonials
- Cards appear one by one as section scrolls into view
- Quotes have a slight text animation (fade + scale)
- Star ratings (if included) animate in sequence

### Scroll-Triggered Animations
- Use CSS animations triggered by scroll (Intersection Observer)
- Numbers count up (e.g., "500+ members joined" counts from 0 to 500)
- Bars/progress indicators animate from left to right

### Micro-Interactions
- Links have underline animation on hover
- Buttons scale smoothly on hover/click
- Form fields have smooth color transitions
- Success checkmarks have a little "pop" animation

**DO NOT:**
- Avoid motion sickness: No rapid flashing, no infinite spinning
- No autoplaying videos or audio
- No excessive animations that slow page load
- Animations should enhance UX, not distract

## CONTENT TO INCLUDE

### Key Messages to Highlight
- "Premium in-person matchmaking events"
- "Vetted community of genuine singles"
- "No swiping, real conversations"
- "Curated venues and experiences"
- "Mission: Help you find your forever partner"
- "First events launching soon in Greater Toronto Area"

### Optional: Statistics/Social Proof
- "500+ people joined our waitlist in first week"
- "80% of attendees report genuine connections"
- "Multiple matches made at our events"
(Use placeholder numbers that feel real, not exaggerated)

## TECHNICAL REQUIREMENTS

- **Framework**: React or vanilla HTML/CSS/JavaScript (your choice)
- **Responsive**: Mobile-first approach, works flawlessly on all screen sizes
- **Performance**: Fast load times, optimized images, minimal JavaScript
- **Accessibility**: 
  - Proper heading hierarchy (h1, h2, h3)
  - ARIA labels for form inputs
  - Alt text for images
  - Keyboard navigation support
  - Color contrast meets WCAG AA standards
- **Form Handling**: 
  - Form data validation on frontend
  - Prevent form resubmission
  - Show loading state during submission
  - (Note: Backend integration would need to be set up separately - for demo, use console.log or localStorage)
- **Browser Support**: Chrome, Safari, Firefox, Edge (modern versions)
- **SEO**: Proper meta tags, Open Graph tags for social sharing

## DESIGN INSPIRATIONS (Aesthetic Reference)
- Think: Luxury dating apps like The League, Raya, or Select
- Think: Premium event companies like Eventbrite premium or Luxy
- Think: Upscale hotel/restaurant landing pages (not dating app cheesy)
- Clean, sophisticated, high-end, trustworthy

## DO NOT DO THESE THINGS
- ❌ Don't use cheap stock photos of couples
- ❌ Don't make it look like a typical dating app (red hearts, swiping visuals)
- ❌ Don't use low-quality icons or clipart
- ❌ Don't have too much text or information (keep it concise)
- ❌ Don't use more than 3-4 primary colors
- ❌ Don't add unnecessary features (keep focused on waitlist sign-up)
- ❌ Don't make forms too long (only 4 fields)
- ❌ Don't auto-play any media
- ❌ Don't use bright neons or clashing colors
- ❌ Don't make animations too fast or jerky

## SUCCESS CRITERIA
The landing page should:
✅ Look premium and trustworthy (not cheap or spammy)
✅ Be crystal clear about the value proposition (in-person premium events)
✅ Have smooth, purposeful animations (not distracting)
✅ Form is easy to complete and submit
✅ Mobile looks as good as desktop
✅ Loads fast (< 3 seconds on 4G)
✅ Converts: Makes people want to join the waitlist
✅ Professional: Could be shown to investors or partners

## BUILD IT NOW
Create a fully functional, production-quality landing page based on all specifications above. Make it beautiful, make it convert, make it unforgettable.

---

## END OF PROMPT

