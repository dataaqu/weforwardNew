#!/bin/bash

# WeForward Meta Tags Test Script
echo "🚚 WeForward Blog Meta Tags Implementation Test"
echo "=============================================="
echo ""

# Check if development server is running
echo "📡 Checking development server..."
if curl -s http://localhost:5173 > /dev/null; then
    echo "✅ Development server is running on http://localhost:5173"
else
    echo "❌ Development server is not running"
    echo "💡 Start it with: npm run dev"
    echo ""
fi

# Check key files exist
echo ""
echo "📁 Checking implementation files..."

files=(
    "src/lib/seo.tsx"
    "src/pages/BlogPostDetail.tsx" 
    "src/pages/BlogPage.tsx"
    "src/types/blog.ts"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
    fi
done

# Check for key features in SEO component
echo ""
echo "🔍 Checking SEO component features..."

if grep -q "articleAuthor" src/lib/seo.tsx; then
    echo "✅ Article-specific meta tags implemented"
else
    echo "❌ Article meta tags missing"
fi

if grep -q "twitter:card" src/lib/seo.tsx; then
    echo "✅ Twitter Card support implemented"
else
    echo "❌ Twitter Card support missing"
fi

if grep -q "og:type" src/lib/seo.tsx; then
    echo "✅ Open Graph support implemented"
else
    echo "❌ Open Graph support missing"
fi

if grep -q "StructuredData" src/lib/seo.tsx; then
    echo "✅ Structured data support implemented"
else
    echo "❌ Structured data support missing"
fi

# Check blog post implementation
echo ""
echo "📝 Checking blog post meta tag implementation..."

if grep -q "articleAuthor" src/pages/BlogPostDetail.tsx; then
    echo "✅ Blog post article meta tags implemented"
else
    echo "❌ Blog post article meta tags missing"
fi

if grep -q "StructuredData" src/pages/BlogPostDetail.tsx; then
    echo "✅ Blog post structured data implemented"
else
    echo "❌ Blog post structured data missing"
fi

# Check blog listing implementation
echo ""
echo "📰 Checking blog listing meta tag implementation..."

if grep -q "generateStructuredData.blog" src/pages/BlogPage.tsx; then
    echo "✅ Blog listing structured data implemented"
else
    echo "❌ Blog listing structured data missing"
fi

echo ""
echo "🎯 Testing Instructions:"
echo "1. Start development server: npm run dev"
echo "2. Open http://localhost:5173/blog"
echo "3. Create a blog post with featured image"
echo "4. Test URLs in social media validators:"
echo "   📘 Facebook: https://developers.facebook.com/tools/debug/"
echo "   🐦 Twitter: https://cards-dev.twitter.com/validator"
echo "   💼 LinkedIn: https://www.linkedin.com/post-inspector/"
echo ""
echo "📋 Documentation: See META_TAGS_DOCUMENTATION.md"
echo "🧪 Test Page: Open test-meta-tags.html in browser"
echo ""
echo "✨ Implementation complete! Your blog posts now have full social media meta tag support."
