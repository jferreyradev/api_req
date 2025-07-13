# 🌳 Branch Structure - API Tester

## 📋 Current Branches

### 🔗 `main` 
**Base branch** with the core API Tester functionality
- ✅ Single component architecture (`CardApi.vue`)
- ✅ Headers rápidos (Authorization, API Key, Custom)
- ✅ Compact UI with emoji branding 🚀
- ✅ Search functionality in responses
- ✅ Download capabilities (JSON, TXT, CSV)
- ✅ Clean codebase (removed all unused components)

### 🚀 `feature/deploy-https-deno` ← **Current Branch**
**Complete deployment solution** with HTTPS handling
- ✅ **All features from main** +
- 🦕 **Deno Deploy support** with TypeScript server
- 🔒 **HTTPS Mixed Content** detection and resolution
- 🔄 **Multiple CORS proxies** (AllOrigins, CORS Anywhere)
- ⚙️ **Environment variables** configuration
- 🤖 **GitHub Actions** CI/CD pipeline
- 📦 **Multi-platform support** (Netlify, Vercel, GitHub Pages)
- 📚 **Complete documentation** and deployment guides

## 🎯 Branch Purpose

### Why Separate Branches?

#### 📱 `main` - Core Application
- **Focus**: Clean, functional API tester
- **Audience**: Users who want to run locally or simple hosting
- **Size**: Minimal, essential files only
- **Complexity**: Low, easy to understand

#### 🚀 `feature/deploy-https-deno` - Production Ready
- **Focus**: Enterprise-grade deployment solution
- **Audience**: Production deployments, professional use
- **Size**: Comprehensive with all deployment tools
- **Complexity**: Higher, but well-documented

## 📁 File Differences

### Files Only in `feature/deploy-https-deno`:

```
📦 Deployment Infrastructure
├── server.ts                    # 🦕 Deno TypeScript server
├── deno.json                   # ⚙️ Deno configuration
├── .env.example                # 📝 Environment template
├── .env.production             # 🌍 Production variables
├── build-deno.sh               # 🔨 Deno build script
├── quick-deploy.sh             # 🚀 Interactive deploy tool
├── netlify.toml                # 🌐 Netlify configuration
└── .github/workflows/
    └── deno-deploy.yml         # 🤖 GitHub Actions

📚 Documentation
├── DENO-DEPLOY.md              # 🦕 Deno Deploy guide
├── DENO-DEPLOY-SUMMARY.md      # 📋 Quick reference
└── DEPLOY.md                   # 🌐 Multi-platform guide

🔧 Enhanced Files (modified from main)
├── src/components/CardApi.vue  # + Mixed Content detection
├── vite.config.js             # + Proxy and build optimization  
├── package.json               # + Deno scripts
├── README.md                  # + Deployment section
└── .gitignore                 # + Environment files
```

## 🔄 Workflow Recommendations

### For Development:
```bash
# Work on core features
git checkout main
# Make changes...
git add .
git commit -m "✨ Add new feature"
```

### For Deployment Features:
```bash
# Work on deployment enhancements
git checkout feature/deploy-https-deno
# Make changes...
git add .
git commit -m "🚀 Improve deployment"
```

### For Merging:
```bash
# When ready to merge deployment features to main
git checkout main
git merge feature/deploy-https-deno
```

## 🎯 Current Status

### ✅ `main` Branch
- **Status**: ✅ Production ready for local/simple hosting
- **Last Update**: Core API Tester functionality
- **Size**: ~15 files, minimal setup

### ✅ `feature/deploy-https-deno` Branch  
- **Status**: ✅ Production ready for all major platforms
- **Last Update**: Complete deployment solution
- **Size**: ~25 files, comprehensive setup

## 🚀 Quick Commands

### Switch to Main (Core App)
```bash
git checkout main
npm run dev
```

### Switch to Deploy Branch (Full Features)
```bash
git checkout feature/deploy-https-deno
npm run dev                    # Development
npm run build:deno            # Build for Deno Deploy
./quick-deploy.sh             # Interactive deployment
```

### Push Branches to Remote
```bash
# Push current deploy branch
git push origin feature/deploy-https-deno

# Switch and push main
git checkout main
git push origin main
```

---

## 💡 Benefits of This Structure

1. **🧹 Clean Main**: Core functionality without deployment complexity
2. **🚀 Feature Rich**: Full deployment solution in dedicated branch
3. **📚 Documentation**: Each branch has appropriate documentation level
4. **🔄 Flexibility**: Easy to cherry-pick features or maintain separately
5. **🎯 Purpose Clear**: Each branch has a clear, specific purpose

Choose the branch that fits your needs! 🎉
