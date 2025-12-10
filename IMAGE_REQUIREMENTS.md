# Image Requirements

This document lists all images needed for the `/windows` and `/bathroom` pages.

## Header Logo

**Location:** Both pages - Header section
**File Path:** `/static/HomeQuote.png` (already exists)
**Current Usage:** `<img src="/HomeQuote.png" alt="HomeQuote Logo" class="h-10" />`
**Status:** ✅ Already exists in `/static/HomeQuote.png`
**Requirements:**
- Format: PNG (current)
- Dimensions: Minimum 200px width, transparent background preferred
- Content: HomeQuote logo or company branding
- Style: Clean, professional, works on white background

---

## Windows Page (`/windows`)

### Hero Section - Modern House Exterior

**Location:** Hero section, right side (around line 81-85 in `src/routes/windows/+page.svelte`)
**Current Placeholder Code:**
```svelte
<div class="aspect-video rounded-2xl bg-gradient-to-br from-blue-200 to-slate-200 flex items-center justify-center">
    <span class="text-slate-500 text-lg">Modern house exterior image placeholder</span>
</div>
```

**Replace With:**
```svelte
<img 
    src="/windows-hero.jpg" 
    alt="Modern home with energy-efficient windows" 
    class="aspect-video w-full rounded-2xl object-cover"
/>
```

**Requirements:**
- File Name: `windows-hero.jpg` (or `.webp`)
- File Location: `/static/windows-hero.jpg`
- Format: JPG or WebP
- Dimensions: Recommended 1200x800px (aspect ratio 3:2 or 16:9)
- Content: Modern home exterior showcasing windows
- Style: 
  - Professional photography
  - Well-lit, daytime shot
  - Shows quality windows installed on a modern home
  - Clean, inviting aesthetic
  - Should convey energy efficiency and quality
- Usage: Displayed in rounded-2xl container, responsive sizing

---

## Bathroom Page (`/bathroom`)

### Hero Section - Modern House Exterior

**Location:** Hero section, right side (around line 81-85 in `src/routes/bathroom/+page.svelte`)
**Current Placeholder Code:**
```svelte
<div class="aspect-video rounded-2xl bg-gradient-to-br from-blue-200 to-slate-200 flex items-center justify-center">
    <span class="text-slate-500 text-lg">Modern house exterior image placeholder</span>
</div>
```

**Replace With:**
```svelte
<img 
    src="/bathroom-hero.jpg" 
    alt="Modern home exterior" 
    class="aspect-video w-full rounded-2xl object-cover"
/>
```

**Requirements:**
- File Name: `bathroom-hero.jpg` (or `.webp`)
- File Location: `/static/bathroom-hero.jpg`
- Format: JPG or WebP
- Dimensions: Recommended 1200x800px (aspect ratio 3:2 or 16:9)
- Content: Modern home exterior (can be same as windows page or different)
- Style:
  - Professional photography
  - Well-lit, daytime shot
  - Modern, clean home exterior
  - Inviting and professional aesthetic
- Usage: Displayed in rounded-2xl container, responsive sizing

---

## Optional Service Icons

**Note:** Currently using Lucide icons (Zap, Shield, Award, CheckCircle, etc.). If you want custom service icons, they would replace these in the service cards.

---

## Image Implementation Notes

1. **File Organization:**
   - Place images in `/static/` directory (SvelteKit uses `/static/` for public assets)
   - Use descriptive filenames (e.g., `windows-hero.jpg`, `bathroom-hero.jpg`)
   - Images in `/static/` are served from the root path (e.g., `/static/image.jpg` → `/image.jpg`)

2. **Optimization:**
   - Compress images for web (use tools like ImageOptim, TinyPNG, or Squoosh)
   - Consider WebP format for better compression
   - Provide @2x versions for retina displays if needed

3. **Accessibility:**
   - All images should have descriptive alt text (already implemented in code)
   - Ensure sufficient contrast for any text overlays

4. **Responsive Design:**
   - Images are already set up to be responsive
   - Hero images use `aspect-video` class for consistent sizing
   - Images will scale appropriately on mobile devices

---

## Current Image Placeholders

All image placeholders are currently implemented as:
- Gradient backgrounds with descriptive text
- Functional layout that works without images
- Easy to replace by updating the `<div>` elements to `<img>` tags

---

## Quick Reference

| Page | Image | File Name | Location | Priority | Status |
|------|-------|-----------|----------|----------|--------|
| Both | Logo | `HomeQuote.png` | Header | High | ✅ Exists |
| Windows | House Exterior | `windows-hero.jpg` | Hero Section | High | ⏳ Needed |
| Bathroom | House Exterior | `bathroom-hero.jpg` | Hero Section | High | ⏳ Needed |

---

## Image Generation Prompts

### Windows Hero Image
```
Professional photography of a modern home exterior showcasing energy-efficient windows. 
Daytime shot, well-lit, clean and inviting aesthetic. The home should have high-quality 
windows visible, conveying energy efficiency and quality. Modern architectural style, 
blue sky, green lawn, professional real estate photography style.
```

### Bathroom Hero Image
```
Professional photography of a modern home exterior. Daytime shot, well-lit, clean and 
inviting aesthetic. Modern architectural style, blue sky, green lawn, professional 
real estate photography style. Can be same as windows image or different modern home.
```

### Logo
```
HomeQuote logo or company branding. Clean, professional design. Works on white background. 
Minimalist style, modern typography. Should be recognizable and professional.
```

---

## Next Steps

1. ✅ Logo already exists at `/static/HomeQuote.png` - no action needed
2. Generate or source the hero images using the prompts provided above
3. Place them in the `/static/` directory with the exact filenames:
   - `/static/windows-hero.jpg`
   - `/static/bathroom-hero.jpg`
4. Update the placeholder divs in the Svelte components to use `<img>` tags (code examples provided above)
5. Test on different screen sizes to ensure proper display
6. Optimize images for web (compress, consider WebP format)
