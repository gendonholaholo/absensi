import { createSignal, createEffect, onMount, onCleanup } from 'solid-js';
import './App.css';

interface Location {
  latitude: number;
  longitude: number;
  accuracy: number;
}

interface CapturedData {
  timestamp: string;
  latitude: string;
  longitude: string;
  address: string;
  filename: string;
}

function App() {
  // Signals for state management
  const [videoStream, setVideoStream] = createSignal<MediaStream | null>(null);
  const [currentLocation, setCurrentLocation] = createSignal<Location | null>(null);
  const [currentAddress, setCurrentAddress] = createSignal<string>('Belum tersedia');
  const [lastCapturedBlob, setLastCapturedBlob] = createSignal<Blob | null>(null);
  const [lastCapturedData, setLastCapturedData] = createSignal<CapturedData | null>(null);
  const [statusMessage, setStatusMessage] = createSignal<string>('Memulai aplikasi...');
  const [statusClass, setStatusClass] = createSignal<string>('status');
  const [captureEnabled, setCaptureEnabled] = createSignal<boolean>(false);
  const [showCopyButton, setShowCopyButton] = createSignal<boolean>(false);
  const [currentTime, setCurrentTime] = createSignal<string>('-');
  const [locationStatus, setLocationStatus] = createSignal<string>('Menginisialisasi...');
  const [showLocationDot, setShowLocationDot] = createSignal<boolean>(false);
  const [isMobile, setIsMobile] = createSignal<boolean>(false);

  let videoRef: HTMLVideoElement | undefined;
  let canvasRef: HTMLCanvasElement | undefined;
  let locationWatchId: number | undefined;

  // Detect mobile device
  createEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    onCleanup(() => window.removeEventListener('resize', checkMobile));
  });

  // Update timestamp every second
  createEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formatted = now.toLocaleString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(formatted);
    }, 1000);

    onCleanup(() => clearInterval(interval));
  });

  // Initialize camera
  const initCamera = async () => {
    try {
      setStatusMessage('Mengakses kamera...');
      setStatusClass('status');

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: false
      });

      if (videoRef) {
        videoRef.srcObject = stream;
      }
      setVideoStream(stream);

      setStatusMessage('Kamera aktif. Menunggu GPS...');
      setStatusClass('status success');

      return true;
    } catch (error) {
      console.error('Error accessing camera:', error);
      setStatusMessage(`Gagal mengakses kamera: ${error}`);
      setStatusClass('status error');
      return false;
    }
  };

  // Fetch address using reverse geocoding
  const fetchAddress = async (lat: number, lon: number) => {
    try {
      setCurrentAddress('🔍 Mencari alamat...');

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'Jogiia-Absensi-Tool/1.0'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Gagal mendapatkan alamat');
      }

      const data = await response.json();

      if (data.display_name) {
        setCurrentAddress(data.display_name);
      } else {
        setCurrentAddress('Alamat tidak ditemukan');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setCurrentAddress('Gagal mendapatkan alamat');
    }
  };

  // Location success callback
  const onLocationSuccess = async (position: GeolocationPosition) => {
    const location: Location = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy
    };

    setCurrentLocation(location);
    setLocationStatus('Lokasi aktif');
    setShowLocationDot(true);

    // Enable capture button
    if (videoStream()) {
      setCaptureEnabled(true);
      setStatusMessage('Siap untuk absen. Tekan SPACE atau klik tombol');
      setStatusClass('status success');
    }

    // Fetch address
    await fetchAddress(location.latitude, location.longitude);
  };

  // Location error callback
  const onLocationError = (error: GeolocationPositionError) => {
    let errorMsg = '';
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMsg = 'Izin lokasi ditolak';
        break;
      case error.POSITION_UNAVAILABLE:
        errorMsg = 'Lokasi tidak tersedia';
        break;
      case error.TIMEOUT:
        errorMsg = 'Timeout mencari lokasi';
        break;
      default:
        errorMsg = 'Error tidak diketahui';
    }

    setLocationStatus(errorMsg);
    setShowLocationDot(false);
    console.error('Geolocation error:', error);
  };

  // Initialize geolocation
  const initGeolocation = () => {
    if (!navigator.geolocation) {
      setStatusMessage('Browser tidak mendukung geolocation');
      setStatusClass('status error');
      return;
    }

    setLocationStatus('Mencari lokasi...');

    // Watch position for real-time updates
    locationWatchId = navigator.geolocation.watchPosition(
      onLocationSuccess,
      onLocationError,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // Truncate text to fit width
  const truncateText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string => {
    const metrics = ctx.measureText(text);
    if (metrics.width <= maxWidth) {
      return text;
    }

    let truncated = text;
    while (ctx.measureText(truncated + '...').width > maxWidth && truncated.length > 0) {
      truncated = truncated.substring(0, truncated.length - 1);
    }
    return truncated + '...';
  };

  // Capture photo
  const capturePhoto = () => {
    const location = currentLocation();
    if (!location) {
      alert('Lokasi belum tersedia! Tunggu GPS aktif.');
      return;
    }

    if (!canvasRef || !videoRef) {
      alert('Video belum siap!');
      return;
    }

    // Set canvas size to match video
    canvasRef.width = videoRef.videoWidth;
    canvasRef.height = videoRef.videoHeight;

    // Draw video frame to canvas (mirror it back to normal)
    const ctx = canvasRef.getContext('2d');
    if (!ctx) return;

    ctx.translate(canvasRef.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(videoRef, 0, 0, canvasRef.width, canvasRef.height);

    // Add overlay text with location info
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, canvasRef.height - 120, canvasRef.width, 120);

    ctx.fillStyle = 'white';
    ctx.font = 'bold 18px Arial';

    const now = new Date();
    const dateStr = now.toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    ctx.fillText(dateStr, 20, canvasRef.height - 85);
    ctx.fillText(`${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`, 20, canvasRef.height - 55);

    ctx.font = '14px Arial';
    const maxAddressWidth = canvasRef.width - 40;
    const addressText = truncateText(ctx, currentAddress(), maxAddressWidth);
    ctx.fillText(addressText, 20, canvasRef.height - 25);

    // Convert canvas to blob and download
    canvasRef.toBlob((blob) => {
      if (!blob) return;

      // Save blob and data for sharing
      const capturedData: CapturedData = {
        timestamp: dateStr,
        latitude: location.latitude.toFixed(6),
        longitude: location.longitude.toFixed(6),
        address: currentAddress(),
        filename: `absensi_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}.jpg`
      };

      setLastCapturedBlob(blob);
      setLastCapturedData(capturedData);

      // Download file
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = capturedData.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Show success message
      setStatusMessage(`Foto tersimpan di Downloads. Klik "Copy Image" untuk share ke WhatsApp.`);
      setStatusClass('status success');

      // Show copy button
      setShowCopyButton(true);

      // Flash effect
      if (videoRef) {
        videoRef.style.opacity = '0.3';
        setTimeout(() => {
          if (videoRef) videoRef.style.opacity = '1';
        }, 200);
      }
    }, 'image/jpeg', 0.95);
  };

  // Copy image to clipboard
  const copyImageToClipboard = async () => {
    const blob = lastCapturedBlob();
    const data = lastCapturedData();

    if (!blob || !data) {
      alert('Belum ada foto yang di-capture. Silakan ambil foto absensi terlebih dahulu.');
      return;
    }

    // Check if Clipboard API is supported
    if (!navigator.clipboard || !navigator.clipboard.write) {
      setStatusMessage('Browser tidak mendukung copy image. Gunakan Chrome/Safari/Edge terbaru.');
      setStatusClass('status error');
      return;
    }

    try {
      // Create ClipboardItem with PNG blob
      const clipboardItem = new ClipboardItem({
        'image/png': blob
      });

      // Write to clipboard
      await navigator.clipboard.write([clipboardItem]);

      // Show success message with clear instructions
      setStatusMessage('✓ Image copied! Buka WhatsApp Web → Pilih group → Paste (Cmd+V / Ctrl+V)');
      setStatusClass('status success');

      // Optional: Also copy text to clipboard for convenience
      const textInfo = `📸 ABSENSI\n\n📅 ${data.timestamp}\n📍 ${data.latitude}, ${data.longitude}\n🏠 ${data.address}`;
      console.log('Info absensi:', textInfo);
    } catch (error: any) {
      console.error('Error copying to clipboard:', error);

      // Provide helpful error messages
      if (error.name === 'NotAllowedError') {
        setStatusMessage('Permission ditolak. Pastikan fokus di window ini dan coba lagi.');
      } else if (error.name === 'NotSupportedError') {
        setStatusMessage('Browser tidak support copy image. Gunakan Chrome/Safari/Edge.');
      } else {
        setStatusMessage(`Gagal copy: ${error.message}. Foto sudah tersimpan di Downloads.`);
      }
      setStatusClass('status error');
    }
  };

  // Keyboard handler for space bar
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Space' && captureEnabled()) {
      e.preventDefault();
      capturePhoto();
    }
  };

  // Initialize on mount
  onMount(async () => {
    const cameraOk = await initCamera();
    if (cameraOk) {
      initGeolocation();
    }

    // Add keyboard listener
    document.addEventListener('keydown', handleKeyDown);
  });

  // Cleanup on unmount
  onCleanup(() => {
    const stream = videoStream();
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    if (locationWatchId !== undefined) {
      navigator.geolocation.clearWatch(locationWatchId);
    }
    document.removeEventListener('keydown', handleKeyDown);
  });

  // Coordinate display
  const coordinateDisplay = () => {
    const location = currentLocation();
    if (!location) return 'Menunggu GPS...';
    return `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)} (±${Math.round(location.accuracy)}m)`;
  };

  return (
    <div class="container">
      <h1>Tools Absensi</h1>
      <p class="subtitle">Live Geolocation & Camera Capture</p>

      <div class={statusClass()}>
        {statusMessage()}
      </div>

      <div class="video-container">
        <video
          ref={videoRef}
          autoplay
          playsinline
          style={{ transform: 'scaleX(-1)' }}
        />
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div class="info-box">
        <div class="info-row">
          <span class="info-label">Koordinat</span>
          <span class="info-value">{coordinateDisplay()}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Alamat</span>
          <span class="info-value">{currentAddress()}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Waktu</span>
          <span class="info-value">{currentTime()}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Status Lokasi</span>
          <span class="info-value location-status">
            {showLocationDot() && <span class="dot" />}
            <span>{locationStatus()}</span>
          </span>
        </div>
      </div>

      <button
        class="btn-capture"
        onClick={capturePhoto}
        disabled={!captureEnabled()}
      >
        {isMobile() ? 'Ambil Foto Absensi' : 'Tekan SPACE atau klik untuk Absen'}
      </button>

      <button
        class={`btn-copy-image ${showCopyButton() ? 'show' : ''}`}
        onClick={copyImageToClipboard}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2 2v1"></path>
        </svg>
        Copy Image
      </button>
    </div>
  );
}

export default App;
