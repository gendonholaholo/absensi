# Jogiia Absensi - SolidJS Application

Ultra-fast attendance system with live geolocation tracking and camera capture.

## Tech Stack

- **Framework**: SolidJS 1.9.9
- **Build Tool**: Vite 7.1.7
- **Language**: TypeScript 5.9.3
- **Styling**: CSS3 with Fluent Design

## Features

- Live camera capture with watermarking
- Real-time GPS tracking and reverse geocoding
- Mobile-first responsive design
- 48px minimum touch targets for accessibility
- Fluid typography and spacing
- Copy image to clipboard functionality

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Preview production build
npm run preview
```

## Building

```bash
# Build for production
npm run build
```

Production build generates highly optimized files:

- **index.html**: 0.47 kB (gzip: 0.30 kB)
- **CSS bundle**: 9.03 kB (gzip: 2.44 kB)
- **JS bundle**: 16.06 kB (gzip: 6.76 kB)

Total: ~9.5 kB gzipped

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

Requires HTTPS for camera and geolocation APIs.

## Deployment

### Vercel (Recommended)

1. Set Root Directory to `jogiia-absensi-solid`
2. Framework preset: Vite (auto-detected)
3. Build command: `npm run build`
4. Output directory: `dist`

The included `vercel.json` handles SPA routing.

### Docker

See root directory for Docker deployment with nginx.

## License

Private project - All rights reserved
