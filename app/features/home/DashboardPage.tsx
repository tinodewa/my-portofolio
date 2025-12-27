'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Home, 
  User, 
  Briefcase, 
  Mail, 
  Phone, 
  Linkedin,
  Code, 
  Layers, 
  GraduationCap,
  Users,
  LucideIcon,
  ExternalLink,
  Github
} from 'lucide-react';

// --- Type Definitions ---
type Tab = 'home' | 'about' | 'projects';

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  iconBg: string; // For placeholder background color
}

interface Experience {
  company: string;
  role: string;
  period: string;
  details: string[];
}

interface Education {
  school: string;
  degree: string;
  major: string;
  period: string;
  gpa: string;
}

interface Organization {
  name: string;
  role: string;
  period: string;
  description: string[];
}

// --- Data Source (Extracted from PDF) ---
const PORTFOLIO_DATA = {
  personal: {
    name: "Tino Dewa Anggara",
    title: "Mobile Application Developer",
    email: "tinodewaanggara@gmail.com",
    phone: "+6282143440485",
    whatsapp: "https://wa.me/6282143440485",
    linkedin: "https://www.linkedin.com/in/tinoanggara",
    website: "https://tino-anggara.vercel.app/",
    github: "https://github.com/tinodewa",
    shortIntro: "Mobile Application Developer specializing in Android Jetpack and Flutter, ensuring consistent user experiences across platforms.",
    fullSummary: "Mobile Application Developer with a Bachelor of Informatics Engineering and professional experience spanning the full development lifecycle, from design concepts to production releases. I specialize in building robust applications using both Android Jetpack and Flutter. Combining strong analytical skills with a certified background in Multi-Platform and Back-End Development, I apply SOLID principles to prioritize clean code, modular architecture, and efficient state management to create scalable solutions in collaborative team environments."
  },
  skills: [
    "Kotlin (Native, Jetpack Compose)", 
    "Java (Native)", 
    "Dart (Flutter)", 
    "XML",
    "Android Studio", 
    "VSCode", 
    "Firebase", 
    "TensorFlow", 
    "Sentry", 
    "Git",
    "Postman",
    "SQLite"
  ],
  experience: [
    {
      company: "Venturo Pro",
      role: "Mobile Developer",
      period: "March 2025 - Present",
      details: [
        "Built responsive, declarative user interfaces using Jetpack Compose to improve maintainability and performance.",
        "Developed custom camera modules using CameraX, ensuring high-quality image capture across diverse hardware.",
        "Integrated TensorFlow Lite (TFLite) for low-latency, on-device inference.",
        "Collaborated with back-end teams to design unified data models across Android, iOS, and Web."
      ]
    },
    {
      company: "Venturo Pro",
      role: "Flutter Developer Internship",
      period: "October 2024 - January 2025",
      details: [
        "Transformed UI/UX designs into responsive Flutter widgets.",
        "Implemented complex logic for production-ready releases.",
        "Prioritized clean code and modular folder organization utilizing GetX for state management.",
        "Streamlined data flow by efficiently consuming RESTful APIs using Dio/HTTP."
      ]
    },
    {
      company: "Dicoding Indonesia",
      role: "Merdeka Certified Independent Studies - Multi-Platform & Back-End",
      period: "August 2022 - December 2022",
      details: [
        "Developed and enhanced existing web-based systems using CodeIgniter.",
        "Integrated VClaim BPJS bridging for seamless connectivity with health insurance services.",
        "Maintained web-based systems to ensure optimal performance."
      ]
    },
    {
      company: "Illiyin Studio",
      role: "Android Developer",
      period: "July 2020 - March 2022",
      details: [
        "Transformed high-fidelity designs into responsive and interactive Android interfaces.",
        "Partnered with senior engineers to integrate RESTful APIs.",
        "Proactively identified and resolved critical bugs to enhance application speed."
      ]
    }
  ] as Experience[],
  education: {
    school: "Sekolah Tinggi Informatika & Komputer Indonesia (STIKI)",
    degree: "Bachelor Degree",
    major: "Computer Science",
    period: "2020 - 2024",
    gpa: "3.64/4.00"
  } as Education,
  organization: [
    {
      name: "STIKI Basketball Society Team",
      role: "General Chairman",
      period: "April 2023 - May 2024",
      description: [
        "Directed the student activity unit and managed board members.",
        "Acted as primary liaison between students and campus institutions.",
        "Managed comprehensive budgets and assisted in drafting formal proposals."
      ]
    },
    {
      name: "STIKI Basketball League",
      role: "Person-in-Charge of Equipment",
      period: "September 2023 - February 2024",
      description: [
        "Led equipment team in managing technical assets for a large-scale league.",
        "Liaised with local authorities for security permits.",
        "Established systematic processes for resource distribution."
      ]
    }
  ] as Organization[],
  projects: [
    {
      id: 1,
      title: "Sequre Product Authentication App",
      description: "A specialized security project designed for product authentication, integrating high-speed hardware scanning with machine learning. Features instant QR code scanning, counterfeit detection using TensorFlow Lite, and suspicious item flagging.",
      techStack: ["Android Studio", "Kotlin", "TensorFlow", "SQLite", "Postman"],
      iconBg: "/sequre.png"
    },
    {
      id: 2,
      title: "Kiosk-Based Service Application",
      description: "A specialized hardware-software solution for public-facing terminals. Features high-performance image capture using Camera2/CameraX, touch-screen navigation, background task scheduling with WorkManager, and automated service workflows.",
      techStack: ["Android Studio", "Kotlin", "Firebase", "CameraX", "SQLite"],
      iconBg: "/kiosk.png"
    },
    {
      id: 3,
      title: "RT Online",
      description: "A community-focused management project to streamline residential administration. Features citizen contribution management, cash flow monitoring, real-time error monitoring with Sentry, and secure transaction approvals.",
      techStack: ["Flutter", "Dart", "GetX", "Sentry", "VSCode"],
      iconBg: "/rt_online_icon.webp"
    }
  ] as Project[]
};

// --- Components ---

const ContactItem = ({ icon: Icon, text, href, label }: { icon: LucideIcon, text: string, href: string, label: string }) => (
  <a 
    href={href} 
    target={href.startsWith('http') ? "_blank" : undefined}
    rel="noopener noreferrer"
    className="flex items-center gap-3 p-4 bg-slate-800 rounded-xl shadow-sm hover:shadow-md hover:shadow-blue-900/20 transition-all border border-slate-700 hover:border-blue-500/50 group"
  >
    <div className="p-3 bg-blue-900/30 text-blue-400 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
      <Icon size={20} />
    </div>
    <div className="flex flex-col">
      <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">{label}</span>
      <span className="text-slate-200 font-medium break-all">{text}</span>
    </div>
    {href.startsWith('http') && <ExternalLink size={16} className="ml-auto text-slate-500 group-hover:text-blue-400" />}
  </a>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
    <div className="h-8 w-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
    {children}
  </h2>
);

const TechBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm font-medium border border-slate-700 hover:border-blue-500/50 hover:text-blue-200 transition-colors">
    {children}
  </span>
);

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-8 md:p-12 text-white shadow-xl shadow-black/20 relative overflow-hidden border border-slate-800">
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <Code size={200} />
              </div>
              <div className="relative z-10">
                <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4 border border-white/20 text-blue-200">
                  Welcome to my portfolio
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">
                  {PORTFOLIO_DATA.personal.name}
                </h1>
                <p className="text-xl md:text-2xl text-blue-200 mb-6 font-light">
                  {PORTFOLIO_DATA.personal.title}
                </p>
                <p className="max-w-2xl text-slate-300 leading-relaxed text-lg mb-8">
                  {PORTFOLIO_DATA.personal.shortIntro}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => setActiveTab('projects')}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/50 border border-transparent hover:border-blue-400"
                  >
                    View My Projects
                  </button>
                  <button 
                    onClick={() => setActiveTab('about')}
                    className="px-6 py-3 bg-slate-800/50 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors border border-slate-600"
                  >
                    More About Me
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ContactItem 
                icon={Mail} 
                label="Email"
                text={PORTFOLIO_DATA.personal.email} 
                href={`mailto:${PORTFOLIO_DATA.personal.email}`} 
              />
              <ContactItem 
                icon={Phone} 
                label="Phone"
                text={PORTFOLIO_DATA.personal.phone} 
                href={PORTFOLIO_DATA.personal.whatsapp} 
              />
              <ContactItem 
                icon={Linkedin} 
                label="LinkedIn"
                text="linkedin.com/in/tinoanggara" 
                href={PORTFOLIO_DATA.personal.linkedin} 
              />
              <ContactItem 
                icon={Github} 
                label="Github"
                text="tinodewa"
                href={PORTFOLIO_DATA.personal.github}
              />
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Intro */}
            <div className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
              <SectionTitle>About Me</SectionTitle>
              <p className="text-slate-300 leading-relaxed text-lg">
                {PORTFOLIO_DATA.personal.fullSummary}
              </p>
            </div>

            {/* Experience */}
            <div>
              <SectionTitle>Work Experience</SectionTitle>
              <div className="space-y-6">
                {PORTFOLIO_DATA.experience.map((exp, idx) => (
                  <div key={idx} className="bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-800 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-900 group-hover:bg-blue-500 transition-colors"></div>
                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-2">
                      <div>
                        <h3 className="text-xl font-bold text-slate-100">{exp.role}</h3>
                        <div className="text-blue-400 font-medium flex items-center gap-2">
                          <Briefcase size={16} />
                          {exp.company}
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-full text-sm font-medium border border-slate-700 whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {exp.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-3 text-slate-300">
                          <span className="mt-2 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                          <span className="leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Education */}
              <div>
                <SectionTitle>Education</SectionTitle>
                <div className="bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-800 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-indigo-900/30 text-indigo-400 rounded-lg border border-indigo-500/20">
                      <GraduationCap size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-100">{PORTFOLIO_DATA.education.school}</h3>
                      <p className="text-indigo-400 font-medium">{PORTFOLIO_DATA.education.major}</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-slate-400">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span>Degree</span>
                      <span className="font-medium text-slate-200">{PORTFOLIO_DATA.education.degree}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span>Period</span>
                      <span className="font-medium text-slate-200">{PORTFOLIO_DATA.education.period}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GPA</span>
                      <span className="font-medium text-green-400">{PORTFOLIO_DATA.education.gpa}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <SectionTitle>Technical Skills</SectionTitle>
                <div className="bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-800 h-full">
                  <div className="flex flex-wrap gap-2">
                    {PORTFOLIO_DATA.skills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-sm font-medium border border-slate-700 hover:bg-slate-800 hover:border-blue-500 hover:text-blue-400 transition-all cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-1 w-full" aria-hidden="true" />

            {/* Organizational Experience */}
            <div>
              <SectionTitle>Organizations</SectionTitle>
              <div className="grid grid-cols-1 gap-6">
                {PORTFOLIO_DATA.organization.map((org, idx) => (
                  <div key={idx} className="bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-800 hover:border-orange-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-orange-900/20 text-orange-500 rounded-lg border border-orange-500/20">
                        <Users size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-100">{org.name}</h3>
                        <p className="text-sm text-slate-400">{org.role} • {org.period}</p>
                      </div>
                    </div>
                    <ul className="space-y-1 ml-2">
                      {org.description.map((desc, dIdx) => (
                        <li key={dIdx} className="text-slate-400 text-sm pl-4 border-l-2 border-slate-800 py-1">
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
               <SectionTitle>Featured Projects</SectionTitle>
               <span className="text-slate-400 text-sm hidden md:block">3 Projects Listed</span>
            </div>
           
            <div className="grid grid-cols-1 gap-6">
              {PORTFOLIO_DATA.projects.map((project) => (
                <div key={project.id} className="bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-800 hover:shadow-md hover:shadow-black/20 hover:border-blue-500/30 transition-all group">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* App Icon */}
                    <div className="flex-shrink-0 flex justify-center md:justify-start">
                      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-lg shadow-black/30 border border-white/10 bg-slate-800">
                        <Image
                           src={project.iconBg}
                           alt={project.title}
                           fill={true}
                           className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
                        <h3 className="text-xl md:text-2xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                        {/* <div className="flex gap-2">
                           <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                             <Github size={20} />
                           </button>
                        </div> */}
                      </div>
                      
                      <p className="text-slate-400 mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.techStack.map((tech, idx) => (
                          <TechBadge key={idx}>{tech}</TechBadge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto min-h-screen flex flex-col shadow-2xl shadow-black/50 bg-slate-950 border-x border-slate-800">
        
        {/* Mobile/Header Navigation */}
        <div className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
          <div className="flex justify-center p-2">
            <nav className="flex space-x-1 bg-slate-900/50 p-1.5 rounded-xl border border-slate-800">
              {(['home', 'about', 'projects'] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 capitalize flex items-center gap-2
                    ${activeTab === tab 
                      ? 'bg-slate-800 text-blue-400 shadow-sm ring-1 ring-white/5 border border-slate-700' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}
                  `}
                >
                  {tab === 'home' && <Home size={16} />}
                  {tab === 'about' && <User size={16} />}
                  {tab === 'projects' && <Layers size={16} />}
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-grow p-4 md:p-8 bg-slate-950">
          {renderContent()}
        </main>

        {/* Footer */}
        <footer className="p-6 text-center text-slate-500 text-sm border-t border-slate-800 bg-slate-950">
          <p>© {new Date().getFullYear()} {PORTFOLIO_DATA.personal.name}.</p>
        </footer>
      </div>
    </div>
  );
}