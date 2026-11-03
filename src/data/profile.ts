export interface Profile {
  name: string;
  role: string;
  experienceYears: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  education: {
    degree: string;
    institution: string;
    year: string;
    location: string;
  };
  heroHeadline: string;
  heroTitle: string;
  heroDescription: string;
  summary: string;
  resumeUrl: string;
}

export const profileData: Profile = {
  name: "Vishal Singh",
  role: "Software Engineer",
  experienceYears: "4.5 Years",
  location: "Mumbai, Maharashtra, India",
  email: "iamvishal.2811@gmail.com",
  phone: "+91 8097143306",
  linkedin: "https://www.linkedin.com/in/vishalsingh3306/",
  education: {
    degree: "Bachelor of Engineering",
    institution: "University of Mumbai",
    year: "2022",
    location: "Mumbai, India",
  },
  heroHeadline: "SOFTWARE ENGINEER / 4.5 YEARS OF EXPERIENCE",
  heroTitle: "I build software systems that work beyond the happy path.",
  heroDescription:
    "I design and build frontend experiences, backend services, and data-intensive applications. My work spans system design, enterprise architecture, database engineering, and production troubleshooting.",
  summary:
    "Software Engineer with 4.5 years of experience designing, building, and supporting production systems across financial services and enterprise applications. Experienced in backend architecture, system design, API development, and end-to-end ownership of software solutions from technical design through deployment and production support. Strong focus on building reliable, maintainable, and scalable systems, ensuring data integrity, troubleshooting complex issues, and making pragmatic engineering trade-offs.",
  resumeUrl: ".resume/Vishal_Singh.pdf",
};
