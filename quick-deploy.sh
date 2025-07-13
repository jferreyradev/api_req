#!/bin/bash

# 🚀 Quick Deploy Commands for API Tester

echo "🦕 API Tester - Quick Deploy Commands"
echo "====================================="
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

echo "📋 Available deployment methods:"
echo ""

echo "1️⃣  DENO DEPLOY (Recommended)"
echo "   🔗 Dashboard: https://dash.deno.com/new"
echo "   📖 Guide: ./DENO-DEPLOY.md"
echo "   ⚡ Commands:"
echo "      npm run build:deno    # Build and prepare for Deno Deploy"
echo "      npm run deno:dev      # Test Deno server locally"
echo ""

echo "2️⃣  NETLIFY"
echo "   🔗 Dashboard: https://app.netlify.com/start"
echo "   📖 Guide: ./DEPLOY.md"
echo "   ⚡ Commands:"
echo "      npm run build         # Build for static hosting"
echo "      # Upload dist/ folder to Netlify"
echo ""

echo "3️⃣  VERCEL"
echo "   🔗 Dashboard: https://vercel.com/new"
echo "   📖 Guide: ./DEPLOY.md"
echo "   ⚡ Commands:"
if command_exists vercel; then
echo "      vercel --prod          # Deploy directly"
else
echo "      npm install -g vercel  # Install Vercel CLI first"
echo "      vercel --prod          # Then deploy"
fi
echo ""

echo "4️⃣  GITHUB PAGES"
echo "   🔗 Repository Settings > Pages"
echo "   📖 Guide: ./DEPLOY.md"
echo "   ⚡ Commands:"
echo "      npm run build         # Build for static hosting"
echo "      # Use GitHub Actions or upload dist/ manually"
echo ""

echo "🔧 Quick Commands:"
echo ""
echo "📦 Build Commands:"
echo "   npm run build           # Standard build"
echo "   npm run build:deno      # Build + prepare for Deno Deploy"
echo "   npm run preview         # Preview build locally"
echo ""

echo "🧪 Test Commands:"
echo "   npm run dev             # Development server"
if command_exists deno; then
echo "   npm run deno:dev        # Test Deno server locally"
echo "   npm run deno:check      # Check TypeScript syntax"
else
echo "   # Install Deno first: curl -fsSL https://deno.land/install.sh | sh"
fi
echo ""

echo "📊 Status Check:"
echo ""

# Check if built
if [ -d "dist" ]; then
    echo "   ✅ Built - dist/ folder exists"
    echo "      📁 Size: $(du -sh dist 2>/dev/null | cut -f1)"
else
    echo "   ❌ Not built - run 'npm run build' first"
fi

# Check if git repo
if [ -d ".git" ]; then
    echo "   ✅ Git initialized"
    
    # Check if there are uncommitted changes
    if git diff-index --quiet HEAD --; then
        echo "   ✅ No uncommitted changes"
    else
        echo "   ⚠️  Uncommitted changes - consider committing first"
    fi
else
    echo "   ❌ Not a git repository"
fi

# Check Node modules
if [ -d "node_modules" ]; then
    echo "   ✅ Dependencies installed"
else
    echo "   ❌ Dependencies missing - run 'npm install'"
fi

echo ""
echo "🎯 Recommended Next Steps:"
echo ""

if [ ! -d "dist" ]; then
    echo "1. Build the application:"
    echo "   npm run build:deno"
    echo ""
fi

if [ -d ".git" ] && ! git diff-index --quiet HEAD --; then
    echo "2. Commit your changes:"
    echo "   git add ."
    echo "   git commit -m '🚀 Ready for deploy'"
    echo "   git push origin main"
    echo ""
fi

echo "3. Choose your deployment platform:"
echo "   🦕 Deno Deploy: https://dash.deno.com/new"
echo "   🌐 Netlify: https://app.netlify.com/start"
echo "   ⚡ Vercel: https://vercel.com/new"
echo ""

echo "🎉 Your API Tester is ready to deploy!"
echo "📖 Check the guides in DENO-DEPLOY.md or DEPLOY.md for detailed instructions."
