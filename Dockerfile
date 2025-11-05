# Jogiia Absensi - Docker Image
# Menggunakan Nginx untuk serve static HTML application

FROM nginx:alpine

# Metadata
LABEL maintainer="fafaghaws@live.com"
LABEL description="Jogiia Absensi - Live Geolocation & Camera Attendance System"
LABEL version="1.0.0"

# Copy application file
COPY absensi-tool.html /usr/share/nginx/html/index.html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
