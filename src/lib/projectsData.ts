export interface Project {
  slug: string;
  title: string;
  category: "Automation" | "Frontend" | "Full-Stack" | "Mobile";
  description: string;
  tech: string[];
  features: string[];
  githubUrl: string;
  liveUrl: string;
  icon: string; // Lucide icon name mapping
  challenge: string;
  solution: string;
  outcomes: string[];
  duration: string;
  role: string;
}

export const projectsData: Project[] = [
  {
    slug: "upwork-discord-bot",
    title: "Upwork Discord Bot",
    category: "Automation",
    description: "An advanced automation system that scrapes Upwork jobs in real-time and routes them to Discord threads. Bypasses Cloudflare using headless browser token extraction and utilizes GraphQL for high-speed data fetching.",
    tech: ["Python", "Discord.py", "GraphQL", "Selenium", "SQLite", "Docker"],
    features: [
      "Real-time Upwork job feed scraping",
      "Cloudflare bypass via automated cookie synchronization",
      "Staggered GraphQL search queries to avoid IP throttling",
      "Discord thread sorting and custom filtered channels"
    ],
    githubUrl: "https://github.com/kareemsarwar82/Upword_Discord_Bot",
    liveUrl: "",
    icon: "Bot",
    challenge: "Upwork's API changes and Cloudflare anti-bot checks made traditional REST scrapers break within minutes. There was also a significant latency lag when fetching new feeds, causing developers to miss early bidding opportunities.",
    solution: "Developed a hybrid system combining Selenium for headless browser authentication synchronization with direct GraphQL queries utilizing the active cookies. Configured a background crontab scheduler inside a Dockerized container to sync active session keys automatically.",
    outcomes: [
      "Achieved sub-10 second latency between job posting and Discord delivery.",
      "Runs 24/7 without manual authentication resets for up to 30 days.",
      "Utilized by multiple freelance agencies to double their lead conversion rates."
    ],
    duration: "2 Months",
    role: "Lead Automation Engineer"
  },
  {
    slug: "ai-saas-platform",
    title: "OmniMind AI SaaS",
    category: "Full-Stack",
    description: "A premium multi-tenant AI content production workspace with subscription model support, stripe checkout integration, dynamic usage dashboards, and drag-and-drop workspace configurations.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "OpenAI", "Stripe"],
    features: [
      "Multi-tenant user authentication & team roles",
      "Dynamic token-based usage analytics & visualizations",
      "Stripe payment checkout and auto-recurring subscriptions",
      "Real-time AI text and image generation layouts"
    ],
    githubUrl: "#",
    liveUrl: "https://omnimind-ai-demo.vercel.app",
    icon: "Globe",
    challenge: "Managing low-latency streaming responses from OpenAI while maintaining strict user token quotas and accounting for multiple concurrent workspace edits.",
    solution: "Designed an edge-optimized route structure leveraging Next.js API Routes for streaming LLM completions. Integrated a Redis-based token bucket rate limiter and linked it to database schema constraints in PostgreSQL using Prisma.",
    outcomes: [
      "Average API response time reduced by 40% via edge functions.",
      "100% accurate token quota tracking across concurrent operations.",
      "Stripe webhooks securely handle subscription updates instantly."
    ],
    duration: "3 Months",
    role: "Full-Stack Architect"
  },
  {
    slug: "ecommerce-inventory-engine",
    title: "E-Commerce Stock Sync",
    category: "Automation",
    description: "High-performance pricing and inventory engine syncing products across Shopify, Amazon, and WooCommerce. Processes up to 50,000 skus per hour with queue-based job scheduling.",
    tech: ["React", "Node.js", "Redis", "Puppeteer", "AWS", "Shopify API"],
    features: [
      "Multi-channel inventory price comparison",
      "BullMQ redis backpressure queue processing",
      "PDF invoice auto-generation and email delivery",
      "Admin monitoring panel with live sync metrics"
    ],
    githubUrl: "#",
    liveUrl: "",
    icon: "ShieldCheck",
    challenge: "Handling API rate limit locks from Shopify and Amazon when pushing bulk updates, especially during peak traffic periods when stocks fluctuated rapidly.",
    solution: "Built a robust rate-limit aware request manager in Node.js. Used Redis queue groups (BullMQ) to space out execution tasks dynamically according to API weight headers returned in response streams.",
    outcomes: [
      "Successfully synced 50k+ items hourly without triggering rate limit blocks.",
      "Zero stock out discrepancies reported over a 6-month trial window.",
      "Alert notification system fires SMS messages within 5s of sync errors."
    ],
    duration: "3 Months",
    role: "Backend Developer"
  },
  {
    slug: "apex-dashboard-ui",
    title: "Apex Analytics Workspace",
    category: "Frontend",
    description: "A dark-mode first, glassmorphism dashboard designed for cryptocurrency and stock traders. Features real-time charts, transaction logs, and custom widgets.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Framer Motion"],
    features: [
      "Full dark mode layout with custom glassmorphic styling tokens",
      "Smooth micro-interactions on grid resize and drag actions",
      "Live WebSocket feed integration for price indices",
      "Interactive data charts and customizable grids"
    ],
    githubUrl: "#",
    liveUrl: "https://apex-analytics-demo.vercel.app",
    icon: "Layout",
    challenge: "Rendering multiple high-frequency data chart instances without introducing frame-rate drops or layout shift on slow devices.",
    solution: "Used component memoization, dynamic state isolation, and deferred drawing for chart cards. Optimized canvas rendering paths in Recharts to prevent unnecessary DOM redraw loops.",
    outcomes: [
      "Maintained 60fps animations even when rendering 4 live charts concurrently.",
      "Achieved a 98/100 Lighthouse Performance score.",
      "Fully responsive down to 320px screen widths."
    ],
    duration: "1.5 Months",
    role: "Frontend Engineer"
  }
];
