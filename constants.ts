import { Course } from "./types";

export const COURSES: Course[] = [
  {
    id: 'devops',
    title: 'DevOps Engineering',
    description: 'Master the art of deployment, scaling, and automation. Become the bridge between development and operations.',
    icon: 'server',
    duration: '3-4 Months',
    level: 'Beginner to Advanced',
    modules: [
      {
        title: 'Foundation',
        topics: ['Linux Essentials', 'Shell Scripting', 'Git Version Control']
      },
      {
        title: 'CI/CD & Cloud',
        topics: ['Jenkins Pipelines', 'AWS Cloud Infrastructure', 'Docker Containerization']
      },
      {
        title: 'Orchestration & IaC',
        topics: ['Kubernetes (K8s)', 'Ansible Configuration Mgmt', 'Terraform (IaC)']
      },
      {
        title: 'Monitoring',
        topics: ['Prometheus', 'Grafana', 'System Observability']
      }
    ]
  },
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    description: 'Build modern, scalable web applications from scratch using the MERN stack and latest web technologies.',
    icon: 'code',
    duration: '4-5 Months',
    level: 'Beginner to Professional',
    modules: [
      {
        title: 'Frontend Fundamentals',
        topics: ['HTML5 & CSS3', 'Responsive Design', 'Bootstrap 5', 'JavaScript (ES6+)']
      },
      {
        title: 'Backend Engineering',
        topics: ['Node.js Runtime', 'Express.js Framework', 'RESTful API Design']
      },
      {
        title: 'Database Management',
        topics: ['MySQL (Relational)', 'MongoDB (NoSQL)', 'JSON Data Handling']
      },
      {
        title: 'Modern UI Frameworks',
        topics: ['React.js', 'State Management', 'Hooks & Component Lifecycle']
      }
    ]
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Vikram Malhotra",
    role: "DevOps Engineer @ TechFlow",
    text: "Spark Logic's hands-on approach to Kubernetes and Terraform changed my career trajectory. The placement assistance was genuine and effective."
  },
  {
    id: 2,
    name: "Ananya Gupta",
    role: "Full Stack Developer @ InnovateInc",
    text: "I went from knowing zero coding to building full MERN stack apps. The mentors are incredibly supportive and knowledgeable."
  }
];