#!/bin/bash

echo "🚀 Deploying Allergy Food Scanner to Vercel..."

# Build CSS for production
echo "📦 Building CSS..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ CSS build successful"
else
    echo "❌ CSS build failed"
    exit 1
fi

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📥 Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "🎉 Deployment complete!"
echo "📱 Your app should now be available at the URL shown above"
echo "🔧 If you encounter MIME type errors, the fix has been applied and should resolve them" 