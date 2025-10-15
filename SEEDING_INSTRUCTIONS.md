# Seeding Script Execution Instructions

## Firestore Rules Must Be Updated First!

The seeding script requires **write permissions** to Firestore. By default, Firestore blocks all writes unless rules allow them.

---

## Option 1: Temporary Test Mode (QUICK - For Development Only)

**Use this for quick testing. NOT for production!**

1. Go to Firebase Console > Firestore Database
2. Click "Rules" tab
3. Replace ALL rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;  // ⚠️ UNSAFE - Development only!
    }
  }
}
```

4. Click "Publish"
5. Run seeding: `npm run seed`
6. **IMPORTANT**: After seeding completes, **immediately** replace with production rules from `firestore.rules` file

---

## Option 2: Production Rules (RECOMMENDED)

**Use this for production-ready setup**

### Step 1: Publish Production Rules FIRST

1. Go to Firebase Console > Firestore Database
2. Click "Rules" tab
3. Copy-paste the entire content from `firestore.rules` file
4. Click "Publish"

### Step 2: Create Initial Admin Manually

Since production rules require admin role, create first admin manually:

1. **Create Admin in Authentication:**
   - Firebase Console > Authentication > Users
   - Click "Add User"
   - Email: `admin@sdnpgs1.sch.id`
   - Password: `admin123`
   - Copy the **User UID** (you'll need this!)

2. **Create Admin User Document:**
   - Firebase Console > Firestore Database > Start Collection
   - Collection ID: `users`
   - Document ID: **Paste the User UID from step 1**
   - Add fields:
     - `uid` (string): **Same UID**
     - `role` (string): `superadmin`
     - `name` (string): `Admin Guru`
     - `email` (string): `admin@sdnpgs1.sch.id`
     - `isActive` (boolean): `true`
     - `createdAt` (timestamp): Click "Set to current time"
     - `updatedAt` (timestamp): Click "Set to current time"

### Step 3: Login as Admin and Run Admin Panel Seeder

Since regular seeding script won't work with production rules (no auth context), you'll need to:

**Option A:** Create data manually via Firebase Console
- Good for small datasets
- Create collections: `exams`, `questions`, `settings`
- Add documents as needed

**Option B:** Build admin panel first, then add data via UI
- Recommended approach
- Admin panel will have authenticated context
- Can create exams/questions through UI

**Option C:** Use Firebase Admin SDK (Server-Side)
- Create separate Node.js script using Firebase Admin SDK
- Admin SDK bypasses security rules
- Requires service account credentials

---

## Troubleshooting

### Error: "Missing or insufficient permissions"

**Cause**: Firestore rules are blocking writes

**Solutions**:
1. Check rules are published in Firebase Console
2. Use Option 1 (Test Mode) for quick development
3. Use Option 2 for production setup

### Error: "auth/invalid-api-key"

**Cause**: Environment variables not loaded

**Solution**:
- Check `.env.local` exists and has correct Firebase config
- Restart terminal and run `npm run seed` again

### Error: "Email already in use"

**Cause**: User already exists

**Solution**:
- This is normal - script skips existing users
- Delete users from Firebase Console > Authentication if you want fresh start

---

## What The Seeding Script Creates

When successfully run, it creates:

### Authentication Users (6 total)
- 1 admin: `admin@sdnpgs1.sch.id`
- 5 students: `{nisn}@student.sdnpgs1.sch.id`

### Firestore Collections

**users** (6 documents)
- Admin and student profile data

**exams** (3 documents)
- Matematika - Perkalian (10 soal)
- Bahasa Indonesia - Sinonim (10 soal)
- IPA - Sistem Pencernaan (10 soal)

**questions** (30 documents)
- 10 questions per exam
- Complete with options and explanations

**settings** (1 document: `config`)
- School name, address, academic year
- Gemini API key (empty by default)

---

## Recommended Workflow

### For Development:

```bash
# 1. Set Firestore to test mode (Option 1)
# 2. Run seeding
npm run seed
# 3. Test app
npm run dev
# 4. When deploying, switch to production rules!
```

### For Production:

```bash
# 1. Publish production rules from firestore.rules
# 2. Create admin manually (see Option 2)
# 3. Build admin panel
# 4. Add data through admin panel UI
```

---

## Security Best Practices

**DO NOT** leave Firestore in test mode (`allow read, write: if true`) in production!

Always use production rules that:
- Require authentication
- Check user roles
- Validate data structure
- Prevent unauthorized access

See `firestore.rules` for complete production-ready rules.

---

## Next Steps

After seeding completes successfully:

1. ✅ Verify data in Firebase Console > Firestore Database
2. ✅ Test login in student app (`npm run dev`)
3. ✅ Take a sample exam
4. ✅ Check results
5. ✅ Switch to production Firestore rules
6. ⏭️  Build admin panel

---

## Manual Seeding Alternative

If automated seeding continues to fail, you can add data manually via Firebase Console:

1. **Add Exam:**
   - Firestore > exams collection > Add document
   - Fill in all fields from `SAMPLE_DATA.md`

2. **Add Questions:**
   - Firestore > questions collection > Add documents
   - Link to exam via `examId` field

3. **Add Students:**
   - Authentication > Add users
   - Firestore > users collection > Add documents with role "student"

See `DATABASE.md` for complete schema reference.
