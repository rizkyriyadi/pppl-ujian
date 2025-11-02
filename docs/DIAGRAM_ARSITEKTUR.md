# Diagram Arsitektur Sistem Ujian Online - SDN TUGU 1

## 1. Diagram Arsitektur Sistem Keseluruhan

```mermaid
graph TB
    subgraph "Client Layer"
        A[Web Browser] --> B[Next.js App]
        B --> C[React Components]
        C --> D[AuthContext]
    end
    
    subgraph "Application Layer"
        B --> E[App Router]
        E --> F[Login Page]
        E --> G[Dashboard Page]
        E --> H[Exam Page]
        E --> I[Results Page]
    end
    
    subgraph "Service Layer"
        D --> J[Firebase Auth]
        C --> K[Firebase SDK]
        K --> L[Firestore Client]
    end
    
    subgraph "Data Layer"
        L --> M[(Firestore Database)]
        M --> N[users collection]
        M --> O[exams collection]
        M --> P[questions collection]
        M --> Q[examAttempts collection]
    end
    
    subgraph "Infrastructure"
        B --> R[Vercel Hosting]
        M --> S[Firebase Cloud]
        S --> T[Google Cloud Platform]
    end
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style M fill:#fff3e0
    style R fill:#e8f5e8
```

## 2. Diagram Flow Autentikasi

```mermaid
sequenceDiagram
    participant U as User
    participant L as Login Page
    participant A as AuthContext
    participant F as Firebase Auth
    participant D as Dashboard
    
    U->>L: Input NISN & Password
    L->>L: Convert NISN to email format
    L->>F: signInWithEmailAndPassword()
    
    alt Authentication Success
        F->>A: User object
        A->>A: Update user state
        A->>D: Redirect to dashboard
        D->>U: Show exam list
    else Authentication Failed
        F->>L: Error
        L->>U: Show error message
    end
```

## 3. Diagram Flow Pengerjaan Ujian

```mermaid
flowchart TD
    A[Siswa pilih ujian] --> B[Load exam data]
    B --> C[Initialize timer]
    C --> D[Display first question]
    
    D --> E{User action}
    E -->|Answer question| F[Save answer to state]
    E -->|Next question| G[Navigate to next]
    E -->|Previous question| H[Navigate to previous]
    E -->|Submit exam| I[Manual submit]
    
    F --> D
    G --> D
    H --> D
    
    C --> J{Timer check}
    J -->|Time remaining| K[Continue countdown]
    J -->|Time up| L[Auto submit]
    
    K --> J
    
    I --> M[Calculate score]
    L --> M
    M --> N[Save to examAttempts]
    N --> O[Show results]
    
    style A fill:#e3f2fd
    style M fill:#fff3e0
    style O fill:#e8f5e8
```

## 4. Diagram Database Schema

```mermaid
erDiagram
    USERS {
        string id PK
        string role
        string name
        string email
        string nisn
        string class
        timestamp createdAt
        timestamp updatedAt
    }
    
    EXAMS {
        string id PK
        string title
        string description
        string subject
        number grade
        number duration
        number totalQuestions
        number passingScore
        boolean isActive
        string createdBy FK
        timestamp createdAt
        timestamp scheduledDate
    }
    
    QUESTIONS {
        string id PK
        string examId FK
        string questionText
        number questionNumber
        array options
        number correctAnswer
        string subject
        string difficulty
        string explanation
        string imageUrl
    }
    
    EXAM_ATTEMPTS {
        string id PK
        string examId FK
        string examTitle
        string studentId FK
        string studentName
        string studentClass
        object answers
        number score
        number totalQuestions
        number correctAnswers
        number incorrectAnswers
        number unanswered
        number timeSpent
        boolean isPassed
        timestamp startedAt
        timestamp submittedAt
        string status
    }
    
    USERS ||--o{ EXAM_ATTEMPTS : creates
    EXAMS ||--o{ QUESTIONS : contains
    EXAMS ||--o{ EXAM_ATTEMPTS : generates
    USERS ||--o{ EXAMS : creates
```

## 5. Diagram Komponen Aplikasi

```mermaid
graph TD
    subgraph "Root Layout"
        A[layout.tsx] --> B[AuthProvider]
        A --> C[Global CSS]
    end
    
    subgraph "Pages"
        D[page.tsx - Root] --> E[Redirect Logic]
        F[login/page.tsx] --> G[Login Form]
        H[dashboard/page.tsx] --> I[Exam List]
        J[exam/[id]/page.tsx] --> K[Exam Interface]
        L[results/page.tsx] --> M[Results List]
        N[results/[id]/page.tsx] --> O[Result Detail]
    end
    
    subgraph "Lib Components"
        P[AuthContext.tsx] --> Q[Auth State Management]
        R[firebase.ts] --> S[Firebase Config]
        T[types.ts] --> U[TypeScript Interfaces]
    end
    
    subgraph "Hooks & Utils"
        V[useAuth Hook] --> P
        W[Firebase Services] --> R
    end
    
    B --> P
    G --> R
    I --> R
    K --> R
    M --> R
    O --> R
    
    style A fill:#e1f5fe
    style P fill:#f3e5f5
    style R fill:#fff3e0
```

## 6. Diagram Deployment Architecture

```mermaid
graph TB
    subgraph "Development"
        A[Local Development] --> B[npm run dev]
        B --> C[Next.js Dev Server]
        C --> D[Hot Reload]
    end
    
    subgraph "Build Process"
        E[Source Code] --> F[TypeScript Compilation]
        F --> G[Next.js Build]
        G --> H[Static Generation]
        H --> I[Bundle Optimization]
    end
    
    subgraph "Production Deployment"
        I --> J[Vercel Platform]
        J --> K[Edge Functions]
        J --> L[CDN Distribution]
        L --> M[Global Edge Locations]
    end
    
    subgraph "Backend Services"
        N[Firebase Project] --> O[Firestore Database]
        N --> P[Firebase Auth]
        N --> Q[Firebase Hosting]
    end
    
    subgraph "Monitoring"
        R[Vercel Analytics] --> J
        S[Firebase Monitoring] --> N
        T[Performance Metrics] --> U[Dashboard]
    end
    
    K --> N
    M --> V[End Users]
    
    style A fill:#e3f2fd
    style J fill:#e8f5e8
    style N fill:#fff3e0
    style V fill:#fce4ec
```

## 7. Diagram Security Architecture

```mermaid
graph TD
    subgraph "Client Security"
        A[HTTPS Encryption] --> B[Secure Headers]
        B --> C[CSP Policy]
        C --> D[XSS Protection]
    end
    
    subgraph "Authentication Layer"
        E[Firebase Auth] --> F[JWT Tokens]
        F --> G[Session Management]
        G --> H[Token Refresh]
    end
    
    subgraph "Authorization Layer"
        I[Route Guards] --> J[Role-based Access]
        J --> K[Resource Permissions]
        K --> L[Data Filtering]
    end
    
    subgraph "Data Security"
        M[Firestore Rules] --> N[Input Validation]
        N --> O[Data Sanitization]
        O --> P[Encryption at Rest]
    end
    
    subgraph "Network Security"
        Q[Firebase Security] --> R[VPC Protection]
        R --> S[DDoS Protection]
        S --> T[Rate Limiting]
    end
    
    A --> E
    E --> I
    I --> M
    M --> Q
    
    style A fill:#ffebee
    style E fill:#e8f5e8
    style I fill:#fff3e0
    style M fill:#e1f5fe
    style Q fill:#f3e5f5
```

## 8. Diagram Data Flow

```mermaid
flowchart LR
    subgraph "User Actions"
        A[Login] --> B[Browse Exams]
        B --> C[Start Exam]
        C --> D[Answer Questions]
        D --> E[Submit Exam]
        E --> F[View Results]
    end
    
    subgraph "Data Operations"
        G[(Authentication)] --> H[(Load Exams)]
        H --> I[(Load Questions)]
        I --> J[(Save Answers)]
        J --> K[(Calculate Score)]
        K --> L[(Save Results)]
    end
    
    subgraph "Database Collections"
        M[users] --> N[exams]
        N --> O[questions]
        O --> P[examAttempts]
    end
    
    A --> G
    B --> H
    C --> I
    D --> J
    E --> K
    F --> L
    
    G --> M
    H --> N
    I --> O
    J --> P
    K --> P
    L --> P
    
    style A fill:#e3f2fd
    style G fill:#fff3e0
    style M fill:#e8f5e8
```

## 9. Diagram Performance Optimization

```mermaid
graph TD
    subgraph "Frontend Optimization"
        A[Code Splitting] --> B[Lazy Loading]
        B --> C[Bundle Optimization]
        C --> D[Image Optimization]
    end
    
    subgraph "Caching Strategy"
        E[Browser Cache] --> F[CDN Cache]
        F --> G[Service Worker]
        G --> H[Database Cache]
    end
    
    subgraph "Database Optimization"
        I[Composite Indexes] --> J[Query Optimization]
        J --> K[Data Denormalization]
        K --> L[Connection Pooling]
    end
    
    subgraph "Monitoring"
        M[Performance Metrics] --> N[Core Web Vitals]
        N --> O[User Experience]
        O --> P[Optimization Feedback]
    end
    
    A --> E
    E --> I
    I --> M
    P --> A
    
    style A fill:#e1f5fe
    style E fill:#f3e5f5
    style I fill:#fff3e0
    style M fill:#e8f5e8
```

## 10. Diagram Scalability Architecture

```mermaid
graph TB
    subgraph "Current Architecture"
        A[Single Next.js App] --> B[Firebase Backend]
        B --> C[Firestore Database]
    end
    
    subgraph "Horizontal Scaling"
        D[Load Balancer] --> E[Multiple App Instances]
        E --> F[Shared Database]
        F --> G[Database Replicas]
    end
    
    subgraph "Microservices Evolution"
        H[Auth Service] --> I[Exam Service]
        I --> J[Question Service]
        J --> K[Results Service]
        K --> L[Notification Service]
    end
    
    subgraph "Global Distribution"
        M[Multi-Region Deployment] --> N[Edge Locations]
        N --> O[Regional Databases]
        O --> P[Data Synchronization]
    end
    
    A --> D
    D --> H
    H --> M
    
    style A fill:#e3f2fd
    style D fill:#fff3e0
    style H fill:#e8f5e8
    style M fill:#f3e5f5
```

---

## Cara Menggunakan Diagram

### Format Mermaid
Diagram-diagram di atas menggunakan format Mermaid yang dapat di-render di:
- GitHub (otomatis)
- GitLab (otomatis)
- VS Code dengan extension Mermaid
- Online editor: https://mermaid.live/

### Export ke Format Lain
Untuk mengkonversi ke format lain:
1. **PNG/SVG**: Gunakan Mermaid CLI atau online editor
2. **PDF**: Export dari browser setelah render
3. **Draw.io**: Import Mermaid syntax
4. **Visio**: Manual recreation berdasarkan diagram

### Penggunaan dalam Presentasi
- Gunakan diagram 1-3 untuk overview sistem
- Diagram 4 untuk penjelasan database
- Diagram 5-6 untuk technical implementation
- Diagram 7-8 untuk security dan performance
- Diagram 9-10 untuk future planning

---

**Catatan**: Diagram ini melengkapi dokumentasi arsitektur dan dapat digunakan untuk presentasi, analisis sistem, atau sebagai referensi pengembangan.