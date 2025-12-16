export interface CourseModule {
  title: string;
  topics: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  modules: CourseModule[];
  duration: string;
  level: string;
}

export interface RegistrationFormData {
  id?: string;
  submittedAt?: string;
  candidateName: string;      // Matches 'Candidate Name'
  email: string;              // Matches 'Email Address'
  mobileNumber: string;       // Matches 'Mobile Number'
  whatsappNumber: string;     // Matches 'WhatsApp Number'
  qualification: string;      // Matches 'Qualification'
  yearOfPassing: string;      // Matches 'Year Of Pass Out'
  experience: string;         // Matches 'Any previous work experience...'
  referenceDetails: string;   // Matches 'Reference Details'
  courseInterest: 'devops' | 'fullstack' | 'both'; // Keep for UI context
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}