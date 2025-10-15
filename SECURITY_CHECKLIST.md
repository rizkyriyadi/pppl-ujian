# 🔒 Security Checklist - BEFORE PUSHING TO GITHUB

## ⚠️ CRITICAL - Sensitive Files

These files contain **SECRETS** and should **NEVER** be pushed to public repos:

### 1. `.env.local` ✅ IGNORED
Contains Firebase API keys and config.

**Status:** ✅ Already in `.gitignore`

### 2. `pppl-ede4b-firebase-adminsdk-fbsvc-af6cbefe26.json` ✅ IGNORED
Firebase Admin SDK service account credentials.

**Status:** ✅ Already in `.gitignore`

**⚠️ DANGER:** If this file leaks, anyone can:
- Read/write ALL data in your Firestore
- Create/delete users
- Full admin access to Firebase project

### 3. `node_modules/` ✅ IGNORED
**Status:** ✅ Already in `.gitignore`

---

## ✅ Pre-Push Security Checklist

Run this before `git push`:

```bash
# 1. Check what will be committed
git status

# 2. Make sure sensitive files are NOT listed
# Should NOT see:
#   - .env.local
#   - *firebase-adminsdk*.json
#   - service-account*.json

# 3. Double check ignored files
git status --ignored | grep -E "(\.env|firebase-adminsdk|service)"

# Should output:
#   .env.local
#   pppl-ede4b-firebase-adminsdk-fbsvc-af6cbefe26.json
```

---

## 🛡️ What's Safe to Push

These files are SAFE and SHOULD be pushed:

### Code Files ✅
- `src/**/*.tsx`
- `src/**/*.ts`
- `src/**/*.css`

### Config Files ✅
- `package.json`
- `tsconfig.json`
- `next.config.ts`
- `tailwind.config.ts` (if exists)
- `eslint.config.mjs`
- `postcss.config.mjs`

### Documentation ✅
- `README.md`
- `DATABASE.md`
- `DATABASE_SETUP.md`
- `SEEDING_INSTRUCTIONS.md`
- `COMPLETE_SUMMARY.md`
- etc.

### Security Rules ✅
- `firestore.rules` (rules are NOT secrets!)

### Scripts ✅
- `scripts/seed.ts` (uses env vars, safe)
- `scripts/seed-admin.ts` (uses service account path, safe)

---

## 🚫 What's NEVER Safe to Push

### Never Push These to Public Repos:

1. **Environment Variables Files**
   - `.env`
   - `.env.local`
   - `.env.production`
   - `.env.development`

2. **Service Account Credentials**
   - `*-firebase-adminsdk-*.json`
   - `service-account*.json`
   - Any file with `serviceAccountKey`

3. **API Keys in Code**
   - Never hardcode API keys
   - Always use environment variables

4. **Database Dumps**
   - `.sql` files with production data
   - `.json` exports with user data

5. **Private Keys**
   - `*.pem`
   - `*.key`
   - SSH keys

---

## 📝 Safe Push Workflow

```bash
# 1. Stage files
git add .

# 2. BEFORE COMMIT - Check status
git status

# 3. Verify no sensitive files
# Look for RED FLAGS:
#   ❌ .env.local
#   ❌ *firebase-adminsdk*.json
#   ❌ Any API keys visible

# 4. If all clear, commit
git commit -m "Your commit message"

# 5. Push to GitHub
git push
```

---

## 🆘 If You Accidentally Pushed Secrets

### Immediate Actions:

1. **Revoke Credentials IMMEDIATELY**
   - Firebase Console > Project Settings > Service Accounts
   - Delete the leaked service account
   - Generate new one

2. **Rotate API Keys**
   - Firebase Console > Project Settings > General
   - Regenerate all API keys

3. **Remove from Git History**
   ```bash
   # Use BFG Repo Cleaner or git filter-branch
   # This is COMPLEX - better to create new repo
   ```

4. **Create New Repo (Recommended)**
   - Easier than cleaning git history
   - Copy code (NOT .git folder)
   - Create fresh repo

---

## 🔐 Environment Variables for Deployment

### For Vercel Deployment:

When deploying to Vercel, add these environment variables in dashboard:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=pppl-ede4b.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=pppl-ede4b
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=pppl-ede4b.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=519705645585
NEXT_PUBLIC_FIREBASE_APP_ID=1:519705645585:web:...
```

**Note:** These are SAFE to be public (NEXT_PUBLIC_ prefix means client-side).

**NOT SAFE:** Service account JSON is NEVER safe to expose!

---

## 📋 GitHub Public Repo Best Practices

1. **Use `.gitignore`** ✅
   - Already configured

2. **Use Environment Variables** ✅
   - Already using `.env.local`

3. **Document Setup Without Secrets** ✅
   - README has setup instructions
   - No secrets in docs

4. **Include `.env.example`** (Optional)
   - Template without real values

---

## ✅ Current Status

Your repo is **SECURE** to push because:

- ✅ `.env.local` ignored
- ✅ Service account JSON ignored
- ✅ No hardcoded secrets in code
- ✅ Documentation doesn't contain secrets
- ✅ Scripts use env vars and relative paths

---

## 🎯 Final Check Before Push

```bash
# Run this command:
git ls-files | grep -E "(\.env|firebase-adminsdk|service-account)"

# Should return NOTHING!
# If it returns files = DANGER! Don't push!
```

---

## 📚 Additional Resources

- [GitHub: Removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [Firebase Security Best Practices](https://firebase.google.com/docs/rules/best-practices)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)

---

## ✅ You're Safe to Push!

If you've followed this checklist:
- ✅ `.gitignore` is updated
- ✅ No secrets in tracked files
- ✅ Service account JSON ignored

Then you can safely:

```bash
git add .
git commit -m "Complete student app with database"
git push origin main
```

🎉 **Your code is secure for public GitHub repo!**
