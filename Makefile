# Makefile for Jogiia Absensi Docker Management

.PHONY: help build up down restart logs ps clean rebuild test open

# Default target
help:
	@echo "Jogiia Absensi - Docker Management"
	@echo ""
	@echo "Available commands:"
	@echo "  make build      - Build Docker image"
	@echo "  make up         - Start containers (detached)"
	@echo "  make down       - Stop and remove containers"
	@echo "  make restart    - Restart containers"
	@echo "  make logs       - View container logs"
	@echo "  make ps         - List running containers"
	@echo "  make clean      - Remove containers and images"
	@echo "  make rebuild    - Rebuild from scratch"
	@echo "  make test       - Test if app is running"
	@echo "  make open       - Open app in browser"
	@echo ""

# Build Docker image
build:
	docker-compose build

# Start containers
up:
	docker-compose up -d
	@echo "✅ Application started on http://localhost:8080"

# Stop containers
down:
	docker-compose down

# Restart containers
restart:
	docker-compose restart
	@echo "✅ Application restarted"

# View logs
logs:
	docker-compose logs -f

# List containers
ps:
	docker-compose ps

# Clean up
clean:
	docker-compose down --rmi all -v
	@echo "✅ Cleanup complete"

# Rebuild from scratch
rebuild: clean build up
	@echo "✅ Rebuild complete"

# Test if app is running
test:
	@curl -s http://localhost:8080 > /dev/null && echo "✅ App is running" || echo "❌ App is not running"

# Open in browser
open:
	@command -v open > /dev/null && open http://localhost:8080 || echo "Open http://localhost:8080 manually"
