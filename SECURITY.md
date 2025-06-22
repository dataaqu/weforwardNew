# 🔒 Security & Deployment Guide

## Environment Variables Setup

### 1. Local Development
- Copy `.env.example` to `.env`
- Fill in your actual Firebase configuration values
- The `.env` file is ignored by git for security

### 2. Production Deployment (Netlify/Vercel)

#### For Netlify:
1. Go to Site Settings → Environment Variables
2. Add these variables:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_ALLOWED_DOMAINS=yourdomain.com,*.yourdomain.com
   VITE_ENVIRONMENT=production
   ```

#### For Vercel:
1. Go to Project Settings → Environment Variables
2. Add the same variables as above

## Firebase Security Rules

### 1. Firestore Rules (firestore.rules)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Blog posts - public read, admin write
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid in get(/databases/$(database)/documents/admins/list).data.uids;
    }
    
    // Admin users list
    match /admins/{document} {
      allow read, write: if request.auth != null && request.auth.uid in resource.data.uids;
    }
  }
}
```

### 2. Storage Rules (storage.rules)
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /blog-images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## API Key Restrictions

### 1. Firebase Console Restrictions:
1. Go to Google Cloud Console → APIs & Credentials
2. Find your API key
3. Set HTTP referrers restrictions:
   - `yourdomain.com/*`
   - `*.yourdomain.com/*`
   - `localhost:*` (for development)

### 2. Firebase Project Settings:
1. Go to Project Settings → General
2. Add authorized domains:
   - `yourdomain.com`
   - `*.yourdomain.com`

## Domain Protection Features

The app includes built-in domain validation:
- ✅ Checks allowed domains before Firebase initialization
- ✅ Throws error if accessed from unauthorized domain
- ✅ Only active in production environment
- ✅ Supports wildcard subdomains

## Deployment Checklist

### Before Pushing to GitHub:
- [ ] Verify `.env` is in `.gitignore`
- [ ] Check no sensitive data in code
- [ ] Update `.env.example` with correct structure
- [ ] Test domain validation works

### After Deployment:
- [ ] Set environment variables in hosting platform
- [ ] Configure Firebase API restrictions
- [ ] Deploy Firestore security rules
- [ ] Deploy Storage security rules
- [ ] Test production deployment

## Emergency Response

If credentials are accidentally exposed:
1. **Immediately** regenerate Firebase API keys
2. Update environment variables everywhere
3. Check Firebase security rules are active
4. Review access logs for suspicious activity

## Additional Security Measures

### 1. Content Security Policy
Add to your hosting platform headers:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://apis.google.com; style-src 'self' 'unsafe-inline';
```

### 2. Rate Limiting
Consider implementing rate limiting for:
- Blog post creation
- Image uploads
- Authentication attempts

### 3. Monitoring
Set up Firebase Analytics and monitor:
- Unusual traffic patterns
- Failed authentication attempts
- API usage spikes

## Support

If you need help with security setup:
1. Check Firebase console documentation
2. Review hosting platform documentation
3. Test in staging environment first
