// Mock data for VISABI ERP website

export const companyInfo = {
  name: "VISABI",
  tagline: "Seize the digitalization opportunity offered by WEB ERP",
  description: "Fast track your business on an information super highway",
  established: "2017",
  location: "India",
  email: "admin@visabitech.com",
  phone: "+91 98716 62445"
};

// Local images in public/images (faster load, no external requests)
export const heroImages = {
  main: "/images/hero-main.jpg",
  secondary: "/images/hero-secondary.jpg",
  about: "/images/hero-about.jpg"
};

export const featureImages = {
  collaboration: "/images/feature-collaboration.jpg",
  teamwork: "/images/feature-teamwork.jpg",
  analytics: "/images/feature-analytics.jpg",
  performance: "/images/feature-performance.jpg"
};

export const features = [
  {
    id: 1,
    title: "Comprehensive",
    description: "All-in-one solution for your business needs",
    icon: "layers"
  },
  {
    id: 2,
    title: "Quick to Implement",
    description: "Get up and running in no time",
    icon: "zap"
  },
  {
    id: 3,
    title: "Secure",
    description: "Enterprise-grade security for your data",
    icon: "shield"
  },
  {
    id: 4,
    title: "Flexible",
    description: "Adapts to your business processes",
    icon: "sliders"
  },
  {
    id: 5,
    title: "Scalable",
    description: "Grows with your business",
    icon: "trending-up"
  },
  {
    id: 6,
    title: "Customizable",
    description: "Tailor it to your specific needs",
    icon: "settings"
  },
  {
    id: 7,
    title: "Future Proof",
    description: "Built with latest technologies",
    icon: "rocket"
  }
];

export const benefits = [
  {
    id: 1,
    title: "Improve Productivity",
    description: "Streamlined operations across entire business with workflows and automated tasks",
    points: [
      "Streamlined operations across entire business",
      "Faster and better decision making",
      "Improved cohesiveness between staff",
      "Eliminate redundant data and errors",
      "Efficiently use mobile devices"
    ],
    icon: "activity",
    image: featureImages.performance
  },
  {
    id: 2,
    title: "Increase Profitability",
    description: "Higher revenue with improved response time and lower costs",
    points: [
      "Higher revenue with improved response time",
      "Lower cost with better procurement",
      "Reduce IT capital investments",
      "Stay updated with automatic updates",
      "Focus on growing your business"
    ],
    icon: "trending-up",
    image: featureImages.analytics
  },
  {
    id: 3,
    title: "Enhance Resilience",
    description: "Quick to implement and faster to realize value",
    points: [
      "Quick to implement with intuitive interface",
      "Easily configurable and scalable",
      "Work from anywhere and anytime",
      "Future-proofed solution",
      "Better interoperability with APIs"
    ],
    icon: "shield-check",
    image: featureImages.collaboration
  },
  {
    id: 4,
    title: "Enhance Business Relationship",
    description: "Better customer service and supplier relationships",
    points: [
      "Enhanced customer service levels",
      "Better understanding of customers",
      "Quality control for high standards",
      "Efficient procurement processes",
      "Professional supplier relationships"
    ],
    icon: "users",
    image: featureImages.teamwork
  },
  {
    id: 5,
    title: "Achieve Regulatory Compliance",
    description: "Automated processes ensure compliance",
    points: [
      "Improved statutory compliance",
      "Maintain quality standards",
      "Better visibility and transparency",
      "Automated best practices",
      "Meet regulatory requirements"
    ],
    icon: "check-circle",
    image: featureImages.analytics
  },
  {
    id: 6,
    title: "Emerging Technologies",
    description: "Utilize AI, facial recognition, and more",
    points: [
      "Facial recognition capabilities",
      "GPS location tracking",
      "AI for competitive advantage",
      "Data security with encryption",
      "High performance data centers"
    ],
    icon: "cpu",
    image: featureImages.performance
  }
];

export const erpComponents = [
  {
    id: 1,
    title: "Sales and Distribution & CRM",
    description: "Enhance your leads and customer relationship with built-in CRM. Efficiently respond to enquiries with accurate information.",
    icon: "shopping-cart",
    features: [
      "Lead and customer management",
      "Sales cycle automation",
      "Order management",
      "Multi-currency support",
      "Real-time reporting"
    ]
  },
  {
    id: 2,
    title: "Procurement & Supplier Management",
    description: "Streamline and automate global procure-to-pay process. Maximize profits by managing procurement effectively.",
    icon: "package",
    features: [
      "Supplier relationship management",
      "Purchase automation",
      "Quality control",
      "Multi-level approvals",
      "Cost optimization"
    ]
  },
  {
    id: 3,
    title: "Inventory & Warehouse Management",
    description: "Gain efficiency and accuracy with streamlined processes. Optimize inventory levels for better working capital.",
    icon: "database",
    features: [
      "Real-time inventory tracking",
      "Warehouse operations",
      "Multi-branch management",
      "Quality inspection",
      "Automated replenishment"
    ]
  },
  {
    id: 4,
    title: "Finance and Accounting",
    description: "Streamline company-wide financial processes. Gain end-to-end view for better financial planning.",
    icon: "dollar-sign",
    features: [
      "General ledger",
      "Accounts payable/receivable",
      "Cash management",
      "Multi-currency accounting",
      "Financial reporting"
    ]
  },
  {
    id: 5,
    title: "Production and Planning",
    description: "Efficiently manage production with accurate inventory and demand-supply information. Optimize production planning.",
    icon: "settings",
    features: [
      "Production planning",
      "Bill of materials",
      "MRP execution",
      "Cost estimation",
      "Quality management"
    ]
  },
  {
    id: 6,
    title: "Human Resource & Payroll",
    description: "Efficiently manage HR processes. Automate payroll with facial recognition and GPS attendance tracking.",
    icon: "users",
    features: [
      "Employee database",
      "Attendance management",
      "Payroll automation",
      "Performance appraisals",
      "Leave management"
    ]
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Major Vishal Taneja (Retd.)",
    position: "Managing Director",
    company: "Entellus Security and Allied Services India",
    content: "The ERP has enabled us to access our work from virtually anywhere by using any device like Laptop, Tabs, Mobiles, etc. This particular aspect has helped us greatly during the COVID times. Our team was able to operate from home with great ease.",
    avatar: null
  },
  {
    id: 2,
    name: "Vivek Mathur",
    position: "Director - Singapore Operations",
    company: "First Source Impex Pte. Ltd. Singapore",
    content: "We now have a better visibility of information. Crucial data during tendering process is quick to access which has helped us in being efficient and accurate to reduce sales cycle and ensure profitability. We expect to achieve ROI within a year.",
    avatar: null
  }
];

export const clients = [
  { id: 1, name: "Entellus Security", logo: null },
  { id: 2, name: "First Source Impex", logo: null },
  { id: 3, name: "Vector Infinity", logo: null },
  { id: 4, name: "Defrail", logo: null }
];

export const aboutUs = {
  intro: "Established in India in 2017, VISABI is a forward looking Information and Technology Company that aims to make a positive impact to the businesses of its clients by leading their digital transformation efforts through its innovative software products and services.",
  mission: "Partner with our clients in leading, driving and achieving their digital transformation initiatives and goals for business optimization, competitive advantage and identifying and implementing new areas of business growth through our Products and Services.",
  vision: "To be a globally benchmarked innovator and Information Technology solution provider.",
  whyUs: [
    {
      title: "Proven track record of service excellence",
      description: "We have been in business for over 10 years and have gained many happy clients by successfully helping them achieve their digital transformation goals."
    },
    {
      title: "Industry expertise",
      description: "Over the years we have gained good experience and built expertise in many different industries. This is reflected in the industry best practices built into our software products."
    },
    {
      title: "Highly experienced and motivated team",
      description: "We take pride in our highly motivated team of business, sales and support consultants who have many years of experience behind them."
    }
  ]
};

export const tradingSolution = {
  title: "Solution for Trading and Distribution",
  subtitle: "Transform your Trading and Distribution business with WEB ERP",
  intro: "Trading and Distribution industry is a key pillar in a country's economy, involved in B2B transactions in a wide range of goods. It's one of the most data-driven industries and technological advancements are transforming the way global trade is conducted.",
  challenges: [
    "Having to keep up with distribution capabilities",
    "Meet customer's compliance demands",
    "Manage shorter delivery times",
    "Global sourcing complexities",
    "Unpredictable consumer behaviours",
    "E-commerce driven changes",
    "Changes in regulations",
    "COVID-19 and global disruptions"
  ],
  solutions: [
    {
      title: "Streamlined Inventory Management",
      description: "Analyze and optimize inventory levels for better working capital allocation",
      benefits: [
        "Improved efficiency",
        "Improved financial performance",
        "Improved service levels",
        "Improved decision making"
      ]
    },
    {
      title: "Improved Service Levels",
      description: "Enhance customer relationships with built-in CRM and efficient order management",
      benefits: [
        "Increased efficiency",
        "Improved revenues",
        "Improved service levels",
        "Improved decision making"
      ]
    },
    {
      title: "Financial Management",
      description: "Streamline and automate company-wide financial processes",
      benefits: [
        "Gain financial control",
        "Improved productivity",
        "Data accuracy",
        "Improved decision making"
      ]
    },
    {
      title: "Procurement Process",
      description: "Automate procurement and supplier relationship management",
      benefits: [
        "Increased productivity",
        "Reduce costs",
        "Improved decision making",
        "Competitive advantage"
      ]
    }
  ]
};

export const securitySolution = {
  title: "Solution for Private Security and Allied Services",
  subtitle: "Transform your private security business with WEB ERP",
  intro: "Private security industry is crucial in providing safe environments. It's one of the largest sources of employment, particularly from rural and semi-urban areas.",
  challenges: [
    "Lack of quality manpower",
    "High attrition rates",
    "Difficulty in decision making",
    "Compliance issues",
    "Competition pressures",
    "Inefficient HR management",
    "Error-prone attendance systems",
    "Complex payroll calculations"
  ],
  solutions: [
    {
      title: "HR & Payroll Management",
      description: "Manage human resources efficiently with automated payroll and attendance",
      benefits: [
        "Improved efficiency",
        "Improved compliance",
        "Improved decision making",
        "Competitive advantage"
      ]
    },
    {
      title: "Financial Management",
      description: "Automate accounting processes for better financial control",
      benefits: [
        "Gain financial control",
        "Improved productivity",
        "Data accuracy",
        "Improved decision making"
      ]
    },
    {
      title: "Customer Service",
      description: "Built-in CRM and customer portal for better service delivery",
      benefits: [
        "Increased efficiency",
        "Improved revenues",
        "Improved service levels",
        "Improved decision making"
      ]
    },
    {
      title: "Procurement & Inventory",
      description: "Streamline procurement with supplier management",
      benefits: [
        "Increased productivity",
        "Reduce costs",
        "Improved decision making",
        "Competitive advantage"
      ]
    }
  ]
};

export const successStories = [
  {
    id: 1,
    slug: "entellus",
    title: "Entellus beats COVID restrictions",
    subtitle: "Achieves ERP goals smoothly and timely",
    client: "Entellus Security and Allied Services",
    services: [
      "Security Services",
      "Housekeeping Services",
      "Management Support Services",
      "Maintenance Services",
      "Fire Prevention Services"
    ],
    image: featureImages.collaboration,
    link: "/success-stories/entellus"
  },
  {
    id: 2,
    slug: "global-hi-tech",
    title: "Global hi-tech trading transformation",
    subtitle: "Transforms Supply Chain management",
    client: "First Source Impex Pte. Ltd.",
    services: [
      "Defense Products",
      "Power Solutions",
      "Space Technology",
      "Aerospace Components",
      "Metal Supplies"
    ],
    image: featureImages.analytics,
    link: "/success-stories/global-hi-tech"
  },
  {
    id: 3,
    slug: "vector",
    title: "Vector achieves operational excellence",
    subtitle: "Excellence in HR and Payroll management",
    client: "Vector Infinity LLP",
    services: [
      "Security Services",
      "Housekeeping Services",
      "Management Support",
      "Maintenance Services",
      "Fire Prevention"
    ],
    image: featureImages.performance,
    link: "/success-stories/vector"
  }
];

export const contactInfo = {
  callToActions: [
    {
      id: 1,
      title: "Request a Call Back",
      description: "Let us know if you would like us to call you back on any queries",
      icon: "phone"
    },
    {
      id: 2,
      title: "Request a Demo",
      description: "Free consultation for your business and a demo of our product",
      icon: "monitor"
    },
    {
      id: 3,
      title: "Free Product Tour",
      description: "Get a feel of our product from this interactive tour",
      icon: "compass"
    },
    {
      id: 4,
      title: "Request Information",
      description: "Send us suggestions, questions or requests about our product",
      icon: "mail"
    }
  ]
};

export const navigationMenu = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { 
    name: "Solutions", 
    path: "/solutions",
    submenu: [
      { name: "Trading & Distribution", path: "/solutions/trading" },
      { name: "Private Security", path: "/solutions/security" }
    ]
  },
  { name: "Success Stories", path: "/success-stories" },
  { name: "Contact", path: "/contact" }
];
