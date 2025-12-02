# Step-by-Step Guide: Hero Image for HVAC Landing Page

## Current Status
- **Current Image**: `/home.jpg` (already added)
- **Location**: HVAC Landing Page (`/hvac`) - Hero Section
- **Current Opacity**: 20% (very subtle)

---

## Step 1: Understand What You Need

The hero section on your HVAC landing page (`/hvac`) needs a **subtle background image** that:
- ✅ Works with a **bright, clean, minimalist** design
- ✅ Doesn't overpower the text (white/blue text on top)
- ✅ Shows a **modern home** or **HVAC-related** scene
- ✅ Is **light and airy** (not dark)

---

## Step 2: Image Specifications

### Technical Requirements:
- **File Format**: JPG or WebP
- **Size**: 1920x1080px (16:9 aspect ratio) or larger
- **File Size**: Under 500KB (optimized)
- **Current File**: `home.jpg` ✅ (already in `/static/` folder)

### Visual Requirements:
- **Style**: Bright, clean, modern
- **Colors**: Light tones (whites, light grays, soft blues)
- **Subject**: Modern home interior/exterior OR HVAC equipment in a clean setting
- **Mood**: Professional, trustworthy, clean

---

## Step 3: What Image Should Look Like

### Option A: Modern Home Interior (Recommended)
**What to look for:**
- Clean, modern living room or home interior
- Visible HVAC vents or air conditioning units (subtle)
- Bright, natural lighting
- Minimalist furniture
- White or light-colored walls

**Search Terms:**
- "modern home interior bright clean"
- "contemporary living room HVAC"
- "clean modern house interior"

**ChatGPT/DALL-E Prompt:**
```
Create a bright, clean, modern home interior image. Show a contemporary living room with white walls, natural lighting, and subtle HVAC vents or air conditioning visible. The style should be minimalist and professional. Bright, airy atmosphere. Aspect ratio: 16:9, style: professional photography, mood: clean and trustworthy.
```

### Option B: Modern Home Exterior
**What to look for:**
- Modern house exterior
- Clean architecture
- Bright daylight
- Professional appearance

**Search Terms:**
- "modern home exterior bright"
- "contemporary house clean"
- "professional home exterior"

### Option C: HVAC Equipment (Subtle)
**What to look for:**
- Modern HVAC unit in a clean setting
- Professional installation
- Bright, clean background
- Not too technical/detailed

**Search Terms:**
- "modern HVAC installation clean"
- "professional air conditioning unit bright"
- "clean HVAC system modern"

---

## Step 4: How to Add/Replace the Image

### If you want to use a different image:

1. **Find or create your image** using the prompts/search terms above

2. **Save it to the `/static/` folder** with one of these names:
   - `home.jpg` (replace existing)
   - `hero-hvac-landing.jpg` (new file)

3. **If using a new filename**, update the code in `src/routes/hvac/+page.svelte`:
   - Find line 186: `src="/home.jpg"`
   - Change to: `src="/hero-hvac-landing.jpg"` (or your filename)

---

## Step 5: Current Image Settings

The image is currently set with:
- **Opacity**: 20% (very subtle - you can see it but it doesn't overpower)
- **Overlay**: White gradient overlay (90% white at top/bottom, 30% blue in middle)
- **Position**: Behind all content (z-index: -10)
- **Size**: Full width and height (covers entire hero section)

### To Adjust Opacity:
If you want the image more or less visible, change line 188:
- More visible: `opacity-20` → `opacity-30` or `opacity-40`
- Less visible: `opacity-20` → `opacity-10` or `opacity-5`

---

## Step 6: Testing

After adding your image:

1. **Start the dev server**: `npm run dev`
2. **Visit**: `http://localhost:5173/hvac`
3. **Check**:
   - Image loads correctly
   - Text is still readable
   - Image doesn't overpower the design
   - Overall look is clean and professional

---

## Quick Decision Guide

**Use `/home.jpg` if:**
- ✅ It's a bright, clean image
- ✅ It shows a modern home or HVAC-related scene
- ✅ It works with the light theme

**Replace it if:**
- ❌ It's too dark
- ❌ It doesn't match the clean, minimalist style
- ❌ It's too busy/distracting
- ❌ You want something more specific

---

## Recommended Next Steps

1. **Check your current `/static/home.jpg`** - Does it match the description above?
2. **If yes**: You're done! The image is already in place.
3. **If no**: Use the prompts/search terms to find/create a better image
4. **Replace the file** in `/static/` folder
5. **Test** the page to make sure it looks good

---

## Summary

**Current Setup:**
- ✅ Image file: `/static/home.jpg`
- ✅ Code location: `src/routes/hvac/+page.svelte` line 186
- ✅ Opacity: 20% (subtle)
- ✅ Overlay: White/blue gradient

**What You Need:**
- A bright, clean, modern home or HVAC-related image
- 1920x1080px or larger
- Light colors, professional look

The image should enhance the hero section without competing with the text content.

