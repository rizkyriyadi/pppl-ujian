# Diagram Arsitektur Sistem (SVG Format)

## 1. Arsitektur Sistem Keseluruhan

<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="600" fill="#f8f9fa" stroke="#dee2e6" stroke-width="1"/>
  
  <!-- Title -->
  <text x="400" y="30" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#212529">Arsitektur Sistem Ujian Online</text>
  
  <!-- Client Layer -->
  <rect x="50" y="60" width="700" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
  <text x="70" y="85" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#1976d2">Client Layer</text>
  <rect x="70" y="95" width="120" height="35" fill="#bbdefb" stroke="#1976d2" stroke-width="1" rx="3"/>
  <text x="130" y="115" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#0d47a1">Web Browser</text>
  <rect x="210" y="95" width="120" height="35" fill="#bbdefb" stroke="#1976d2" stroke-width="1" rx="3"/>
  <text x="270" y="115" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#0d47a1">Next.js App</text>
  <rect x="350" y="95" width="120" height="35" fill="#bbdefb" stroke="#1976d2" stroke-width="1" rx="3"/>
  <text x="410" y="115" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#0d47a1">React Components</text>
  <rect x="490" y="95" width="120" height="35" fill="#bbdefb" stroke="#1976d2" stroke-width="1" rx="3"/>
  <text x="550" y="115" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#0d47a1">AuthContext</text>
  
  <!-- Application Layer -->
  <rect x="50" y="160" width="700" height="100" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
  <text x="70" y="185" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#7b1fa2">Application Layer</text>
  <rect x="70" y="195" width="100" height="35" fill="#ce93d8" stroke="#7b1fa2" stroke-width="1" rx="3"/>
  <text x="120" y="215" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#4a148c">Login Page</text>
  <rect x="190" y="195" width="100" height="35" fill="#ce93d8" stroke="#7b1fa2" stroke-width="1" rx="3"/>
  <text x="240" y="215" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#4a148c">Dashboard</text>
  <rect x="310" y="195" width="100" height="35" fill="#ce93d8" stroke="#7b1fa2" stroke-width="1" rx="3"/>
  <text x="360" y="215" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#4a148c">Exam Page</text>
  <rect x="430" y="195" width="100" height="35" fill="#ce93d8" stroke="#7b1fa2" stroke-width="1" rx="3"/>
  <text x="480" y="215" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#4a148c">Results Page</text>
  <rect x="550" y="195" width="100" height="35" fill="#ce93d8" stroke="#7b1fa2" stroke-width="1" rx="3"/>
  <text x="600" y="215" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#4a148c">App Router</text>
  
  <!-- Service Layer -->
  <rect x="50" y="280" width="700" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
  <text x="70" y="305" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#f57c00">Service Layer</text>
  <rect x="70" y="315" width="120" height="35" fill="#ffcc02" stroke="#f57c00" stroke-width="1" rx="3"/>
  <text x="130" y="335" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#e65100">Firebase Auth</text>
  <rect x="210" y="315" width="120" height="35" fill="#ffcc02" stroke="#f57c00" stroke-width="1" rx="3"/>
  <text x="270" y="335" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#e65100">Firebase SDK</text>
  <rect x="350" y="315" width="120" height="35" fill="#ffcc02" stroke="#f57c00" stroke-width="1" rx="3"/>
  <text x="410" y="335" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#e65100">Firestore Client</text>
  
  <!-- Data Layer -->
  <rect x="50" y="380" width="700" height="100" fill="#e8f5e8" stroke="#388e3c" stroke-width="2" rx="5"/>
  <text x="70" y="405" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#388e3c">Data Layer - Firestore Database</text>
  <rect x="70" y="415" width="120" height="35" fill="#a5d6a7" stroke="#388e3c" stroke-width="1" rx="3"/>
  <text x="130" y="435" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#1b5e20">users collection</text>
  <rect x="210" y="415" width="120" height="35" fill="#a5d6a7" stroke="#388e3c" stroke-width="1" rx="3"/>
  <text x="270" y="435" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#1b5e20">exams collection</text>
  <rect x="350" y="415" width="120" height="35" fill="#a5d6a7" stroke="#388e3c" stroke-width="1" rx="3"/>
  <text x="410" y="435" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#1b5e20">questions collection</text>
  <rect x="490" y="415" width="140" height="35" fill="#a5d6a7" stroke="#388e3c" stroke-width="1" rx="3"/>
  <text x="560" y="435" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#1b5e20">examAttempts collection</text>
  
  <!-- Infrastructure -->
  <rect x="50" y="500" width="700" height="80" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="5"/>
  <text x="70" y="525" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#c2185b">Infrastructure</text>
  <rect x="70" y="535" width="120" height="35" fill="#f8bbd9" stroke="#c2185b" stroke-width="1" rx="3"/>
  <text x="130" y="555" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#880e4f">Vercel Hosting</text>
  <rect x="210" y="535" width="120" height="35" fill="#f8bbd9" stroke="#c2185b" stroke-width="1" rx="3"/>
  <text x="270" y="555" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#880e4f">Firebase Cloud</text>
  <rect x="350" y="535" width="140" height="35" fill="#f8bbd9" stroke="#c2185b" stroke-width="1" rx="3"/>
  <text x="420" y="555" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#880e4f">Google Cloud Platform</text>
  
  <!-- Arrows -->
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
    </marker>
  </defs>
  
  <!-- Vertical arrows -->
  <line x1="400" y1="140" x2="400" y2="160" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
  <line x1="400" y1="260" x2="400" y2="280" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
  <line x1="400" y1="360" x2="400" y2="380" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
  <line x1="400" y1="480" x2="400" y2="500" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
</svg>

## 2. Flow Autentikasi

<svg width="800" height="500" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="500" fill="#f8f9fa" stroke="#dee2e6" stroke-width="1"/>
  
  <!-- Title -->
  <text x="400" y="30" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#212529">Flow Proses Autentikasi</text>
  
  <!-- Actors -->
  <rect x="50" y="60" width="100" height="40" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
  <text x="100" y="85" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#1976d2">User</text>
  
  <rect x="200" y="60" width="100" height="40" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
  <text x="250" y="85" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#7b1fa2">Login Page</text>
  
  <rect x="350" y="60" width="100" height="40" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
  <text x="400" y="85" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#f57c00">AuthContext</text>
  
  <rect x="500" y="60" width="100" height="40" fill="#e8f5e8" stroke="#388e3c" stroke-width="2" rx="5"/>
  <text x="550" y="85" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#388e3c">Firebase Auth</text>
  
  <rect x="650" y="60" width="100" height="40" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="5"/>
  <text x="700" y="85" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#c2185b">Dashboard</text>
  
  <!-- Lifelines -->
  <line x1="100" y1="100" x2="100" y2="450" stroke="#666" stroke-width="2" stroke-dasharray="5,5"/>
  <line x1="250" y1="100" x2="250" y2="450" stroke="#666" stroke-width="2" stroke-dasharray="5,5"/>
  <line x1="400" y1="100" x2="400" y2="450" stroke="#666" stroke-width="2" stroke-dasharray="5,5"/>
  <line x1="550" y1="100" x2="550" y2="450" stroke="#666" stroke-width="2" stroke-dasharray="5,5"/>
  <line x1="700" y1="100" x2="700" y2="450" stroke="#666" stroke-width="2" stroke-dasharray="5,5"/>
  
  <!-- Messages -->
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
    </marker>
  </defs>
  
  <!-- Step 1: Input NISN & Password -->
  <line x1="100" y1="130" x2="250" y2="130" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="175" y="125" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#333">1. Input NISN & Password</text>
  
  <!-- Step 2: Convert NISN to email -->
  <rect x="220" y="150" width="60" height="30" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="1" rx="3"/>
  <text x="250" y="170" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#7b1fa2">Convert NISN to email</text>
  
  <!-- Step 3: signInWithEmailAndPassword -->
  <line x1="250" y1="200" x2="550" y2="200" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="400" y="195" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#333">2. signInWithEmailAndPassword()</text>
  
  <!-- Decision Diamond -->
  <polygon points="550,230 580,250 550,270 520,250" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
  <text x="550" y="255" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#f57c00">Auth Success?</text>
  
  <!-- Success Path -->
  <line x1="580" y1="250" x2="620" y2="250" stroke="#4caf50" stroke-width="2"/>
  <text x="600" y="245" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#4caf50">Yes</text>
  
  <line x1="620" y1="250" x2="620" y2="300" stroke="#4caf50" stroke-width="2"/>
  <line x1="620" y1="300" x2="550" y2="300" stroke="#4caf50" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="550" y1="300" x2="400" y2="300" stroke="#4caf50" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="475" y="295" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#4caf50">3. User object</text>
  
  <rect x="370" y="320" width="60" height="30" fill="#fff3e0" stroke="#f57c00" stroke-width="1" rx="3"/>
  <text x="400" y="340" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#f57c00">Update user state</text>
  
  <line x1="400" y1="370" x2="700" y2="370" stroke="#4caf50" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="550" y="365" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#4caf50">4. Redirect to dashboard</text>
  
  <line x1="700" y1="390" x2="100" y2="390" stroke="#4caf50" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="400" y="385" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#4caf50">5. Show exam list</text>
  
  <!-- Error Path -->
  <line x1="520" y1="250" x2="480" y2="250" stroke="#f44336" stroke-width="2"/>
  <text x="500" y="245" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#f44336">No</text>
  
  <line x1="480" y1="250" x2="480" y2="420" stroke="#f44336" stroke-width="2"/>
  <line x1="480" y1="420" x2="250" y2="420" stroke="#f44336" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="365" y="415" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#f44336">Error</text>
  
  <line x1="250" y1="440" x2="100" y2="440" stroke="#f44336" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="175" y="435" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#f44336">Show error message</text>
</svg>

## 3. Database Schema

<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="600" fill="#f8f9fa" stroke="#dee2e6" stroke-width="1"/>
  
  <!-- Title -->
  <text x="400" y="30" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#212529">Database Schema - Firestore Collections</text>
  
  <!-- Users Collection -->
  <rect x="50" y="60" width="180" height="200" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
  <text x="140" y="85" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#1976d2">USERS</text>
  <line x1="60" y1="95" x2="220" y2="95" stroke="#1976d2" stroke-width="1"/>
  <text x="70" y="115" font-family="Arial, sans-serif" font-size="11" fill="#0d47a1">🔑 id: string (PK)</text>
  <text x="70" y="135" font-family="Arial, sans-serif" font-size="11" fill="#0d47a1">role: string</text>
  <text x="70" y="155" font-family="Arial, sans-serif" font-size="11" fill="#0d47a1">name: string</text>
  <text x="70" y="175" font-family="Arial, sans-serif" font-size="11" fill="#0d47a1">email: string</text>
  <text x="70" y="195" font-family="Arial, sans-serif" font-size="11" fill="#0d47a1">nisn: string</text>
  <text x="70" y="215" font-family="Arial, sans-serif" font-size="11" fill="#0d47a1">class: string</text>
  <text x="70" y="235" font-family="Arial, sans-serif" font-size="11" fill="#0d47a1">createdAt: timestamp</text>
  
  <!-- Exams Collection -->
  <rect x="300" y="60" width="200" height="240" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
  <text x="400" y="85" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#7b1fa2">EXAMS</text>
  <line x1="310" y1="95" x2="490" y2="95" stroke="#7b1fa2" stroke-width="1"/>
  <text x="320" y="115" font-family="Arial, sans-serif" font-size="11" fill="#4a148c">🔑 id: string (PK)</text>
  <text x="320" y="135" font-family="Arial, sans-serif" font-size="11" fill="#4a148c">title: string</text>
  <text x="320" y="155" font-family="Arial, sans-serif" font-size="11" fill="#4a148c">description: string</text>
  <text x="320" y="175" font-family="Arial, sans-serif" font-size="11" fill="#4a148c">subject: string</text>
  <text x="320" y="195" font-family="Arial, sans-serif" font-size="11" fill="#4a148c">duration: number</text>
  <text x="320" y="215" font-family="Arial, sans-serif" font-size="11" fill="#4a148c">totalQuestions: number</text>
  <text x="320" y="235" font-family="Arial, sans-serif" font-size="11" fill="#4a148c">passingScore: number</text>
  <text x="320" y="255" font-family="Arial, sans-serif" font-size="11" fill="#4a148c">isActive: boolean</text>
  <text x="320" y="275" font-family="Arial, sans-serif" font-size="11" fill="#4a148c">🔗 createdBy: string (FK)</text>
  
  <!-- Questions Collection -->
  <rect x="570" y="60" width="180" height="220" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
  <text x="660" y="85" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#f57c00">QUESTIONS</text>
  <line x1="580" y1="95" x2="740" y2="95" stroke="#f57c00" stroke-width="1"/>
  <text x="590" y="115" font-family="Arial, sans-serif" font-size="11" fill="#e65100">🔑 id: string (PK)</text>
  <text x="590" y="135" font-family="Arial, sans-serif" font-size="11" fill="#e65100">🔗 examId: string (FK)</text>
  <text x="590" y="155" font-family="Arial, sans-serif" font-size="11" fill="#e65100">questionText: string</text>
  <text x="590" y="175" font-family="Arial, sans-serif" font-size="11" fill="#e65100">questionNumber: number</text>
  <text x="590" y="195" font-family="Arial, sans-serif" font-size="11" fill="#e65100">options: array</text>
  <text x="590" y="215" font-family="Arial, sans-serif" font-size="11" fill="#e65100">correctAnswer: number</text>
  <text x="590" y="235" font-family="Arial, sans-serif" font-size="11" fill="#e65100">difficulty: string</text>
  <text x="590" y="255" font-family="Arial, sans-serif" font-size="11" fill="#e65100">explanation: string</text>
  
  <!-- ExamAttempts Collection -->
  <rect x="50" y="340" width="220" height="240" fill="#e8f5e8" stroke="#388e3c" stroke-width="2" rx="5"/>
  <text x="160" y="365" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#388e3c">EXAM_ATTEMPTS</text>
  <line x1="60" y1="375" x2="260" y2="375" stroke="#388e3c" stroke-width="1"/>
  <text x="70" y="395" font-family="Arial, sans-serif" font-size="11" fill="#1b5e20">🔑 id: string (PK)</text>
  <text x="70" y="415" font-family="Arial, sans-serif" font-size="11" fill="#1b5e20">🔗 examId: string (FK)</text>
  <text x="70" y="435" font-family="Arial, sans-serif" font-size="11" fill="#1b5e20">🔗 studentId: string (FK)</text>
  <text x="70" y="455" font-family="Arial, sans-serif" font-size="11" fill="#1b5e20">studentName: string</text>
  <text x="70" y="475" font-family="Arial, sans-serif" font-size="11" fill="#1b5e20">answers: object</text>
  <text x="70" y="495" font-family="Arial, sans-serif" font-size="11" fill="#1b5e20">score: number</text>
  <text x="70" y="515" font-family="Arial, sans-serif" font-size="11" fill="#1b5e20">correctAnswers: number</text>
  <text x="70" y="535" font-family="Arial, sans-serif" font-size="11" fill="#1b5e20">timeSpent: number</text>
  <text x="70" y="555" font-family="Arial, sans-serif" font-size="11" fill="#1b5e20">isPassed: boolean</text>
  
  <!-- Relationships -->
  <defs>
    <marker id="arrowRel" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
    </marker>
  </defs>
  
  <!-- Users to Exams -->
  <line x1="230" y1="160" x2="300" y2="160" stroke="#666" stroke-width="2" marker-end="url(#arrowRel)"/>
  <text x="265" y="155" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#666">creates</text>
  
  <!-- Exams to Questions -->
  <line x1="500" y1="160" x2="570" y2="160" stroke="#666" stroke-width="2" marker-end="url(#arrowRel)"/>
  <text x="535" y="155" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#666">contains</text>
  
  <!-- Users to ExamAttempts -->
  <line x1="140" y1="260" x2="140" y2="340" stroke="#666" stroke-width="2" marker-end="url(#arrowRel)"/>
  <text x="180" y="300" font-family="Arial, sans-serif" font-size="10" fill="#666">creates</text>
  
  <!-- Exams to ExamAttempts -->
  <line x1="300" y1="300" x2="270" y2="400" stroke="#666" stroke-width="2" marker-end="url(#arrowRel)"/>
  <text x="320" y="350" font-family="Arial, sans-serif" font-size="10" fill="#666">generates</text>
</svg>

## 4. Flow Pengerjaan Ujian

<svg width="800" height="700" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="700" fill="#f8f9fa" stroke="#dee2e6" stroke-width="1"/>
  
  <!-- Title -->
  <text x="400" y="30" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#212529">Flow Pengerjaan Ujian</text>
  
  <!-- Start -->
  <ellipse cx="400" cy="70" rx="80" ry="25" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
  <text x="400" y="77" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white">START</text>
  
  <!-- Step 1: Siswa pilih ujian -->
  <rect x="320" y="120" width="160" height="40" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
  <text x="400" y="145" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#1976d2">Siswa pilih ujian</text>
  
  <!-- Step 2: Load exam data -->
  <rect x="320" y="190" width="160" height="40" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
  <text x="400" y="215" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#7b1fa2">Load exam data</text>
  
  <!-- Step 3: Initialize timer -->
  <rect x="320" y="260" width="160" height="40" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
  <text x="400" y="285" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#f57c00">Initialize timer</text>
  
  <!-- Step 4: Display question -->
  <rect x="320" y="330" width="160" height="40" fill="#e8f5e8" stroke="#388e3c" stroke-width="2" rx="5"/>
  <text x="400" y="355" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#388e3c">Display question</text>
  
  <!-- Decision: User action -->
  <polygon points="400,400 450,430 400,460 350,430" fill="#fce4ec" stroke="#c2185b" stroke-width="2"/>
  <text x="400" y="435" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#c2185b">User Action?</text>
  
  <!-- Answer question -->
  <rect x="120" y="410" width="120" height="40" fill="#e1f5fe" stroke="#0277bd" stroke-width="2" rx="5"/>
  <text x="180" y="435" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#0277bd">Save answer</text>
  
  <!-- Next question -->
  <rect x="560" y="410" width="120" height="40" fill="#e1f5fe" stroke="#0277bd" stroke-width="2" rx="5"/>
  <text x="620" y="435" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#0277bd">Next question</text>
  
  <!-- Submit exam -->
  <rect x="320" y="520" width="160" height="40" fill="#ffebee" stroke="#d32f2f" stroke-width="2" rx="5"/>
  <text x="400" y="545" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#d32f2f">Submit exam</text>
  
  <!-- Timer check (parallel process) -->
  <polygon points="100,300 150,330 100,360 50,330" fill="#fff9c4" stroke="#f9a825" stroke-width="2"/>
  <text x="100" y="335" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#f9a825">Timer check</text>
  
  <!-- Auto submit -->
  <rect x="20" y="520" width="160" height="40" fill="#ffcdd2" stroke="#d32f2f" stroke-width="2" rx="5"/>
  <text x="100" y="545" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#d32f2f">Auto submit (time up)</text>
  
  <!-- Calculate score -->
  <rect x="320" y="590" width="160" height="40" fill="#e8f5e8" stroke="#388e3c" stroke-width="2" rx="5"/>
  <text x="400" y="615" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#388e3c">Calculate score & save</text>
  
  <!-- End -->
  <ellipse cx="400" cy="670" rx="80" ry="25" fill="#f44336" stroke="#c62828" stroke-width="2"/>
  <text x="400" y="677" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white">END</text>
  
  <!-- Arrows -->
  <defs>
    <marker id="arrowFlow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
    </marker>
  </defs>
  
  <!-- Main flow -->
  <line x1="400" y1="95" x2="400" y2="120" stroke="#333" stroke-width="2" marker-end="url(#arrowFlow)"/>
  <line x1="400" y1="160" x2="400" y2="190" stroke="#333" stroke-width="2" marker-end="url(#arrowFlow)"/>
  <line x1="400" y1="230" x2="400" y2="260" stroke="#333" stroke-width="2" marker-end="url(#arrowFlow)"/>
  <line x1="400" y1="300" x2="400" y2="330" stroke="#333" stroke-width="2" marker-end="url(#arrowFlow)"/>
  <line x1="400" y1="370" x2="400" y2="400" stroke="#333" stroke-width="2" marker-end="url(#arrowFlow)"/>
  
  <!-- User actions -->
  <line x1="350" y1="430" x2="240" y2="430" stroke="#0277bd" stroke-width="2" marker-end="url(#arrowFlow)"/>
  <text x="295" y="425" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#0277bd">Answer</text>
  
  <line x1="450" y1="430" x2="560" y2="430" stroke="#0277bd" stroke-width="2" marker-end="url(#arrowFlow)"/>
  <text x="505" y="425" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#0277bd">Navigate</text>
  
  <line x1="400" y1="460" x2="400" y2="520" stroke="#d32f2f" stroke-width="2" marker-end="url(#arrowFlow)"/>
  <text x="420" y="490" font-family="Arial, sans-serif" font-size="10" fill="#d32f2f">Submit</text>
  
  <!-- Back to question -->
  <path d="M 180 410 Q 180 350 320 350" stroke="#0277bd" stroke-width="2" fill="none" marker-end="url(#arrowFlow)"/>
  <path d="M 620 410 Q 620 350 480 350" stroke="#0277bd" stroke-width="2" fill="none" marker-end="url(#arrowFlow)"/>
  
  <!-- Timer flow -->
  <line x1="320" y1="280" x2="150" y2="330" stroke="#f9a825" stroke-width="2" marker-end="url(#arrowFlow)"/>
  <path d="M 50 330 Q 20 330 20 540 L 20 540" stroke="#f9a825" stroke-width="2" fill="none" marker-end="url(#arrowFlow)"/>
  <text x="30" y="435" font-family="Arial, sans-serif" font-size="10" fill="#f9a825">Time up</text>
  
  <!-- Final flow -->
  <line x1="400" y1="560" x2="400" y2="590" stroke="#333" stroke-width="2" marker-end="url(#arrowFlow)"/>
  <line x1="180" y1="540" x2="320" y2="610" stroke="#333" stroke-width="2" marker-end="url(#arrowFlow)"/>
  <line x1="400" y1="630" x2="400" y2="645" stroke="#333" stroke-width="2" marker-end="url(#arrowFlow)"/>
</svg>
</svg>