# GIT SETUP INSTRUCTIONS

If you want to push this code to GitHub and deploy from there.

## Prerequisites

- Git installed on your computer (https://git-scm.com/download)
- GitHub account (https://github.com/signup)

## Step-by-Step

### 1. Initialize Git Repository

```bash
cd video-competitor-tool
git init
```

### 2. Add All Files

```bash
git add .
```

### 3. Create First Commit

```bash
git commit -m "Initial commit - Video Competitor Intelligence Tool"
```

### 4. Create GitHub Repository

Go to https://github.com/new and:

- Repository name: `video-competitor-tool`
- Description: "Video Competitor Intelligence Report Generator"
- Make it Public
- Click "Create repository"

**Don't** initialize with README, .gitignore, or license (we already have files)

### 5. Add Remote and Push

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/video-competitor-tool.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### 6. Verify

Go to your GitHub repository URL and verify all files are there.

## Later: Updating Code

After making changes:

```bash
git add .
git commit -m "Describe your changes here"
git push
```

## Deployment from GitHub

Now you can:

1. Connect GitHub to Render (for backend)
2. Connect GitHub to Vercel (for frontend)
3. Changes automatically deploy when you push

See SETUP_GUIDE.md for deployment instructions.

## SSH Setup (Optional but Recommended)

For easier pushing without password:

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your-email@example.com"

# Add to GitHub
# Go to https://github.com/settings/keys
# Click "New SSH key"
# Paste public key from: ~/.ssh/id_ed25519.pub

# Use SSH URL instead:
git remote set-url origin git@github.com:YOUR_USERNAME/video-competitor-tool.git
```

---

That's it! Your code is now on GitHub and ready to deploy.
