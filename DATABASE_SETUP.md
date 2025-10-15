# Database Setup Guide

Panduan lengkap untuk setup Firebase Firestore database untuk sistem ujian online.

---

## Step 1: Setup Firestore Security Rules

1. Buka Firebase Console > Firestore Database
2. Klik tab "Rules"
3. Copy-paste seluruh isi dari file `firestore.rules`
4. Klik "Publish"

**Rules tersebut mengatur:**
- Students hanya bisa read/write data mereka sendiri
- Admins bisa full access ke semua data
- Exam attempts tidak bisa di-edit/delete (data integrity)
- Analytics hanya untuk admin

---

## Step 2: Create Firestore Indexes

Indexes diperlukan untuk query performance. Buat indexes berikut di Firebase Console:

### Manual Creation via Console

1. Buka Firestore Database > Indexes
2. Klik "Create Index" untuk masing-masing:

**Index 1: examAttempts - Student History**
- Collection: `examAttempts`
- Fields:
  - `studentId` (Ascending)
  - `submittedAt` (Descending)
- Query scope: Collection

**Index 2: examAttempts - Exam Results**
- Collection: `examAttempts`
- Fields:
  - `examId` (Ascending)
  - `submittedAt` (Descending)
- Query scope: Collection

**Index 3: examAttempts - Class Ranking**
- Collection: `examAttempts`
- Fields:
  - `studentClass` (Ascending)
  - `score` (Descending)
- Query scope: Collection

**Index 4: questions - Exam Questions**
- Collection: `questions`
- Fields:
  - `examId` (Ascending)
  - `questionNumber` (Ascending)
- Query scope: Collection

**Index 5: exams - Active Exams**
- Collection: `exams`
- Fields:
  - `isActive` (Ascending)
  - `createdAt` (Descending)
- Query scope: Collection

**Index 6: exams - Grade Filter**
- Collection: `exams`
- Fields:
  - `grade` (Ascending)
  - `isActive` (Ascending)
  - `createdAt` (Descending)
- Query scope: Collection

---

## Step 3: Seed Sample Data

### Prerequisites
Make sure `.env.local` has correct Firebase config.

### Run Seeding Script

```bash
npm run seed
```

Script ini akan create:
- 1 admin account
- 5 sample students
- 3 sample exams (Matematika, Bahasa Indonesia, IPA)
- 30 questions total
- System settings

### Default Credentials

**Admin Account:**
```
Email: admin@sdnpgs1.sch.id
Password: admin123
```

**Sample Student:**
```
NISN: 1234567890
Password: password123
```

**All Sample Students:**
| NISN | Name | Class | Password |
|------|------|-------|----------|
| 1234567890 | Ahmad Rizki | 4A | password123 |
| 1234567891 | Siti Aisyah | 4A | password123 |
| 1234567892 | Budi Santoso | 4B | password123 |
| 1234567893 | Dewi Lestari | 5A | password123 |
| 1234567894 | Eko Prasetyo | 5B | password123 |

---

## Step 4: Verify Setup

### Check Authentication
1. Firebase Console > Authentication > Users
2. You should see 6 users (1 admin + 5 students)

### Check Firestore Data
1. Firebase Console > Firestore Database > Data
2. Verify collections exist:
   - `users` (6 documents)
   - `exams` (3 documents)
   - `questions` (30 documents)
   - `settings` (1 document: config)

### Test Student App
```bash
npm run dev
```

1. Open http://localhost:3000
2. Login with NISN: `1234567890`, Password: `password123`
3. You should see 3 exams in dashboard
4. Try taking an exam
5. Check results page

---

## Step 5: Production Checklist

Before deploying to production:

**Security:**
- [ ] Change all default passwords
- [ ] Create real admin account
- [ ] Delete sample student accounts (if not needed)
- [ ] Verify Firestore Rules are published

**Data:**
- [ ] Clear sample exam attempts (if any)
- [ ] Create real exams via admin panel
- [ ] Import real student data

**Settings:**
- [ ] Update `settings/config` with real school data
- [ ] Add Gemini API key (for admin AI features)

**Deployment:**
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Add environment variables in Vercel
- [ ] Test production build

---

## Database Maintenance

### Backup Strategy
Firebase automatically backs up data, but for extra safety:

1. **Export Data Regularly**
   - Firebase Console > Firestore > Import/Export
   - Export to Google Cloud Storage
   - Set up scheduled exports (optional)

2. **Monitor Usage**
   - Firebase Console > Usage
   - Check Firestore reads/writes
   - Monitor Authentication usage

### Scaling Considerations

Current free tier limits:
- Firestore: 50k reads/day, 20k writes/day
- Storage: 1 GB
- Authentication: Unlimited

For SD with ~200 students:
- Average 1000 reads/day
- Average 200 writes/day
- Well within free tier

---

## Troubleshooting

### "Permission Denied" Error
- Check Firestore Rules are published
- Verify user has correct role in `users` collection
- Check user is authenticated

### "Index Required" Error
- Create missing index via link in error message
- Or manually create indexes from Step 2

### Seeding Script Fails
- Check Firebase config in `.env.local`
- Verify Authentication is enabled
- Check Firestore is created
- Try deleting existing users and run again

### Questions Not Loading
- Verify `questions` collection exists
- Check `examId` field matches exam document ID
- Verify indexes are created

---

## Next Steps

After database is setup:

1. **Test Student App Thoroughly**
   - Login, take exams, view results
   - Test on mobile browser

2. **Build Admin Panel**
   - Separate Next.js project
   - Use same Firebase config
   - CRUD for exams, students, questions
   - Analytics dashboard with AI

3. **Deploy**
   - Student app to Vercel
   - Admin panel to Vercel (separate project)
   - Use custom domain

---

## Database Schema Reference

See `DATABASE.md` for complete schema documentation including:
- All collections and fields
- Data types and constraints
- Relationships (ER diagram)
- Example documents
- Query patterns

---

## Support

If you encounter issues:

1. Check Firebase Console for errors
2. Review `DATABASE.md` for schema reference
3. Check `firestore.rules` for permission issues
4. Verify indexes are created
5. Check browser console for errors
