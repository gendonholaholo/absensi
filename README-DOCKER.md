# 🐳 Docker Setup - Jogiia Absensi

## 📋 Deskripsi

Aplikasi Jogiia Absensi dapat dijalankan menggunakan Docker dengan Nginx sebagai web server. Setup ini memudahkan deployment dan memastikan konsistensi environment di semua platform.

---

## 🚀 Quick Start

### Menggunakan Docker Compose (Recommended)

```bash
# 1. Build dan jalankan container
docker-compose up -d

# 2. Akses aplikasi
# Buka browser: http://localhost:8080
```

### Menggunakan Docker Langsung

```bash
# 1. Build image
docker build -t jogiia-absensi:latest .

# 2. Jalankan container
docker run -d -p 8080:80 --name jogiia-absensi jogiia-absensi:latest

# 3. Akses aplikasi
# Buka browser: http://localhost:8080
```

---

## 📦 Prerequisites

Pastikan sudah terinstall:
- **Docker** (version 20.10+)
- **Docker Compose** (version 1.29+)

### Install Docker

**macOS:**
```bash
brew install --cask docker
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

**Windows:**
Download dari [Docker Desktop](https://www.docker.com/products/docker-desktop)

---

## 🛠️ Docker Commands

### Build & Run

```bash
# Build image
docker-compose build

# Jalankan container (detached mode)
docker-compose up -d

# Jalankan container (interactive mode - lihat logs)
docker-compose up

# Stop container
docker-compose down

# Restart container
docker-compose restart
```

### Monitoring

```bash
# Lihat running containers
docker-compose ps

# Lihat logs
docker-compose logs

# Follow logs (real-time)
docker-compose logs -f

# Lihat logs terakhir 100 baris
docker-compose logs --tail=100
```

### Maintenance

```bash
# Stop dan hapus container
docker-compose down

# Stop, hapus container + hapus images
docker-compose down --rmi all

# Stop, hapus container + volumes
docker-compose down -v

# Rebuild image (force)
docker-compose build --no-cache

# Restart tanpa rebuild
docker-compose restart
```

---

## 🔧 Configuration

### Port Configuration

Default port: `8080`

Untuk mengganti port, edit `docker-compose.yml`:

```yaml
ports:
  - "3000:80"  # Ganti 3000 dengan port yang diinginkan
```

### Custom Nginx Configuration

Edit file `nginx.conf` untuk custom configuration:
- Security headers
- Cache policy
- Compression settings
- CORS settings

Setelah edit, rebuild container:
```bash
docker-compose up -d --build
```

---

## 🌐 Network & Access

### Local Access

```bash
# macOS/Linux
open http://localhost:8080

# Windows
start http://localhost:8080
```

### Network Access (LAN)

Aplikasi bisa diakses dari device lain di network yang sama:

```bash
# Cek IP address
# macOS/Linux:
ifconfig | grep "inet "

# Akses dari device lain:
http://192.168.x.x:8080
```

**PENTING untuk Camera & GPS:**
- Browser **harus** akses via HTTPS atau localhost
- Untuk LAN access, pertimbangkan setup SSL/TLS certificate

---

## 🔒 Security Notes

### HTTPS Setup

Untuk production, gunakan HTTPS:

1. Tambahkan SSL certificate
2. Update `nginx.conf` untuk HTTPS
3. Redirect HTTP ke HTTPS

**Menggunakan Let's Encrypt:**
```bash
# Install certbot
brew install certbot

# Generate certificate
sudo certbot certonly --standalone -d yourdomain.com
```

### Security Headers

Sudah ter-include di `nginx.conf`:
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy (Camera & Geolocation)

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Error: Bind for 0.0.0.0:8080 failed: port is already allocated

# Solusi 1: Ganti port di docker-compose.yml
ports:
  - "8081:80"  # Ganti ke port lain

# Solusi 2: Stop service yang pakai port 8080
lsof -ti:8080 | xargs kill -9
```

### Container Won't Start

```bash
# Cek logs untuk error
docker-compose logs

# Rebuild from scratch
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Camera/GPS Not Working

**Penyebab umum:**
1. Browser tidak support (gunakan Chrome/Safari/Firefox)
2. Akses via IP (bukan localhost) tanpa HTTPS
3. Permission ditolak oleh user

**Solusi:**
- Akses via `http://localhost:8080` (untuk development)
- Setup HTTPS untuk production/LAN access
- Pastikan browser izinkan akses camera & location

### Nginx Configuration Error

```bash
# Test nginx config
docker-compose exec absensi-app nginx -t

# Reload nginx (tanpa restart container)
docker-compose exec absensi-app nginx -s reload
```

---

## 📊 Docker Image Info

```bash
# Lihat image size
docker images jogiia-absensi

# Inspect image
docker inspect jogiia-absensi:latest

# Image history
docker history jogiia-absensi:latest
```

**Base Image:** `nginx:alpine`
- Size: ~24 MB (very lightweight!)
- OS: Alpine Linux
- Web Server: Nginx 1.25+

---

## 🚢 Production Deployment

### Docker Swarm

```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml absensi

# Check services
docker service ls
```

### Kubernetes

```bash
# Generate Kubernetes manifests
kompose convert -f docker-compose.yml

# Apply to cluster
kubectl apply -f .
```

### Cloud Platforms

**AWS ECS:**
```bash
# Push to ECR
aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.ap-southeast-1.amazonaws.com
docker tag jogiia-absensi:latest <account-id>.dkr.ecr.ap-southeast-1.amazonaws.com/jogiia-absensi:latest
docker push <account-id>.dkr.ecr.ap-southeast-1.amazonaws.com/jogiia-absensi:latest
```

**Google Cloud Run:**
```bash
# Build and deploy
gcloud builds submit --tag gcr.io/PROJECT-ID/jogiia-absensi
gcloud run deploy --image gcr.io/PROJECT-ID/jogiia-absensi --platform managed
```

---

## 📝 Environment Variables

Untuk menambahkan environment variables, edit `docker-compose.yml`:

```yaml
services:
  absensi-app:
    environment:
      - NODE_ENV=production
      - TZ=Asia/Jakarta
```

---

## 💾 Backup & Restore

### Backup Image

```bash
# Save image to tar
docker save jogiia-absensi:latest | gzip > jogiia-absensi-backup.tar.gz

# Load image from tar
docker load < jogiia-absensi-backup.tar.gz
```

---

## 🔄 Updates & Maintenance

### Update Application

```bash
# 1. Update absensi-tool.html
# 2. Rebuild image
docker-compose build

# 3. Restart dengan image baru
docker-compose up -d

# 4. Verify
docker-compose ps
```

### Clean Up Old Images

```bash
# Remove unused images
docker image prune -a

# Remove unused containers, networks, images
docker system prune -a
```

---

## 📈 Performance Tuning

### Nginx Workers

Edit `nginx.conf`:
```nginx
worker_processes auto;
worker_connections 1024;
```

### Container Resources

Edit `docker-compose.yml`:
```yaml
deploy:
  resources:
    limits:
      cpus: '0.5'
      memory: 256M
```

---

## 🎯 Health Check

```bash
# Manual health check
curl http://localhost:8080

# Docker health status
docker inspect --format='{{.State.Health.Status}}' jogiia-absensi
```

---

## 📞 Support

Jika ada masalah:
1. Cek logs: `docker-compose logs`
2. Verify config: `docker-compose config`
3. Check GitHub issues

---

## 📄 License

MIT License - Free to use and modify

---

**Built with ❤️ for Jogiia Absensi System**
