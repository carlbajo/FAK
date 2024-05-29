const { prisma } = require("./client");

const course = [
    { name: "bachelor of science in computer science" },
    { name: "bachelor of science in information technology" },
    { name: "bachelor of science in civil engineering" },
    { name: "bachelor of science in computer engineering" },
    { name: "bachelor of science in electrical engineering" },
    { name: "bachelor of science in electronic engineering" },
    { name: "bachelor of science in mechanical engineering" },
    { name: "bachelor of early childhood education" },
    { name: "bachelor of elementary education" },
    { name: "bachelor of elementary education major in early childhood education" },
    { name: "bachelor of elementary education major in general education" },
    { name: "bachelor of elementary education major in special education" },
    { name: "bachelor of secondary education major in english" },
    { name: "bachelor of secondary education major in filipino" },
    { name: "bachelor of secondary education major in mathematics" },
    { name: "bachelor of secondary education major in science" },
    { name: "bachelor of special needs education:generalist" },
    { name: "bachelor of science in accountancy" },
    { name: "bachelor of science in business administration major in financial management" },
    { name: "bachelor of science in business administration major in management accounting" },
    { name: "bachelor of science in business administration major in marketing management" },
    { name: "bachelor of science in tourism management" },
    { name: "bachelor of arts in mass communication" },
    { name: "bachelor of science in hospitality management" },
    { name: "bachelor of science in psychology" },
    { name: "bachelor of science in nursing" },
    { name: "bachelor of science in criminology" },
    { name: "doctor of philosophy educational leadership and management" },
    { name: "master in education major in educational leadership" },
    { name: "master in education major in english language teaching" },
    { name: "master in information technology" },
    { name: "master of arts in education major in educational management" },
];

const scholarship = [
    { name: "Tertiary Education Subsidy" },
    { name: "Tulong Dunong Program" },
    { name: "Presidential Scholarship" },
]

const skills = [
  { category: "IT", name: "Programming (e.g., Java, Python, C++)" },
  { category: "IT", name: "Web Development (e.g., HTML, CSS, JavaScript)" },
  { category: "IT", name: "Database Management (e.g., SQL, MongoDB)" },
  { category: "IT", name: "Networking (e.g., TCP/IP, Routing, Switching)" },
  { category: "IT", name: "Cybersecurity (e.g., Ethical Hacking, Network Security)" },
  { category: "IT", name: "Cloud Computing (e.g., AWS, Azure, Google Cloud)" },
  { category: "IT", name: "Data Science (e.g., Machine Learning, Data Analysis)" },
  { category: "IT", name: "Software Testing and Quality Assurance" },
  { category: "IT", name: "Mobile App Development (e.g., iOS, Android)" },
  { category: "IT", name: "IT Support and Helpdesk Management" },
  { category: "Nursing", name: "Patient Assessment and Care Planning" },
  { category: "Nursing", name: "Medication Administration" },
  { category: "Nursing", name: "Wound Care Management" },
  { category: "Nursing", name: "Clinical Documentation" },
  { category: "Nursing", name: "Critical Thinking and Problem Solving" },
  { category: "Nursing", name: "Health Promotion and Disease Prevention" },
  { category: "Nursing", name: "Infection Control Procedures" },
  { category: "Nursing", name: "Patient Education and Counseling" },
  { category: "Nursing", name: "Emergency Response and CPR" },
  { category: "Nursing", name: "Ethics and Professionalism in Nursing" },
  { category: "Criminology", name: "Criminal Law and Procedure" },
  { category: "Criminology", name: "Forensic Science Techniques" },
  { category: "Criminology", name: "Crime Scene Investigation" },
  { category: "Criminology", name: "Criminal Psychology" },
  { category: "Criminology", name: "Victimology and Victim Assistance" },
  { category: "Criminology", name: "Juvenile Justice Systems" },
  { category: "Criminology", name: "Policing Strategies and Community Policing" },
  { category: "Criminology", name: "Criminal Justice Ethics" },
  { category: "Criminology", name: "Risk Assessment and Management" },
  { category: "Criminology", name: "Crime Prevention Strategies" },
  { category: "Engineering", name: "Mechanical Engineering Design" },
  { category: "Engineering", name: "Electrical Circuit Analysis" },
  { category: "Engineering", name: "Structural Analysis and Design" },
  { category: "Engineering", name: "Thermodynamics and Fluid Mechanics" },
  { category: "Engineering", name: "Engineering Mathematics" },
  { category: "Engineering", name: "CAD/CAM Software Proficiency" },
  { category: "Engineering", name: "Project Management in Engineering" },
  { category: "Engineering", name: "Materials Science and Engineering" },
  { category: "Engineering", name: "Environmental Engineering Principles" },
  { category: "Engineering", name: "Robotics and Automation" },
  { category: "Architecture", name: "Architectural Design Principles" },
  { category: "Architecture", name: "Building Information Modeling (BIM)" },
  { category: "Architecture", name: "Construction Documents and Specifications" },
  { category: "Architecture", name: "Urban Planning and Design" },
  { category: "Architecture", name: "Sustainable Architecture" },
  { category: "Architecture", name: "Interior Design Concepts" },
  { category: "Architecture", name: "Historical Preservation and Restoration" },
  { category: "Architecture", name: "Architectural Visualization Techniques" },
  { category: "Architecture", name: "Building Codes and Regulations" },
  { category: "Architecture", name: "Site Analysis and Planning" },
  { category: "Dance", name: "Ballet Technique and Performance" },
  { category: "Dance", name: "Contemporary Dance Styles" },
  { category: "Dance", name: "Jazz Dance Techniques" },
  { category: "Dance", name: "Hip Hop and Street Dance" },
  { category: "Dance", name: "Partner and Group Choreography" },
  { category: "Dance", name: "Dance History and Appreciation" },
  { category: "Dance", name: "Improvisation names" },
  { category: "Dance", name: "Physical Conditioning for Dancers" },
  { category: "Dance", name: "Stage Presence and Performance names" },
  { category: "Dance", name: "Dance Production and Event Management" },
  { category: "Arts", name: "Drawing and Sketching Techniques" },
  { category: "Arts", name: "Painting with Various Media (e.g., oil, acrylic)" },
  { category: "Arts", name: "Sculpture and 3D Art Forms" },
  { category: "Arts", name: "Printmaking Techniques" },
  { category: "Arts", name: "Mixed Media Artistry" },
  { category: "Arts", name: "Art History and Criticism" },
  { category: "Arts", name: "Color Theory and Composition" },
  { category: "Arts", name: "Digital Art and Graphic Design" },
  { category: "Arts", name: "Art Exhibition Curation and Management" },
  { category: "Arts", name: "Art Education and Community Outreach" },
  { category: "Music", name: "Music Business and Marketing" },
  { category: "Music", name: "Live Sound Engineering and Mixing" },
  { category: "Music", name: "Music Education and Pedagogy" },
  { category: "Music", name: "Stage Performance and Presence" },
  { category: "Music", name: "Music Technology and Digital Instruments" },
  { category: "Business", name: "Business Management and Leadership" },
  { category: "Business", name: "Financial Analysis and Reporting" },
  { category: "Business", name: "Marketing Strategy and Brand Management" },
  { category: "Business", name: "Entrepreneurship and Business Development" },
  { category: "Business", name: "Project Management" },
  { category: "Business", name: "Supply Chain Management" },
  { category: "Business", name: "Business Ethics and Corporate Social Responsibility" },
  { category: "Business", name: "Market Research and Analysis" },
  { category: "Business", name: "Human Resource Management" },
  { category: "Business", name: "Business Communication and Negotiation" },
  { category: "Communication", name: "Public Speaking and Presentation names" },
  { category: "Communication", name: "Written Communication (e.g., Reports, Emails)" },
  { category: "Communication", name: "Interpersonal Communication names" },
  { category: "Communication", name: "Media Production (e.g., Video, Audio)" },
  { category: "Communication", name: "Social Media Management" },
  { category: "Communication", name: "Cross-Cultural Communication" },
  { category: "Communication", name: "Conflict Resolution and Mediation" },
  { category: "Communication", name: "Journalism and News Reporting" },
  { category: "Communication", name: "Editing and Proofreading" },
  { category: "Communication", name: "Technical Writing and Documentation" }
]

async function Seed(){
  // await prisma.skill.createMany({
  //   data: skills,
  // })
    // await prisma.scholarship.createMany({
    //     data: scholarship,
    // });
    // await prisma.course.createMany({
    //     data: course,
    // });

};

Seed()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// run node prisma/seed/seed.js