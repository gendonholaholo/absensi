# Jogiia Absensi - Attendance System

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Tech](https://img.shields.io/badge/tech-SolidJS%20%2B%20Vite-orange.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

A modern web-based attendance system with real-time geolocation tracking and camera capture capabilities.

## Version 2.0 - Technology Stack Migration

### Core Technologies

- **SolidJS 1.9.9** - Reactive UI framework with fine-grained reactivity
- **Vite 7.1.7** - Fast build tool and development server
- **TypeScript 5.9.3** - Static type checking
- **nginx** - Production web server (Docker deployment)

### Performance Improvements

- **Bundle Size**: Reduced from ~790KB to ~22KB (~8KB gzipped)
- **Build Time**: ~200ms with Vite
- **Runtime**: Fine-grained reactivity for efficient DOM updates

## Features

- Live geolocation tracking with GPS coordinates and accuracy indicator
- Reverse geocoding for human-readable addresses (OpenStreetMap Nominatim API)
- Camera capture with webcam preview
- Timestamp and location watermark overlay on captured photos
- Automatic photo download
- Copy image to clipboard for easy sharing
- Keyboard shortcut support (SPACE key to capture)
- Dark mode UI based on Microsoft Fluent Design System
- Fully responsive design for mobile and desktop
- Docker-ready containerized deployment

## Quick Start

### Option 1: Docker Deployment (Recommended)

```bash
# Build and start containers
make build
make up

# Or using docker-compose directly
docker-compose up -d

# Access application
open http://localhost:8080
```

### Option 2: Local Development

```bash
cd jogiia-absensi-solid
npm install
npm run dev

# Application available at http://localhost:5173
```

### Option 3: Production Build

```bash
cd jogiia-absensi-solid
npm run build
npm run preview
```

## Project Structure

```
jogiia-absensi/
├── jogiia-absensi-solid/       # SolidJS application
│   ├── src/
│   │   ├── App.tsx             # Main component
│   │   ├── App.css             # Styling
│   │   ├── index.tsx           # Entry point
│   │   └── index.css           # Global styles
│   ├── dist/                   # Build output
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── vercel.json             # Vercel deployment config
├── Dockerfile                   # Docker image definition
├── docker-compose.yml           # Docker Compose configuration
├── nginx.conf                   # nginx server configuration
├── Makefile                     # Build automation
└── README.md
```

## Technology Details

| Component | Technology | Purpose |
|-----------|-----------|---------|
| UI Framework | SolidJS 1.9.9 | Reactive user interface |
| Build Tool | Vite 7.1.7 | Development and production builds |
| Language | TypeScript 5.9.3 | Type-safe development |
| Web Server | nginx:alpine | Production HTTP server |
| Container | Docker | Deployment packaging |
| Design System | Microsoft Fluent | UI/UX guidelines |

## Build Metrics

### Bundle Size

- **v1.0 (HTML)**: ~790KB
- **v2.0 (SolidJS)**:
  - JavaScript: 16.06 KB (6.76 KB gzipped)
  - CSS: 9.03 KB (2.44 KB gzipped)
  - Total: ~25KB (~9.5KB gzipped)
  - 97% reduction from v1.0

### Build Performance

- Build time: ~200ms
- Module transformation: 8 modules
- Optimization: Minification, tree-shaking, compression

## Development

### Prerequisites

- Node.js 18+
- Docker (for containerized deployment)
- Modern browser with camera and geolocation support

### Local Development Commands

```bash
cd jogiia-absensi-solid

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
tsc -b
```

### Docker Commands

```bash
# Rebuild from scratch
make rebuild

# Build image
make build

# Start containers
make up

# Stop containers
make down

# Restart
make restart

# View logs
make logs

# Check status
make ps

# Clean up
make clean
```

## Deployment

### Vercel (Recommended for Production)

1. Import GitHub repository to Vercel
2. Set Root Directory: `jogiia-absensi-solid`
3. Framework preset: Vite (auto-detected)
4. Build command: `npm run build`
5. Output directory: `dist`

The included `vercel.json` handles SPA routing configuration.

### Docker Deployment

See Docker commands above. The application runs on port 8080 by default.

## Browser Support

### Required Browser APIs

- Camera API: `navigator.mediaDevices.getUserMedia()`
- Geolocation API: `navigator.geolocation.watchPosition()`
- Clipboard API: `navigator.clipboard.write()`
- Canvas API: Image manipulation
- Blob API: File operations

### Tested Browsers

- Chrome/Edge 90+
- Safari 14+
- Firefox 94+ (limited clipboard support on desktop)
- Mobile browsers (camera and GPS supported, clipboard may vary)

## Usage

1. **Open Application**
   - Docker: http://localhost:8080
   - Development: http://localhost:5173

2. **Grant Permissions**
   - Allow camera access
   - Allow location access

3. **Wait for Ready State**
   - Camera feed appears
   - GPS coordinates update
   - Address fetched automatically
   - Status indicator shows ready

4. **Capture Photo**
   - Press SPACE key or click capture button
   - Photo downloads automatically

5. **Share via Clipboard**
   - Click "Copy Image" button
   - Paste into target application

## Security & Privacy

### Data Handling

- No server-side storage
- All processing in browser
- No data transmission to external servers (except reverse geocoding API)
- No analytics or tracking

### API Usage

- Nominatim (OpenStreetMap): Public reverse geocoding
- User-Agent: `Jogiia-Absensi-Tool/2.0`
- Respects OpenStreetMap usage policies

### nginx Security Headers

- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: no-referrer-when-downgrade
- Permissions-Policy: camera=*, geolocation=*

## Troubleshooting

### Camera Issues

- Check browser camera permissions
- Close other applications using camera
- Check browser console for errors

### GPS Issues

- Enable system location services
- Check browser location permissions
- Ensure GPS signal available (may not work indoors)

### Docker Issues

```bash
# Check logs
docker-compose logs

# Port conflict
docker-compose down
lsof -ti:8080 | xargs kill -9
docker-compose up -d

# Full rebuild
make rebuild
```

### Clipboard Issues

- Firefox desktop has limited clipboard support
- Use Chrome, Edge, or Safari
- Ensure page has focus before copying

## Architecture

### SolidJS Implementation

- Signal-based reactive state management
- Fine-grained reactivity for efficient updates
- Direct DOM manipulation without virtual DOM
- Minimal runtime overhead

### Key Features

- `createSignal()`: Reactive state primitives
- `createEffect()`: Side effect tracking
- `createMemo()`: Computed values
- `onMount()` / `onCleanup()`: Lifecycle management

## License

MIT License - see LICENSE file for details

## Author

**Fafa Ghaws**
- Email: fafaghaws@live.com
- GitHub: [@jogiia](https://github.com/jogiia)

## Acknowledgments

- [SolidJS](https://solidjs.com) - Reactive framework
- [Vite](https://vitejs.dev) - Build tool
- [TypeScript](https://typescriptlang.org) - Type system
- [OpenStreetMap Nominatim](https://nominatim.org) - Geocoding API
- [Microsoft Fluent Design](https://fluent2.microsoft.design/) - Design system
