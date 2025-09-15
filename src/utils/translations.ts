export const translations = {
  en: {
    // Navigation
    navAbout: 'About',
    navProjects: 'Projects',
    navCareer: 'Career',
    navServices: 'Services',
    navContact: 'Contact',
    
    // Hero Section
    heroTitle: 'Frontend Developer',
    heroSubtitle: 'Hi, I\'m Yeifran Hernandez',
    
    // About Section
    aboutTitle: 'About Me',
    aboutBio1: 'I\'m a passionate frontend developer with experience in modern web technologies. I specialize in creating interactive and responsive user interfaces using React, Svelte, and other cutting-edge frameworks.',
    aboutBio2: 'My focus is on writing clean, efficient code and delivering exceptional user experiences. I enjoy working with the latest technologies and am always eager to learn and take on new challenges.',
    aboutBio: "I'm a full-stack developer with solid experience across both frontend and backend. I work with modern technologies like Node.js, Python, and frameworks such as Flask and React, turning ideas into scalable, effective digital solutions.",
    frontend: "Frontend",
    backend: "Backend", 
    tools: "Tools",
    
    // Services
    servicesTitle: "Services",
    servicesSubtitle: "Comprehensive solutions to build modern, scalable applications with cutting-edge technologies.",
    frontendDev: "Frontend Development",
    frontendDesc: "Building modern, responsive web applications with React, Next.js, Astro, and Svelte. Focus on performance, accessibility, and user experience.",
    backendDev: "Backend Development",
    backendDesc: "Creating robust APIs and server-side applications with Node.js, Python Flask, and database management using Prisma and SQLite.",
    fullStackSolutions: "Full-Stack Solutions",
    fullStackDesc: "End-to-end web development from concept to deployment. Integrating frontend and backend with modern tools like Vercel and Docker.",
    desktopApps: "Desktop Applications",
    desktopDesc: "Developing cross-platform desktop applications with Python and Flask, packaged with PyInstaller for easy distribution.",
    
    // Projects
    projectsTitle: "Projects",
    
    // Career
    careerTitle: "Career",
    experience: "Experience",
    education: "Education",
    
    // Contact
    contactTitle: "Contact",
    contactSubtitle: "Let's work together on your next project",
    contactName: "Name",
    contactEmail: "Email",
    contactMessage: "Message",
    contactSend: "Send Message",
    contactPhone: "Phone",
    contactLocation: "Location",
    contactSuccess: "Message sent successfully!",
    contactError: "Error sending message. Please try again.",
    contactSending: "Sending..."
  },
  es: {
    // Navigation
    navAbout: "Acerca de",
    navProjects: "Proyectos",
    navCareer: "Trayectoria", 
    navServices: "Servicios",
    navContact: "Contacto",
    
    // Hero
    heroTitle: "Desarrollador Frontend",
    heroSubtitle: "Hola, soy Yeifran Hernandez",
    
    // About
    aboutTitle: "Sobre Mí",
    aboutBio1: "Soy un desarrollador frontend apasionado con experiencia en tecnologías web modernas. Me especializo en crear interfaces de usuario interactivas y responsivas usando React, Svelte y otros frameworks de vanguardia.",
    aboutBio2: "Mi enfoque está en escribir código limpio y eficiente, y entregar experiencias de usuario excepcionales. Disfruto trabajando con las últimas tecnologías y siempre estoy ansioso por aprender y asumir nuevos desafíos.",
    aboutBio: "Soy un desarrollador full-stack con amplia experiencia en el desarrollo web, tanto en el frontend como en el backend. He trabajado con tecnologías modernas como Node.js, Python y frameworks como Flask y React, transformando ideas en soluciones digitales efectivas y escalables.",
    frontend: "Frontend",
    backend: "Backend",
    tools: "Herramientas",
    
    // Services
    servicesTitle: "Servicios",
    servicesSubtitle: "Soluciones integrales para construir aplicaciones modernas y escalables con tecnologías de vanguardia.",
    frontendDev: "Desarrollo Frontend",
    frontendDesc: "Construyo aplicaciones web modernas y responsivas con React, Next.js, Astro y Svelte. Enfocado en rendimiento, accesibilidad y experiencia de usuario.",
    backendDev: "Desarrollo Backend", 
    backendDesc: "Creando APIs robustas y aplicaciones del lado del servidor con Node.js, Python Flask, y gestión de bases de datos usando Prisma y SQLite.",
    fullStackSolutions: "Soluciones Full-Stack",
    fullStackDesc: "Desarrollo web completo desde el concepto hasta el despliegue. Integrando frontend y backend con herramientas modernas como Vercel y Docker.",
    desktopApps: "Aplicaciones de Escritorio",
    desktopDesc: "Desarrollando aplicaciones de escritorio multiplataforma con Python y Flask, empaquetadas con PyInstaller para fácil distribución.",
    
    // Projects
    projectsTitle: "Proyectos",
    
    // Career
    careerTitle: "Trayectoria",
    experience: "Experiencia",
    education: "Educación",
    
    // Contact
    contactTitle: "Contacto",
    contactSubtitle: "Trabajemos juntos en tu próximo proyecto",
    contactName: "Nombre",
    contactEmail: "Correo",
    contactMessage: "Mensaje",
    contactSend: "Enviar Mensaje",
    contactPhone: "Teléfono",
    contactLocation: "Ubicación",
    contactSuccess: "¡Mensaje enviado correctamente!",
    contactError: "Error al enviar el mensaje. Inténtalo de nuevo.",
    contactSending: "Enviando..."
  }
};

export type Language = 'en' | 'es';
export type TranslationKey = keyof typeof translations.en;

export function t(key: TranslationKey, lang: Language): string {
  return translations[lang][key] || translations.en[key];
}
