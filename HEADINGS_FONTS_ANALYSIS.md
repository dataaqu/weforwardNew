# WeForward - Headings and Fonts Analysis (English Version)

## Font Family

**Default Font Stack:** System UI fonts (Tailwind CSS default)
```
ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif
```

- **macOS/iOS:** San Francisco
- **Windows:** Segoe UI
- **Android:** Roboto
- **Fallback:** Arial, Helvetica Neue

---

## Headings by Component

### 1. HeroSection.tsx
**Main Hero Heading (h1)**
- **Text:** "You Deal We Deliver [rotating words]"
- **Font Size:** `text-4xl` (mobile), `sm:text-5xl` (tablet), `lg:text-6xl` (desktop)
- **Font Weight:** `font-bold`
- **Font Family:** System UI (default)
- **Color:** White with gradient effect (green to cyan on animated words)
- **Additional:** `leading-tight` for line height

---

### 2. Services.tsx
**Section Title (h2)**
- **Text:** Service section heading
- **Font Size:** `text-4xl` (mobile), `md:text-5xl` (desktop)
- **Font Weight:** `font-bold`
- **Font Family:** System UI (default)
- **Color:** White/dark with gradient highlight on specific words
- **Gradient:** `from-[#309f69] to-[#2ff9c3]`

---

### 3. Partners.tsx
**Section Title (h2)**
- **Text:** "Trusted Partners"
- **Font Size:** `text-4xl` (mobile), `md:text-5xl` (desktop)
- **Font Weight:** `font-bold`
- **Font Family:** System UI (default)
- **Color:** White/dark with gradient effect

---

### 4. Contact.tsx

**Main Section Heading (h2)**
- **Text:** "Contact Us"
- **Font Size:** `text-4xl` (mobile), `md:text-5xl` (desktop)
- **Font Weight:** `font-bold`
- **Font Family:** System UI (default)
- **Color:** White/dark

**Subsection Headings (h3)**
- **Text:** "Contact Information" / "Send us a Message"
- **Font Size:** `text-2xl` / `text-xl`
- **Font Weight:** `font-bold`
- **Font Family:** System UI (default)
- **Color:** White/dark

**Small Section Heading (h4)**
- **Text:** "Follow Us"
- **Font Size:** `text-lg`
- **Font Weight:** `font-semibold`
- **Font Family:** System UI (default)
- **Color:** White/dark

---

### 5. FocusCards.tsx (Service Cards)
**Service Card Titles (h3)**
- **Text:** Service names (Air Freight, Road Freight, etc.)
- **Font Size:** `text-2xl` (mobile), `md:text-3xl` (desktop)
- **Font Weight:** `font-extrabold`
- **Font Family:** System UI (default)
- **Color:** Gradient text `bg-gradient-to-r from-[#309f69] to-[#2ff9c3]`
- **Additional:** `uppercase`, `bg-clip-text`, `text-transparent`

---

### 6. BlogPage.tsx

**Page Title (h1)**
- **Text:** "Our Blog"
- **Font Size:** `text-4xl` (mobile), `md:text-6xl` (desktop)
- **Font Weight:** `font-bold`
- **Font Family:** System UI (default)
- **Color:** White/dark

**Empty State Heading (h2)**
- **Text:** "Blog is coming soon!"
- **Font Size:** `text-3xl`
- **Font Weight:** `font-bold`
- **Font Family:** System UI (default)
- **Color:** White/dark

**Blog Post Card Titles (h2)**
- **Font Size:** `text-2xl` (mobile), `md:text-3xl` (desktop)
- **Font Weight:** `font-bold`
- **Font Family:** System UI (default)
- **Color:** White

---

### 7. ServicePageLayout.tsx
**Service Section Heading (h3)**
- **Text:** "Service Information"
- **Font Size:** `text-3xl`
- **Font Weight:** `font-bold`
- **Font Family:** System UI (default)
- **Color:** White/dark

---

## Font Weight Summary

| Weight Class | Weight Value | Usage |
|--------------|--------------|-------|
| `font-bold` | 700 | Main headings (h1, h2, h3) |
| `font-extrabold` | 800 | Service card titles |
| `font-semibold` | 600 | Small section headings (h4) |

---

## Font Size Summary

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| h1 (Hero) | 2.25rem (36px) | 3rem (48px) | 3.75rem (60px) |
| h2 (Sections) | 2.25rem (36px) | - | 3rem (48px) |
| h2 (Blog posts) | 1.5rem (24px) | - | 1.875rem (30px) |
| h3 (Service cards) | 1.5rem (24px) | - | 1.875rem (30px) |
| h3 (Contact) | 1.5rem (24px) | - | - |
| h3 (Service pages) | 1.875rem (30px) | - | - |
| h4 (Follow Us) | 1.125rem (18px) | - | - |

---

## Color Scheme

**Primary Gradient (Brand Colors)**
- Start: `#309f69` (Green)
- End: `#2ff9c3` (Cyan)
- Applied with: `bg-gradient-to-r from-[#309f69] to-[#2ff9c3]`

**Text Colors**
- Light theme: Dark text
- Dark theme: White text
- Gradient text: Transparent with gradient background clipped to text

---

## Typography Configuration Files

**Tailwind Config:** [tailwind.config.js](tailwind.config.js)
- No custom font family defined
- Uses Tailwind CSS default system fonts

**CSS:** [src/index.css](src/index.css)
- No custom `@font-face` declarations
- No Google Fonts imports
- Relies on system font stack

**HTML:** [index.html](index.html)
- No font preloads
- No font links

---

## Notes

1. **No Custom Fonts:** The project does not use any custom web fonts (no Google Fonts, no local font files)
2. **System Fonts Only:** All headings use the native system font of each device
3. **Responsive Design:** Font sizes adjust based on screen size using Tailwind's responsive classes
4. **Gradient Effects:** Brand gradient colors (`#309f69` to `#2ff9c3`) are used extensively on headings for visual impact
5. **Multilingual Support:** Headings support English (en) and Georgian (ka) through the translation system
