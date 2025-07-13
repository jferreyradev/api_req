#!/bin/bash

# 🌳 Branch Comparison Tool for API Tester

echo "🌳 API Tester - Branch Comparison"
echo "================================="
echo ""

# Check current branch
current_branch=$(git branch --show-current)
echo "📍 Current branch: $current_branch"
echo ""

# Show all branches
echo "📋 Available branches:"
git branch -v
echo ""

# Show file differences
echo "📁 Files only in feature/deploy-https-deno:"
echo "----------------------------------------"
git ls-tree -r --name-only feature/deploy-https-deno | grep -v "$(git ls-tree -r --name-only main)" | sort
echo ""

echo "📁 Files modified from main:"
echo "----------------------------"
git diff --name-only main feature/deploy-https-deno | grep -v "^\.env" | grep -v "\.md$" | grep -v "\.sh$" | grep -v "server\.ts" | grep -v "deno\." | grep -v "netlify\." | grep -v "\.github"
echo ""

echo "📊 Commit differences:"
echo "----------------------"
git log main..feature/deploy-https-deno --oneline
echo ""

echo "🎯 Quick Actions:"
echo "=================="
echo ""
echo "Switch to main (core app):"
echo "  git checkout main"
echo ""
echo "Switch to deploy branch (full features):"
echo "  git checkout feature/deploy-https-deno"
echo ""
echo "See detailed differences:"
echo "  git diff main feature/deploy-https-deno"
echo ""
echo "Push deploy branch to remote:"
echo "  git push origin feature/deploy-https-deno"
echo ""

if [ "$current_branch" = "feature/deploy-https-deno" ]; then
    echo "✅ You're on the DEPLOY branch with all features!"
    echo "🚀 Ready for production deployment to any platform"
elif [ "$current_branch" = "main" ]; then
    echo "✅ You're on the MAIN branch with core functionality!"
    echo "💻 Perfect for local development and simple hosting"
else
    echo "ℹ️  You're on branch: $current_branch"
fi

echo ""
echo "📖 See BRANCHES.md for detailed documentation"
