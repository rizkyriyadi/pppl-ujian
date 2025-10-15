export interface Student {
  id: string;
  name: string;
  nisn: string;
  class: string;
  createdAt: Date;
}

export interface Question {
  id: string;
  questionText: string;
  questionNumber: number;
  options: string[];
  correctAnswer: number;
  subject: string;
  difficulty?: string;
  explanation?: string;
  imageUrl?: string;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  subject: string;
  grade: number;
  duration: number; // in minutes
  totalQuestions: number;
  passingScore: number;
  questions: Question[];
  createdAt: Date;
  isActive: boolean;
  createdBy?: string;
  scheduledDate?: Date;
}

export interface ExamAttempt {
  id: string;
  examId: string;
  examTitle: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  answers: { [questionId: string]: number };
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unanswered: number;
  timeSpent: number;
  isPassed: boolean;
  startedAt: Date;
  submittedAt: Date;
  status: string;
}
