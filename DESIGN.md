---
name: Ahmed Shebl Portfolio
description: Crisp backend work on a charcoal and lavender canvas.
colors:
  bg: "#111114"
  surface: "#1d1c24"
  surface-alt: "#292631"
  text: "#f3f0f7"
  muted: "#b7b1c2"
  line: "#3b3544"
  accent: "#c7b1f4"
  accent-bg: "#342944"
  button: "#c7b1f4"
  button-text: "#21182e"
  focus: "#d5c2fa"
  light-bg: "#f7f5fa"
  light-text: "#24212b"
  light-muted: "#63596f"
  light-line: "#d7cedf"
  light-accent: "#69439f"
  light-accent-bg: "#eee5fb"
  light-surface: "#fff"
  light-surface-alt: "#eae5f1"
  estate-canvas: "#c9b6ed"
  estate-ink: "#2b1a44"
  estate-node: "#e9dff9"
  estate-line: "#775b9b"
  commerce-canvas: "#26202f"
  commerce-ink: "#f1e9fb"
  commerce-node: "#352b42"
typography:
  display:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(55px, 7.3vw, 96px)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(35px, 5vw, 58px)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  title:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "29px"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "16px"
    lineHeight: 1.65
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "14px"
    lineHeight: 1.65
  score:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "28px"
    fontWeight: 500
rounded:
  control: "12px"
  canvas: "16px"
  selector: "8px"
  direction: "6px"
spacing:
  compact: "12px"
  control-x: "21px"
  mobile-gutter: "22px"
  gutter: "48px"
  column-gap: "70px"
components:
  button-primary:
    backgroundColor: "{colors.button}"
    textColor: "{colors.button-text}"
    rounded: "{rounded.control}"
    padding: "12px 21px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    padding: "12px 21px"
  theme-control:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    padding: "9px 14px"
  navigation:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    padding: "12px 0"
  project-canvas:
    backgroundColor: "{colors.estate-canvas}"
    textColor: "{colors.estate-ink}"
    rounded: "{rounded.canvas}"
    padding: "30px 35px 24px"
  game-selector:
    backgroundColor: "{colors.accent-bg}"
    textColor: "{colors.accent}"
    rounded: "{rounded.selector}"
    padding: "10px 17px"
---

# Design System: Ahmed Shebl Portfolio

## Overview

**Creative North Star: "Connected work, clearly presented"**

Charcoal ground, lavender accents, flat geometry, quiet navigation and crisp self-hosted typography make real backend work readable. Open space and a restrained hierarchy give names, roles and workflows room to stand on their own.

The light theme translates the same relationships into pale paper and deep violet. Project exhibits keep their own fixed palettes so diagrams stay coherent across both themes.

**Key Characteristics:**
- Open spacing and large, medium-weight typography.
- Flat, softly rounded workflow exhibits.
- Clear theme-aware controls and visible keyboard focus.

## Colors

### Primary
Lavender supplies emphasis and filled actions in dark mode; deep violet fills the same role in light mode. Accent backgrounds identify selected game controls. Focus has its own theme token.

### Secondary
The real estate exhibit uses a lavender canvas, plum ink and pale nodes. Commerce uses a deep plum canvas and pale lettering. These palettes belong to project exhibits.

### Neutral
Charcoal supplies the dark page ground; pale paper supplies the light page ground. Text, muted text, line, surface and alternate-surface tokens adapt with the theme. Light buttons and focus use the light-accent value; light button text uses light-surface.

**The Theme Relationship Rule.** Use theme tokens for page content and controls; preserve fixed project palettes within their exhibits.

## Typography

DM Sans is self-hosted for display, body, labels and game scores. Medium-weight headings use tight tracking; body copy uses generous leading. The matching game's literal code symbols alone use monospace. Scores use tabular numerals.

Frontmatter records desktop name, contact headline, project title, body, label and score roles. The introduction role is 0.8 times the name size. At 650px the name uses clamp(40px, 9vw, 58px); other section titles use 24–30px variants and metadata 12–14px. Introductory copy is 18px on desktop and 16px on mobile.

**The One Family Rule.** Keep text and numeric scores in DM Sans; reserve monospace for literal code symbols.

## Layout

Header, main and footer share a centered container capped at 1216px with 48px horizontal padding, becoming 22px at 650px. Header height is 108px on desktop and 90px on mobile; below 370px navigation wraps.

Large project exhibits span the content width. Summaries and smaller projects use two columns. About uses a 1:2 grid with a 70px gap. Body copy generally stays within 47–65 characters per line. At 1000px introductory actions stack and gaps contract. At 650px diagrams turn vertical and content grids and captions stack. Games use a 700px stacking breakpoint.

The optional arcade sits behind a disclosure after contact. Generous section padding and restrained dividers keep the main reading sequence clear.

## Elevation & Depth

There are no box shadows. Depth comes from tonal surfaces, one-pixel borders, spacing and scale. Connector lines express workflow relationships. Hover changes color, border color or primary-button brightness. Smooth anchor scrolling becomes immediate with reduced motion.

**The Flat Surface Rule.** Use tonal contrast and borders to distinguish surfaces without adding shadows.

## Shapes

Project canvases use the canvas radius. Buttons, workflow nodes, game boards and matching tiles share the control radius. Selectors and direction controls use smaller radii. SVG icons use thin rounded strokes; connectors use straight lines.

## Components

### Buttons
Filled primary actions use button and button-text tokens, 14px text at weight 600, an 18px icon gap and a 48px minimum height. Mobile uses 13px text and 16px horizontal padding. Hover raises brightness to 1.08. Secondary actions have transparent backgrounds and line-token borders. Theme controls have 44px minimum height and an accent border on hover; their text hides on mobile.

Links, buttons and summaries receive a two-pixel focus outline with five-pixel offset. Disabled game buttons use reduced opacity and the default cursor.

### Navigation
Quiet links use muted text, a 35px desktop gap and accent hover color. Mobile uses a 15px gap and 12px labels. Other text links add a subtle underline and inline SVG icon.

### Project exhibits
Large canvases combine headings, contextual captions and connected nodes. Real estate pressed-state buttons underline the active view and update nodes and explanatory copy. Commerce presents a route above a layer legend. Small canvases keep the connected-node motif, with native project-detail disclosures below their summaries.

### Disclosures
Native summaries use a 44px minimum height, text and a chevron. The chevron rotates when open; hover uses accent. Education, project details and the optional arcade share this pattern.

### Games
Selected selectors use accent background, text and border. Snake uses theme surfaces for cells, accent for its body and text for its head. Match tiles use the control radius and theme colors for selected and matched states. Scores use the score role and tabular numerals; direction controls are 44px squares.

## Do's and Don'ts

### Do:
- Do preserve theme relationships and visible keyboard focus.
- Do use connected nodes to make actual workflows readable.
- Do keep numeric game scores in DM Sans with tabular numerals.
- Do adapt diagrams and columns to a single mobile reading order.

### Don't:
- Don't add shadows to these flat surfaces.
- Don't introduce another display family into this system.
- Don't substitute invented metrics or decorative code for verified project content.


## Motion

The introduction composes with a 650ms text clip. The real estate connector draws in reading order once on entry, followed by four steps staggered by 75ms; changing the selected workflow restarts the sequence without moving control focus. Mobile follows the vertical connector. Sequences finish within 650ms and never loop. Links and controls use 180–250ms transform feedback; disclosures fade in over 200ms. Reduced motion renders every section immediately and retains brief color feedback. No motion dependency or scroll listener is used.


### Scroll navigation and motion control

The sticky header remains reachable, contracts by 3% while reading, and tracks Work/About/Contact with a sliding violet indicator. A thin reading-progress line follows document position. Workflow diagrams move at a bounded 18px depth offset while in view. The Motion toggle persists an explicit on/off choice; first visits honor the operating system's reduced-motion preference. Off retains sticky navigation and section feedback without spatial animation. Scroll updates are passive and scheduled once per animation frame; cleanup cancels pending frames.
