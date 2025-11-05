# Jogiia Absensi - Docker Image
# Ultra-fast SolidJS application served with Nginx

FROM nginx:alpine

# Metadata
LABEL maintainer="fafaghaws@live.com"
LABEL description="Jogiia Absensi - Live Geolocation & Camera Attendance System (SolidJS)"
LABEL version="2.0.0"
LABEL tech="SolidJS + Vite"

# Copy SolidJS build output
COPY jogiia-absensi-solid/dist/ /usr/share/nginx/html/

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
