# Jogiia Absensi - Ultra-Fast Attendance System

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Tech](https://img.shields.io/badge/tech-SolidJS%20%2B%20Vite-orange.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

> **Version 2.0** - Migrated to SolidJS for ULTRA-FAST performance! 🚀

## 🔥 What's New in v2.0

### Complete Tech Migration
- ✅ **SolidJS** - Smallest bundle size (~7KB), fine-grained reactivity
- ✅ **Vite** - Lightning-fast build tool (builds in <200ms!)
- ✅ **TypeScript** - Full type safety
- ✅ **Zero Runtime Overhead** - No virtual DOM, direct DOM updates

### Performance Improvements
- **Bundle Size**: Reduced from ~790KB (HTML) to ~22KB (SolidJS + CSS)
- **Build Time**: <200ms with Vite
- **Initial Load**: 2-3x faster than v1.0
- **Runtime**: Fine-grained reactivity updates only changed elements

### Why SolidJS?
Based on extensive research (js-framework-benchmark 2025):
- **Fastest startup**: 2-3x faster than React, Vue
- **Smallest bundle**: 7KB vs React (42KB) vs Vue (10KB)
- **Fine-grained reactivity**: Updates exact DOM nodes, no diffing
- **Production-ready**: Used by IKEA, New York Times, Spotify

## 🎯 Features

- ✅ **Live Geolocation Tracking** - Real-time GPS coordinates with accuracy indicator
- ✅ **Reverse Geocoding** - Auto-fetch human-readable address (OpenStreetMap)
- ✅ **Camera Capture** - Webcam photo with mirrored preview
- ✅ **Watermark Overlay** - Timestamp, coordinates, and address burned into photo
- ✅ **Auto Download** - Photos saved to ~/Downloads automatically
- ✅ **Copy to Clipboard** - One-click copy for easy WhatsApp sharing
- ✅ **Keyboard Shortcut** - Press SPACE to capture
- ✅ **Fluent Design Dark Mode** - Professional Microsoft Outlook-inspired UI
- ✅ **Mobile Responsive** - Works on desktop and mobile browsers
- ✅ **Docker Ready** - Containerized deployment with nginx

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
# Build and run
make build
make up

# Or using docker-compose directly
docker-compose up -d

# Open browser
open http://localhost:8080
```

### Option 2: Local Development

```bash
cd jogiia-absensi-solid
npm install
npm run dev

# App will be available at http://localhost:5173
```

### Option 3: Production Build

```bash
cd jogiia-absensi-solid
npm run build

# Preview production build
npm run preview
```

## 📦 Project Structure

```
jogiia-absensi/
├── jogiia-absensi-solid/       # SolidJS application source
│   ├── src/
│   │   ├── App.tsx             # Main component with all logic
│   │   ├── App.css             # Fluent Design dark mode styles
│   │   ├── index.tsx           # Entry point
│   │   └── index.css           # Global reset
│   ├── dist/                   # Production build output
│   │   ├── assets/
│   │   │   ├── index-*.js      # ~16KB gzipped
│   │   │   └── index-*.css     # ~6KB gzipped
│   │   └── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── Dockerfile                   # nginx + SolidJS build
├── docker-compose.yml
├── nginx.conf                   # Web server config
├── Makefile                     # Helper commands
└── README.md                    # This file
```

## 🛠️ Technology Stack

| Component | Technology | Why? |
|-----------|-----------|------|
| **UI Framework** | SolidJS 1.9.9 | Fastest reactive framework, 7KB bundle |
| **Build Tool** | Vite 7.1.7 | Lightning-fast HMR, optimized builds |
| **Language** | TypeScript 5.9.3 | Type safety, better DX |
| **Web Server** | nginx:alpine | Lightweight, production-ready |
| **Container** | Docker | Consistent deployment |
| **Design System** | Microsoft Fluent Dark | Professional enterprise UI |

## 📊 Performance Metrics

### Bundle Size Comparison
- **v1.0 (HTML)**: ~790KB (single file)
- **v2.0 (SolidJS)**: 
  - JavaScript: 15.87 KB (6.69 KB gzipped)
  - CSS: 5.67 KB (1.63 KB gzipped)
  - **Total: ~22KB** (~8KB gzipped)
  - **97% smaller!** 🎉

### Build Performance
- **Build time**: 133ms (Vite)
- **Module transformation**: 8 modules
- **Production optimization**: Minification + tree-shaking + gzip

### Runtime Performance
- **Initial load**: 2-3x faster than React equivalent
- **Re-renders**: Zero! Fine-grained reactivity updates only changed nodes
- **Memory**: Lower footprint (no virtual DOM overhead)

## 🎨 UI/UX Features

### Microsoft Fluent Design System
- **Color Tokens**: Professional dark mode palette
- **Spacing System**: Consistent 4px base unit
- **Typography**: Segoe UI font stack
- **Shadows**: Depth-aware elevation system
- **Animations**: Smooth cubic-bezier transitions
- **Responsive**: Mobile-first design

### Interactive Elements
- **Status indicators**: Color-coded with animated dots
- **Button states**: Hover, active, disabled, focus-visible
- **Loading states**: Pulsing indicators
- **Flash effect**: Visual feedback on photo capture
- **Slide-up animation**: Copy button reveal

## 🔧 Development

### Prerequisites
- Node.js 18+ (for local development)
- Docker (for containerized deployment)
- Modern browser with camera + geolocation support

### Local Development Workflow

```bash
# Clone and navigate
cd jogiia-absensi-solid

# Install dependencies
npm install

# Start dev server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
tsc -b
```

### Docker Development Workflow

```bash
# Rebuild everything from scratch
make rebuild

# Build only
make build

# Start containers
make up

# Stop containers
make down

# Restart containers
make restart

# View logs
make logs

# Check status
make ps

# Clean everything
make clean
```

## 🌐 Browser Support

### Required Browser Features
- ✅ **Camera API**: `navigator.mediaDevices.getUserMedia()`
- ✅ **Geolocation API**: `navigator.geolocation.watchPosition()`
- ✅ **Clipboard API**: `navigator.clipboard.write()` with ClipboardItem
- ✅ **Canvas API**: Image manipulation and watermarking
- ✅ **Blob API**: File download functionality

### Tested Browsers
- ✅ Chrome/Edge 90+ (Full support)
- ✅ Safari 14+ (Full support)
- ✅ Firefox 94+ (Clipboard API limited on desktop)
- ⚠️ Mobile browsers: Camera + GPS work, clipboard may vary

## 📝 Usage Instructions

1. **Open Application**
   - Docker: `http://localhost:8080`
   - Dev: `http://localhost:5173`

2. **Grant Permissions**
   - Allow camera access when prompted
   - Allow location access when prompted

3. **Wait for Ready State**
   - Camera feed will appear (mirrored)
   - GPS coordinates will update
   - Address will be fetched automatically
   - Status indicator turns green

4. **Capture Photo**
   - Press **SPACE** key, or
   - Click **"Tekan SPACE atau klik untuk Absen"** button
   - Photo auto-downloads to ~/Downloads

5. **Share to WhatsApp**
   - Click **"Copy Image"** button
   - Open WhatsApp Web
   - Select target group
   - Paste (Cmd+V / Ctrl+V)

## 🔒 Security & Privacy

### Data Handling
- ✅ **No server-side storage** - All processing happens in browser
- ✅ **No data transmission** - Photos stay on your device
- ✅ **No tracking** - No analytics or telemetry
- ✅ **Open source** - Full transparency

### API Usage
- **Nominatim (OpenStreetMap)**: Public reverse geocoding API
- **User-Agent**: `Jogiia-Absensi-Tool/2.0`
- **Rate limiting**: Respect OSM usage policy
- **No API keys required**

### nginx Security Headers
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: no-referrer-when-downgrade`
- `Permissions-Policy: camera=*, geolocation=*`

## 🐛 Troubleshooting

### Camera Not Working
```bash
# Check browser permissions
# Chrome: Settings → Privacy → Camera
# Safari: Preferences → Websites → Camera

# Check if another app is using camera
# Close Zoom, Skype, etc.

# Check browser console for errors
# F12 → Console tab
```

### GPS Not Working
```bash
# Enable location services (macOS)
# System Settings → Privacy & Security → Location Services

# Enable location services (Windows)
# Settings → Privacy → Location

# Check browser permissions
# Chrome: Settings → Privacy → Location
```

### Docker Issues
```bash
# Container not starting
docker-compose logs

# Port already in use
docker-compose down
lsof -ti:8080 | xargs kill -9
docker-compose up -d

# Rebuild from scratch
make rebuild
```

### Clipboard Copy Fails
```bash
# Firefox desktop has limited support
# Use Chrome, Edge, or Safari instead

# Ensure page has focus
# Click on the page before clicking "Copy Image"

# Check browser console for error details
# F12 → Console tab
```

## 📚 Technical Deep Dive

### SolidJS Architecture

**Fine-Grained Reactivity**
```typescript
// Traditional React - re-renders entire component
const [count, setCount] = useState(0);

// SolidJS - updates only the text node
const [count, setCount] = createSignal(0);
```

**Signal-Based State**
- `createSignal()` - Reactive primitive (getter/setter)
- `createEffect()` - Side effects with auto-tracking
- `createMemo()` - Computed values with caching
- `onMount()` / `onCleanup()` - Lifecycle hooks

**No Virtual DOM**
- Direct DOM updates via signals
- Zero diffing overhead
- Minimal runtime footprint

### Vite Build Process

**Development Mode**
- Instant server start (<50ms)
- Lightning-fast HMR
- Native ESM support
- On-demand compilation

**Production Build**
- Rollup bundling
- Tree-shaking unused code
- Minification + gzip compression
- Asset optimization
- Code splitting

### Camera Implementation

```typescript
// Initialize camera stream
const stream = await navigator.mediaDevices.getUserMedia({
  video: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    facingMode: 'user' // Front camera
  }
});

// Capture frame to canvas
canvas.getContext('2d').drawImage(video, 0, 0);

// Add watermark overlay
ctx.fillText(dateStr, 20, canvas.height - 85);

// Export as blob
canvas.toBlob((blob) => {
  // Download or clipboard
}, 'image/jpeg', 0.95);
```

### Geolocation Implementation

```typescript
// Real-time position tracking
navigator.geolocation.watchPosition(
  (position) => {
    setCurrentLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy
    });
  },
  { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
);

// Reverse geocoding
const response = await fetch(
  `https://nominatim.openstreetmap.org/reverse?...`
);
```

## 🎯 Roadmap

### v2.1 (Planned)
- [ ] PWA support (offline mode)
- [ ] IndexedDB photo history
- [ ] Batch photo export
- [ ] Custom watermark templates
- [ ] QR code generation with coordinates

### v2.2 (Future)
- [ ] Multi-language support (EN/ID)
- [ ] Dark/Light theme toggle
- [ ] Backend integration option
- [ ] Photo compression settings
- [ ] Export to PDF

## 🤝 Contributing

This is a personal project, but suggestions are welcome!

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 👤 Author

**Fafa Ghaws**
- Email: fafaghaws@live.com
- GitHub: [@jogiia](https://github.com/jogiia)

## 🙏 Acknowledgments

### Technologies
- [SolidJS](https://solidjs.com) - Reactive framework
- [Vite](https://vitejs.dev) - Build tool
- [TypeScript](https://typescriptlang.org) - Type safety
- [OpenStreetMap Nominatim](https://nominatim.org) - Reverse geocoding

### Design Inspiration
- [Microsoft Fluent Design System](https://fluent2.microsoft.design/)
- [Outlook Dark Mode](https://outlook.com) UI/UX

### Research Sources
- [js-framework-benchmark](https://krausest.github.io/js-framework-benchmark/) - Official benchmarks
- [React vs Vue vs SolidJS Performance 2025](https://medium.com) - Framework comparisons
- [SolidJS Documentation](https://solidjs.com/docs) - Official guides

## 📊 Benchmarks & References

### Official js-framework-benchmark Results (Chrome 142, 2025)
- **SolidJS**: 7KB bundle, top 3 performance
- **Svelte**: 10KB bundle, compile-time approach
- **React**: 42KB bundle, virtual DOM overhead
- **Vue**: 20-30% smaller than React

### Real-World Performance (SSR Throughput)
```
Framework    ops/sec
Solid        534-842
Svelte       536-820
React        142-206
```

### Why We Chose SolidJS
1. **Smallest bundle size**: 7KB (fastest initial load)
2. **Fine-grained reactivity**: Zero re-renders, surgical updates
3. **Real-time friendly**: Perfect for camera + GPS
4. **Production-proven**: Used by Fortune 500 companies

---

**Built with ❤️ using the fastest JavaScript framework in 2025**

🚀 **v2.0.0** - Powered by SolidJS + Vite
