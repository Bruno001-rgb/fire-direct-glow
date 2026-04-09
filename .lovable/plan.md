

## Plan: Fullscreen Skin Detail Modal with Improved Layout

### What changes

Only **one file**: `src/components/catalogo/SkinDetailModal.tsx`

### Current state

The modal is `md:max-w-4xl md:max-h-[90vh]` — a centered card on desktop, full height on mobile. The user wants it to be truly fullscreen on all devices with a better layout.

### Implementation

**1. Make modal fullscreen**
- Remove `md:max-w-4xl`, `md:max-h-[90vh]`, `md:rounded-xl` constraints
- Set inner container to `w-full h-full` on all breakpoints
- The overlay already covers `fixed inset-0`

**2. Improved fullscreen layout — Desktop**
- Two-column layout using `md:grid md:grid-cols-[1fr_1fr] h-full`
- Left column: skin image centered vertically and horizontally, taking full height with the rarity radial gradient filling the entire left half
- Image scales larger (max-h-[70vh]) to use the space
- Right column: scrollable info panel with generous padding, content vertically centered

**3. Improved fullscreen layout — Mobile**
- Single column, scrollable
- Image area takes ~40vh with rarity gradient background
- Info section below with comfortable padding

**4. Close button**
- Larger, more visible close button in top-right corner
- Semi-transparent dark background for contrast against any skin image

**5. Visual polish**
- Subtle border-left separator between columns on desktop
- Right column gets a slightly darker background for contrast
- Larger skin name text (3xl on desktop)
- Larger price text
- More breathing room between sections

### Files changed
- `src/components/catalogo/SkinDetailModal.tsx` — layout overhaul to fullscreen

