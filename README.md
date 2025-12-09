# Quote APK

## Project Overview

A modern, minimal, and interactive web application that fetches random quotes, displays them with dynamic animations, and allows users to capture and share the quote as an image. Designed with a neon cyber/minimal theme and smooth UI interactions.
#Features

## 🎥 Video Preview  

[![Watch the video](https://img.youtube.com/vi/c5Gyg0ftSiA/maxresdefault.jpg)](https://youtu.be/c5Gyg0ftSiA)


# 1. Fetch Random Quotes
Retrieves a new quote from an API with a single click.

Includes loading animation (bouncing dots) while fetching.

# 2. Animated UI & Visual Effects
Animated floating dots background (cyber aesthetic).

Neon glow border trails using CSS animations.

Smooth hover effects on buttons and container.

# 3. Screenshot & Share Feature
Takes a screenshot of the quote box using html2canvas.

Opens it in a popup modal.

Allows sharing through : WhatsApp

Download as image

# 4. Responsive Design
Fully responsive layout using Tailwind CSS.

Adjusts UI for mobile, tablet, and desktop.

# 5. Error Handling
Displays error messages if API fails.

Prevents UI breaking by using fallback states.

# 6. Modern Minimal UI
Centered quote box with neon glow.

Next Quote button + Share button with consistent theme.

Typography styled for a clean, modern feel.


```
src/
 ├── components/
 │     └── QuoteCard.tsx
 ├── hooks/
 │     └── useQuote.ts
 ├── assets/
 ├── App.tsx
 ├── main.tsx
 └── styles/
```




