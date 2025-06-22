#!/bin/bash

# Pre-build security check script
echo "🔒 Running security checks..."

# Check if required environment variables are set
required_vars=(
  "VITE_FIREBASE_API_KEY"
  "VITE_FIREBASE_AUTH_DOMAIN"
  "VITE_FIREBASE_PROJECT_ID"
  "VITE_FIREBASE_STORAGE_BUCKET"
  "VITE_FIREBASE_MESSAGING_SENDER_ID"
  "VITE_FIREBASE_APP_ID"
  "VITE_ALLOWED_DOMAINS"
  "VITE_ENVIRONMENT"
)

missing_vars=()

for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    missing_vars+=("$var")
  fi
done

if [ ${#missing_vars[@]} -ne 0 ]; then
  echo "❌ Missing required environment variables:"
  printf '%s\n' "${missing_vars[@]}"
  echo ""
  echo "Please set these variables in your hosting platform's environment variables section."
  echo "See SECURITY.md for detailed instructions."
  exit 1
fi

# Check if .env file exists (should not in production)
if [ -f ".env" ] && [ "$VITE_ENVIRONMENT" = "production" ]; then
  echo "⚠️  Warning: .env file found in production build"
  echo "Make sure sensitive data is not included in the build"
fi

echo "✅ Security checks passed!"
echo "🚀 Proceeding with build..."
