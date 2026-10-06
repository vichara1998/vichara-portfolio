import resumeUrl from "./assets/Vicharana_Tharkana_CV.pdf";

import exploreCityImage1 from "../projects-ss/exploreCity/optimized/1.jpg";
import exploreCityImage2 from "../projects-ss/exploreCity/optimized/2.jpg";
import exploreCityImage3 from "../projects-ss/exploreCity/optimized/3.jpg";
import exploreCityImage4 from "../projects-ss/exploreCity/optimized/4.jpg";
import exploreCityImage5 from "../projects-ss/exploreCity/optimized/5.jpg";
import careerPathImage1 from "../projects-ss/career-path/optimized/1.jpg";
import careerPathImage2 from "../projects-ss/career-path/optimized/2.jpg";
import careerPathImage3 from "../projects-ss/career-path/optimized/3.jpg";
import careerPathImage4 from "../projects-ss/career-path/optimized/4.jpg";
import careerPathImage5 from "../projects-ss/career-path/optimized/5.jpg";
import careerPathImage6 from "../projects-ss/career-path/optimized/6.jpg";
import careerPathImage7 from "../projects-ss/career-path/optimized/7.jpg";
import careerPathImage8 from "../projects-ss/career-path/optimized/8.jpg";
import careerPathImage9 from "../projects-ss/career-path/optimized/9.jpg";
import careerPathImage10 from "../projects-ss/career-path/optimized/10.jpg";
import careerPathImage11 from "../projects-ss/career-path/optimized/11.jpg";
import careerPathImage12 from "../projects-ss/career-path/optimized/12.jpg";
import careerPathImage13 from "../projects-ss/career-path/optimized/13.jpg";
import chatbotImage1 from "../projects-ss/chat-botAI/optimized/1.jpg";
import chatbotImage2 from "../projects-ss/chat-botAI/optimized/2.jpg";
import chatbotImage3 from "../projects-ss/chat-botAI/optimized/3.jpg";
import chatbotImage4 from "../projects-ss/chat-botAI/optimized/4.jpg";
import chatbotImage5 from "../projects-ss/chat-botAI/optimized/5.jpg";
import chatbotImage6 from "../projects-ss/chat-botAI/optimized/6.jpg";
import chatbotImage7 from "../projects-ss/chat-botAI/optimized/7.jpg";
import vcsImage1 from "../projects-ss/vcs/VCS_card.png";
import vcsImage2 from "../projects-ss/vcs/VCS 1.png";
import vcsImage3 from "../projects-ss/vcs/VCS 2.png";
import vcsImage4 from "../projects-ss/vcs/VCS 3.png";


export const PERSONAL = {
  name: "Vichara Tharkana",
  initials: "VT",
  title: "Software Engineering Undergraduate",
  tagline: "Building the future,\none line of code at a time.",
  bio: "I'm a Software Engineering undergraduate at The Open University of Sri Lanka with a strong foundation in Java and backend development. I've built Android applications using Java and SQLite, developed web platforms with HTML, CSS, JavaScript, PHP, and MySQL, and gained hands-on experience with IoT systems. I'm a quick learner passionate about clean code, problem-solving, and applying modern Java technologies across diverse real-world projects. Actively seeking an internship to contribute to a fast-paced, collaborative team.",
  email: "tharkana98@gmail.com",
  phone: "+94 76 156 3214",
  location: "Bandarawela, Sri Lanka",
  availability: "Actively Seeking Internship Opportunities",
  // photo: "./src/assets/profile.jpg",
  photo: "./profile.jpg",
  // resumeUrl:
  //   "https://drive.google.com/file/d/1eHqeKbNiDKFND9JOyaOM8_21mNP7WbBY/view?usp=sharing",
  resumeUrl,
  socials: {
    github: "https://github.com/vichara1998",
    linkedin: "https://www.linkedin.com/in/vichara-tharkana-384b222a2",
    facebook: "https://www.facebook.com/vichara.tharkana",
  },
};

export const SKILLS = [
  {
    category: "Languages",
    icon: "⌨️",
    color: "electric",
    items: [
      { name: "Java", level: 82 },
      { name: "JavaScript", level: 75 },
      { name: "PHP", level: 70 },
      { name: "HTML & CSS", level: 80 },
      { name: "SQL", level: 75 },
    ],
  },
  {
    category: "Frameworks & Tools",
    icon: "🔧",
    color: "violet",
    items: [
      { name: "Android Studio", level: 78 },
      { name: "Spring Boot", level: 60 },
      { name: "React", level: 65 },
      { name: "Express.js", level: 65 },
      { name: "Git", level: 75 },
      { name: "MySQL / SQLite", level: 78 },
    ],
  },
  {
    category: "Core Concepts",
    icon: "🧠",
    color: "teal",
    items: [
      { name: "OOP Principles", level: 82 },
      { name: "RESTful APIs", level: 65 },
      { name: "Android Dev", level: 78 },
      { name: "Database Design", level: 75 },
      { name: "IoT Systems", level: 68 },
      { name: "Problem Solving", level: 85 },
    ],
  },
];

export const PROJECTS = [
  {
    id: 5,
    title: "CareerPath Sri Lanka",
    description:
      "A career and education guidance platform helping learners across Sri Lanka discover courses and plan their next step.",
    longDescription:
      "Built a responsive platform connecting learners with courses and education providers across Sri Lanka. Learners can search and compare course details, create a profile, and request personalized career recommendations based on their qualifications, interests, skills, and goals. Providers can submit and manage course listings, while administrators review submissions and oversee users. An optional Gemini-powered career assistant complements built-in guidance.",
    highlights: [
      "Course discovery with search and filters for course type, study mode, district, and fee",
      "Personalized pathways based on learner qualifications, interests, skills, and goals",
      "Separate learner, provider, and administrator workflows with role-based authorization",
      "Optional Gemini career assistant with built-in guidance when AI is not configured",
      "Responsive React frontend backed by a Spring Boot REST API and MySQL",
    ],
    tech: [
      "React ",
      "Spring Boot ",
      "Java ",
      "MySQL ",
      "Redux Toolkit",
      "Spring Security",
      "JWT",
      "Gemini API",
    ],
    categories: ["Web", "AI"],
    images: [
      careerPathImage1,
      careerPathImage2,
      careerPathImage3,
      careerPathImage4,
      careerPathImage5,
      careerPathImage6,
      careerPathImage7,
      careerPathImage8,
      careerPathImage9,
      careerPathImage10,
      careerPathImage11,
      careerPathImage12,
      careerPathImage13,
    ],
    color: "#0EA5E9",
    emoji: "🎓",
    github: "https://github.com/vichara1998/careerpath-platform",
    demo: null,
    featured: true,
  },
  {
    id: 1,
    title: "Gemini-Powered E-Commerce Chatbot",
    year: "2025",
    description:
      "An AI-powered chatbot for e-commerce customer support, providing intelligent and automated assistance for users.",
    longDescription:
      "Developed an AI-powered chatbot for e-commerce customer support to provide intelligent and automated assistance for users. Implemented Retrieval-Augmented Generation (RAG) using Astra DB to improve response accuracy using external knowledge sources. Enabled smart responses for order tracking, shipping updates, and product-related queries with high contextual relevance. Integrated conversation memory to maintain context across multiple user interactions for a more natural chat experience.",
    highlights: [
      "Implemented RAG architecture using Astra DB for accurate, knowledge-grounded responses",
      "Smart handling of order tracking, shipping updates, and product queries",
      "Conversation memory for natural, context-aware multi-turn chats",
      "Built on Next.js with TypeScript for a modern, scalable frontend",
    ],
    tech: ["Next.js", "TypeScript", "Google Gemini API", "Astra DB"],
    categories: ["AI", "Web"],
    images: [
      chatbotImage1,
      chatbotImage2,
      chatbotImage3,
      chatbotImage4,
      chatbotImage5,
      chatbotImage6,
      chatbotImage7,
    ],
    color: "#D76F02",
    emoji: "🤖",
    github: "https://github.com/vichara1998/gemini-ecommerce-assistant",
    demo: null,
    featured: true,
  },
  {
    id: 2,
    title: "Explore City Android Application",
    year: "2023",
    description:
      "An interactive mobile app to help users explore cities with compass and Google Maps navigation.",
    longDescription:
      "Built an interactive mobile application designed to help users explore cities with an intuitive and user-friendly interface. Integrated compass and Google Maps navigation features to provide accurate direction and real-time location guidance. Enhanced overall user experience by enabling smooth, location-based exploration and easy access to nearby places.",
    highlights: [
      "Real-time compass integration for accurate directional guidance",
      "Google Maps API for live navigation and nearby place discovery",
      "Local data persistence using SQLite for offline access",
      "Clean, intuitive UI focused on smooth location-based exploration",
    ],
    tech: ["Android Studio", "Java", "Google Maps API", "SQLite"],
    categories: ["Mobile"],
    images: [
      exploreCityImage1,
      exploreCityImage2,
      exploreCityImage3,
      exploreCityImage4,
      exploreCityImage5,
    ],
    color: "#FAA718",
    emoji: "🗺️",
    github: "https://github.com/vichara1998/explore-city",
    demo: null,
    featured: true,
  },
  {
    id: 3,
    title: "Vehicle Care System (Web Application)",
    year: "2024",
    description:
      "A web-based platform for vehicle maintenance services, streamlining bookings and service management.",
    longDescription:
      "Developed a web-based platform for vehicle maintenance services to streamline service booking and management processes. Implemented database integration to efficiently manage service records, user data, and maintenance history. Designed user interaction features to improve accessibility and ensure smooth communication between users and service providers.",
    highlights: [
      "Full database integration for service records and user/maintenance history",
      "Service booking and management workflow for vehicle owners",
      "Improved accessibility with user-friendly interaction design",
      "Built collaboratively as a team project with PHP and MySQL backend",
    ],
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    categories: ["Web"],
    images: [
      vcsImage1,
      vcsImage2,
      vcsImage3,
      vcsImage4,
    ],
    color: "#FCCF46",
    emoji: "🚗",
    github: "https://github.com/vichara1998/vehicle-care-system",
    demo: null,
    featured: true,
  },
  {
    id: 4,
    title: "Chronic Kidney Disease Prediction System",
    year: "2025",
    description:
      "A Neural Network-based system to predict Chronic Kidney Disease using patient clinical data, achieving 98.75% accuracy.",
    longDescription:
      "Developed a Neural Network-based system to predict Chronic Kidney Disease using patient clinical data. Performed data preprocessing, including missing value handling, categorical encoding, and feature scaling. Built and trained a TensorFlow/Keras model, achieving 98.75% test accuracy. Designed an interactive prediction interface using Gradio for real-time disease prediction. Visualized training accuracy and loss curves for model performance evaluation.",
    highlights: [
      "Achieved 98.75% test accuracy with a TensorFlow/Keras neural network",
      "Full data preprocessing pipeline: missing values, encoding, feature scaling",
      "Interactive real-time prediction interface built with Gradio",
      "Visualized training accuracy and loss curves for performance evaluation",
    ],
    tech: ["Python", "TensorFlow", "Keras", "Scikit-learn", "Gradio"],
    categories: ["AI", "Data"],
    images: [],
    color: "#D76F02",
    emoji: "🩺",
    github: "https://github.com/vichara1998/chronic-kidney-disease-prediction",
    demo: null,
    featured: true,
  },
];

export const EXPERIENCE = [
  {
    id: 1,
    role: "Seeking Software Engineering Internship",
    company: "Open to Opportunities",
    duration: "2025 — Present",
    location: "Sri Lanka (On-site / Remote)",
    type: "seeking",
    description:
      "Actively looking for an internship where I can apply my Java, Android, and web development skills in a real-world, collaborative environment.",
    highlights: [
      "Strong foundation in Java OOP and Android application development",
      "Experience building full-stack web projects with PHP, JavaScript, and MySQL",
      "Hands-on project work with IoT systems using Arduino and Express.js",
      "Quick learner with a passion for clean, maintainable code and teamwork",
    ],
    color: "#D76F02",
  },
];

export const EDUCATION = {
  school: "The Open University of Sri Lanka",
  degree: "Bachelor of Software Engineering (Hons) — Undergraduate",
  graduation: "2021 – Present",
  gpa: 3.039,
  secondarySchool: "St. Joseph's College, Bandarawela",
  secondaryQual: "G.C.E. Advanced Level — Physical Science (3S's)",
  secondaryYear: "2017",
  relevant: [
    "Java Programming",
    "Android Application Development",
    "Database Management (MySQL / SQLite)",
    "Web Technologies (HTML, CSS, JS, PHP)",
    "Spring Boot & RESTful APIs",
    "Software Engineering Principles",
    "IoT Systems & Embedded Computing",
  ],
  activities: [
    "Advanced Java Certificate — University of Sabaragamuwa",
    "Certificate in English — University of Sabaragamuwa",
    "Languages: English, Sinhala",
  ],
};

export const SOFT_SKILLS = [
  "Problem Solving",
  "Teamwork",
  "Creativity",
  "Communication",
  "Leadership",
  "Adaptability",
];

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Career", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
