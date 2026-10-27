export interface TeamStat {
  value: string;
  label: string;
}

export interface TeamExperience {
  title: string;
  subtitle?: string;
  organization?: string;
  period?: string;
  description?: string;
  bullets?: string[];
}

export interface TeamVenture {
  name: string;
  tag: string;
  description: string;
}

export interface TeamStrength {
  title: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  roleBadge: string;
  kicker: string;
  shortIntro: string;
  image: string;
  objectPosition?: string;
  stats: TeamStat[];
  skills: string[];
  overviewTitle: string;
  overviewDescription: string;
  experiencesTitle?: string;
  experiences?: TeamExperience[];
  achievementsTitle?: string;
  achievements?: {
    title: string;
    description?: string;
    bullets?: string[];
  }[];
  venturesTitle?: string;
  ventures?: TeamVenture[];
  strengthsTitle?: string;
  strengths?: TeamStrength[];
  mahotsavRoleTitle: string;
  mahotsavRoleDescription: string;
  mahotsavBoxes?: {
    title: string;
    description: string;
  }[];
  highlightQuote?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "godawarthy-sasidhar",
    name: "Godawarthy Sasidhar",
    designation: "Event Head • Senior Media Professional",
    roleBadge: "Bhagavadgita Vishwa Mahotsav 2027 • Event Head",
    kicker: "Senior Media Professional • Creative Leadership",
    shortIntro:
      "A senior media professional with leadership experience spanning more than 30 years across television, new media, programming, creative direction, content and marketing.",
    image: "/images/team/godawarthy_sasidhar.jpg",
    objectPosition: "center 18%",
    stats: [
      { value: "30+ Yrs", label: "Media & Leadership Experience" },
      { value: "104", label: "International Animation Episodes Produced" },
      { value: "24 Min", label: "Each International Episode Broadcast" },
    ],
    skills: [
      "Program Strategy",
      "Creative Direction",
      "Content Production",
      "Television Media",
      "Marketing & Revenue",
      "Spiritual & Heritage Media",
      "3D CGI & Walkthroughs",
    ],
    overviewTitle: "Three decades of media, storytelling & service.",
    overviewDescription:
      "A distinguished leadership profile bringing together television, creative production, programming, marketing, and devotional/spiritual content initiatives across major Indian networks and global platforms.",
    experiencesTitle: "Leadership across media & television.",
    experiences: [
      {
        title: "Vice President (Programs) & Creative Head",
        organization: "Color Chips New Media Limited",
        description:
          "Handled national and international animation episodes broadcast on ESPN, Star Sports, CNNC, ToonZ, Penta TV, Cartoon Network, Star TV, TV9, Sun Network, and MAA TV.",
        bullets: [
          "Produced 104 episodes of 24 minutes each for overseas animation markets.",
          "Broadcast on BBC Entertainment, Nick, Cartoon Network, Hungama TV, Zee Telugu, Sun Network, and international client channels.",
        ],
      },
      {
        title: "Vice President (Programs)",
        organization: "Sri Venkateswara Bhakti Channel (SVBC), TTD",
        description:
          "Coordinated concept development, pre-production, production, and post-production activities; responsible for EPC, finalization of concepts, and selection of cast for Tirumala Tirupati Devasthanams.",
      },
      {
        title: "Creative Head",
        organization: "OM Channel (CVR Spiritual), Hyderabad",
        description:
          "Aimed to create awareness of Sri Vasishtadvaita philosophy. Executed discourse series on Sri Vachana Bhooshanam, Sri Guna Ratna Kosham, Sri Gurupampara Vaibhavam, Alwaar Vaibhavam, Mukundamala, Stotra Ratnam, and Sri Sudarsana Shathakam.",
      },
      {
        title: "Chief Executive Officer",
        organization: "Siva Sakthi Sai TV, Hyderabad",
        description:
          "Responsible for production and telecast of all Peetam events, including major national events at Bhongir and Shirdi during Karthika Masam and Maha Shivaratri.",
      },
      {
        title: "Chief Editor",
        organization: "Jaya Sankara TV, Hyderabad",
        description:
          "Held overall editorial and management responsibility for the spiritual television channel.",
      },
      {
        title: "Marketing Head",
        organization: "9TV",
        description:
          "Led the entire marketing team and secured prominent sponsorships and advertising revenue for the channel.",
      },
    ],
    achievementsTitle: "Key achievements in devotional & cultural media.",
    achievements: [
      {
        title: "Devotional Television Programs",
        bullets: [
          "Krishnaveni — 14-episode daily program on TV9 for Krishna Pushkaralu, in association with Sri Veturi Sundara Ramamurthy.",
          "Annavaram Devasthanam for Gemini TV; Sri Yadagirigutta Narasimha Swamy Temple for Teja TV.",
          "Ashta Dasa Shakti Peethalu for SVBC; 108 Vaishnava Divya Desalu for SVBC; Dwadasha Jyothirlingalu.",
          "Tirumala Tirupati Devasthanams: 3D presentation on Tirumala Mahaprakaram and documentary on Swamy Vari Saptha Punya Theerthalu in the deep forest of Tirumala.",
        ],
      },
      {
        title: "Documentaries & Films — India & Abroad",
        bullets: [
          "Dwadasa Jyothirlingalu — Covered all 12 holy shrines from Kedarnath (Himalayas) to Rameshwaram (Tamil Nadu).",
          "Ashta Dasa Shakti Peethalu — 18 sacred Shaktipeethas across India and Sri Lanka (Colombo).",
          "108 Divya Tirupatulu — Historic Vaishnava temples across India and Nepal.",
          "Pancha Kedar, Pancha Badri, and Pancha Prayaga — Sacred pilgrim sites across Uttarakhand.",
          "Pancharamalu — Five sacred Siva temples of Andhra Pradesh.",
          "3D virtual walk-through presentation for NHAI for a Prime Minister's program.",
          "3D walk-through for a showroom in Saudi Arabia; promotional activities for TANA Conference, Washington, DC.",
        ],
      },
      {
        title: "Government Projects — Endowments Department",
        bullets: [
          "Documentary and multimedia presentation with 3D CGI for Master Plan implementation, and promotional film for Sri Bhramaramba Mallikarjuna Swamy Devasthanam, Srisailam.",
          "Documentaries on Sri Venkateswara Swamy Devasthanam (Dwaraka Tirumala), Annavaram Devasthanam, Sri Varasidhi Vinayaka Swamy Devasthanam (Kanipakam), and Yadagirigutta Temple.",
          "Promotional film on Ahobilam Narasimha Swamy Devasthanam; 3D virtual walk-through on Yadagirigutta Temple for Master Plan implementation.",
        ],
      },
    ],
    mahotsavRoleTitle: "Event Head — Bhagavadgita Vishwa Mahotsav 2027",
    mahotsavRoleDescription:
      "Leading the event-facing role with a blend of media, creative direction, and program-management experience. A profile that bridges mainstream television, international animation, channel leadership, marketing, and a long-standing body of spiritual and heritage storytelling.",
    mahotsavBoxes: [
      {
        title: "Event Leadership",
        description:
          "Overseeing central stage productions, thematic presentations, and devotional programming.",
      },
      {
        title: "Media & Broadcast",
        description:
          "Directing broadcast strategy, multi-channel distribution, and digital coverage across nations.",
      },
      {
        title: "Heritage Storytelling",
        description:
          "Infusing sacred Vedic traditions, temple lore, and Bhagavad Gita wisdom into audience-first narratives.",
      },
    ],
    highlightQuote:
      "Bringing three decades of media leadership and devotional storytelling to create a transformative global experience for Bhagavadgita Vishwa Mahotsav 2027.",
  },
  {
    id: "daitha-susheel-kumar",
    name: "Daitha Susheel Kumar",
    designation: "Communications & Marketing • Healthcare Business Leader",
    roleBadge: "Bhagavadgita Vishwa Mahotsav 2027 • Communications & Marketing",
    kicker: "Senior Healthcare Sales • Marketing • Business Development",
    shortIntro:
      "With 25 years of experience in healthcare sales, marketing, and business development, he brings expertise in strategic planning, communication, content creation, event designing, presentations, and administration.",
    image: "/images/team/daitha_susheel_kumar.png",
    objectPosition: "center 15%",
    stats: [
      { value: "25 Years", label: "Healthcare Sales & Marketing Experience" },
      { value: "Strategy", label: "Strategic Planning & Commercial Growth" },
      { value: "Content", label: "Content, Campaigns & Presentation Design" },
      { value: "Marketing", label: "Commercial & Event Communication" },
    ],
    skills: [
      "Strategic Planning",
      "Executive Communication",
      "Campaign Content Creation",
      "Presentation Design",
      "Commercial Marketing",
      "Business Development",
      "Event Administration",
    ],
    overviewTitle: "A senior professional with a communication-first marketing mindset.",
    overviewDescription:
      "A long-standing commercial leader combining 25 years of sales and marketing expertise with strategic communication, content development, presentation design, event thinking, and structured administration.",
    experiencesTitle: "Experience-driven professional leadership.",
    experiences: [
      {
        title: "Senior Healthcare Sales & Marketing Professional",
        period: "25 Years of Industry Experience",
        description:
          "Extensive track record across healthcare sales, commercial marketing, and business development, supported by structured strategic planning and execution.",
      },
      {
        title: "Business Development & Market Growth",
        period: "Core Professional Strength",
        description:
          "Deep experience connecting customer needs, institutional partnerships, market expansion, and relationship-led sustainable growth.",
      },
      {
        title: "Communications, Content & Presentations",
        period: "Executive Capability",
        description:
          "Creating high-impact campaign content, stakeholder presentation architectures, and narrative communication across healthcare and large initiatives.",
      },
      {
        title: "Event Design & Administration",
        period: "Organizational Capability",
        description:
          "Contributing to large-scale event concepts, planning frameworks, presentation assets, and cross-functional administrative coordination.",
      },
    ],
    strengthsTitle: "25 years of professional maturity applied to modern communication.",
    strengths: [
      {
        title: "Strategic Planning",
        description:
          "Bringing structured commercial planning and business-development thinking to marketing initiatives and event scale requirements.",
      },
      {
        title: "Persuasive Communication",
        description:
          "Translating complex institutional objectives into clear, inspiring communication for participants, partners, and stakeholders.",
      },
      {
        title: "Creative Content",
        description:
          "Developing narratives for outreach campaigns, keynote presentations, promotional collateral, and audience engagement.",
      },
      {
        title: "Execution & Administration",
        description:
          "Practical orientation toward implementing large blueprints through meticulous coordination and administrative discipline.",
      },
    ],
    mahotsavRoleTitle: "Communications & Marketing Contribution",
    mahotsavRoleDescription:
      "Building clarity, consistency, and reach for a monumental spiritual-cultural platform. Bringing professional communication and commercial marketing discipline to the Mahotsav's public-facing presence and stakeholder engagement.",
    mahotsavBoxes: [
      {
        title: "Communication Architecture",
        description:
          "Structuring core messaging, stakeholder updates, and audience-facing informative literature.",
      },
      {
        title: "Content & Presentations",
        description:
          "Designing high-impact event presentations, partnership proposals, and campaign narratives.",
      },
      {
        title: "Marketing Execution",
        description:
          "Orchestrating audience outreach, brand consistency, and multi-channel marketing campaigns.",
      },
    ],
    highlightQuote:
      "Applying 25 years of commercial marketing maturity and clear communication to elevate the global voice of Bhagavadgita Vishwa Mahotsav 2027.",
  },
  {
    id: "vemuri-shravani",
    name: "Vemuri Shravani",
    designation: "Content & Communications • Senior Anchor & Artist",
    roleBadge: "Bhagavadgita Vishwa Mahotsav 2027 • Content & Communications",
    kicker: "Senior Anchor • Artist • Content & Communication",
    shortIntro:
      "A senior media professional with 22 years of experience as a Senior Anchor and Artist, with an extensive body of work in devotional programming across leading television channels including Zee and Maa TV.",
    image: "/images/team/vemuri_shravani.png",
    objectPosition: "center 20%",
    stats: [
      { value: "22 Years", label: "Media & Television Experience" },
      { value: "Senior Anchor", label: "On-Screen Presentation & Moderation" },
      { value: "Devotional Media", label: "Leading Channels (Zee, Maa TV)" },
    ],
    skills: [
      "Live Anchoring",
      "Voice Over & Narration",
      "Devotional Programming",
      "Content Curation",
      "Stage Presentation",
      "Audience Communication",
      "Spiritual Media",
    ],
    overviewTitle: "A seasoned on-screen communicator with deep devotional media experience.",
    overviewDescription:
      "Vemuri Shravani brings two decades of excellence in television as a celebrated Senior Anchor and Artist. Her profile combines commanding stage presence, voice-over mastery, and deep understanding of devotional themes for audience-facing communication.",
    experiencesTitle: "22 years in television and devotional media.",
    experiences: [
      {
        title: "Senior Anchor & Television Artist",
        period: "22 Years of Continuous Excellence",
        description:
          "Long-standing professional career in the media industry, with extensive work spanning anchoring, live broadcasts, and cultural artistic presentation.",
      },
      {
        title: "Devotional Programming Lead",
        organization: "Leading Networks including Zee & Maa TV",
        description:
          "Spearheaded anchoring and presentation for celebrated devotional episodes, spiritual discourse broadcasts, and festive temple specials.",
      },
      {
        title: "Audience-Facing Content & Voice Artistry",
        period: "Signature Strength",
        description:
          "Integrating vocal resonance, script interpretation, and refined stage etiquette to translate profound cultural themes into accessible public presentations.",
      },
    ],
    strengthsTitle: "Signature strengths in communication & devotional content.",
    strengths: [
      {
        title: "Anchoring Excellence",
        description:
          "Commanding on-screen and stage presentation that engages diverse audiences with warmth, dignity, and spiritual poise.",
      },
      {
        title: "Voice-Over & Narration",
        description:
          "Distinctive voice artistry for documentaries, introductory audio tracks, sacred invocations, and multimedia videos.",
      },
      {
        title: "Devotional Content Framing",
        description:
          "Nuanced grasp of Gita philosophy, temple traditions, and cultural heritage, ensuring every script carries authenticity.",
      },
      {
        title: "Stage & Live Event Moderation",
        description:
          "Proven capability in handling massive live audiences, high-profile dignitaries, and complex live broadcast schedules.",
      },
    ],
    mahotsavRoleTitle: "Key Role in Bhagavadgita Vishwa Mahotsav 2027",
    mahotsavRoleDescription:
      "Contributing 22 years of broadcast experience to the Content & Communications pillar — serving as an experienced television voice and presenter helping translate devotional themes into clear, engaging, and inspiring communication.",
    mahotsavBoxes: [
      {
        title: "Public Voice & Anchoring",
        description:
          "Leading ceremony introductions, dignitary welcoming, and key stage proceedings during the Mahotsav.",
      },
      {
        title: "Audio-Visual Content",
        description:
          "Lending voice-over artistry and presentation direction to Mahotsav documentaries and promotional reels.",
      },
      {
        title: "Devotional Resonance",
        description:
          "Ensuring cultural and devotional sensitivity across all public-facing communication materials.",
      },
    ],
    highlightQuote:
      "22 years of media experience dedicated to giving Bhagavadgita Vishwa Mahotsav 2027 an authentic, resonant, and inspiring communication voice.",
  },
  {
    id: "pyreddy-krishna-reddy",
    name: "Pyreddy Krishna Reddy",
    designation: "Concept & IP, Relationship Management • Entrepreneur",
    roleBadge: "Bhagavadgita Vishwa Mahotsav 2027 • Concept & IP, Relationship Management",
    kicker: "Entrepreneur • Business Development • Relationships",
    shortIntro:
      "An entrepreneur leading Propel Forge, with a professional background of over 14 years across business development, client relationships, creative thinking, and execution.",
    image: "/images/team/pyreddy_krishna_reddy.jpg",
    objectPosition: "center 20%",
    stats: [
      { value: "14+ Years", label: "Professional Leadership Experience" },
      { value: "Founder", label: "Leading Propel Forge" },
      { value: "Concept & IP", label: "Strategic Thinking & Relationship Building" },
    ],
    skills: [
      "Business Development",
      "Relationship Management",
      "Concept Development",
      "Intellectual Property (IP)",
      "Strategic Collaboration",
      "Creative Thinking",
      "Agile Execution",
    ],
    overviewTitle: "Business thinking with creative execution.",
    overviewDescription:
      "A relationship-driven entrepreneur bringing more than a decade of experience in business development, institutional stakeholder management, creative conceptualization, and strategic execution.",
    experiencesTitle: "Connecting ideas, people, and execution.",
    experiences: [
      {
        title: "Entrepreneur & Founder",
        organization: "Propel Forge",
        period: "14+ Years of Professional Growth",
        description:
          "Directing ventures in business development, relationship networks, creative design thinking, and practical on-ground delivery.",
      },
      {
        title: "Strategic Business Development",
        period: "Core Professional Focus",
        description:
          "Focused on identifying collaborative opportunities, forging valuable ecosystem alliances, and turning conceptual ideas into viable, impactful initiatives.",
      },
      {
        title: "High-Trust Stakeholder Management",
        period: "Leadership Strength",
        description:
          "Building and nurturing enduring institutional, corporate, and community relationships rooted in mutual trust and long-term vision.",
      },
    ],
    strengthsTitle: "Four pillars of leadership.",
    strengths: [
      {
        title: "Business Development",
        description:
          "Identifying strategic opportunities and structuring sustainable collaborations across sectors.",
      },
      {
        title: "Relationship Management",
        description:
          "Building meaningful stakeholder networks with an emphasis on integrity, clarity, and enduring goodwill.",
      },
      {
        title: "Creative Thinking",
        description:
          "Bringing fresh perspectives to concept creation, event intellectual property, and experiential formats.",
      },
      {
        title: "Disciplined Execution",
        description:
          "Combining big-picture strategy with hands-on operational follow-through to deliver measurable results.",
      },
    ],
    mahotsavRoleTitle: "Concept & IP, Relationship Management for Mahotsav 2027",
    mahotsavRoleDescription:
      "Driving conceptual innovation and intellectual-property stewardship while managing key relationships across institutions, patron networks, and global delegations.",
    mahotsavBoxes: [
      {
        title: "Concept & IP Stewardship",
        description:
          "Curating distinctive event formats, knowledge properties, and signature initiatives under the Mahotsav banner.",
      },
      {
        title: "Stakeholder Relations",
        description:
          "Facilitating partnerships with community leaders, corporate sponsors, and institutional collaborators.",
      },
      {
        title: "Operational Momentum",
        description:
          "Aligning creative vision with ground realities to ensure flawless, coordinated momentum.",
      },
    ],
    highlightQuote:
      "Connecting visionary concepts with enduring relationships to create lasting momentum for Bhagavadgita Vishwa Mahotsav 2027.",
  },
  {
    id: "malladi-anand",
    name: "Malladi Anand",
    designation: "Event Strategy, Management & Marketing • Founder First Looks",
    roleBadge: "Bhagavadgita Vishwa Mahotsav 2027 • Event Strategy, Management & Marketing",
    kicker: "Events • Creative • Strategy • Execution",
    shortIntro:
      "14 years experienced Events & Creative Professional with leadership in event planning and execution. As Founder & Director of First Looks Events Pvt. Ltd., he brings a strong entrepreneurial approach to events.",
    image: "/images/team/malladi_anand.png",
    objectPosition: "center 15%",
    stats: [
      { value: "14 Years", label: "Events & Creative Experience" },
      { value: "1500+", label: "Successful Projects Completed" },
      { value: "1400+", label: "Delighted Clients & Brands" },
    ],
    skills: [
      "Large-Scale Event Strategy",
      "Creative Planning",
      "On-Ground Operations",
      "Artist & Celebrity Management",
      "Stage & Production Engineering",
      "Crowd & Attendee Logistics",
      "Event Marketing",
    ],
    overviewTitle: "Creative thinking. Event discipline. Memorable execution.",
    overviewDescription:
      "A battle-tested events leader combining creative imagination, production engineering, and disciplined on-ground coordination across more than 1,500 completed live experiences.",
    experiencesTitle: "Founder-led event expertise.",
    experiences: [
      {
        title: "Founder & Director",
        organization: "FIRST LOOKS EVENTS PVT LTD",
        period: "14 Years of Operational Excellence",
        description:
          "Directing full-service event strategy, creative planning, production, and ground operations across India.",
        bullets: [
          "Orchestrated massive Social Events, Corporate Galas, Musical Festivals, and Fashion Shows.",
          "Led conceptual design, 3D stage layouts, light/sound engineering, and venue infrastructure.",
          "Managed top-tier artist logistics, guest protocols, and on-site crowd safety management.",
        ],
      },
    ],
    achievementsTitle: "High-volume track record & portfolio highlights.",
    achievements: [
      {
        title: "Over 1,500 Completed Projects",
        description:
          "Unrivaled operational experience delivering events from initial blueprint and architectural design through on-site execution.",
      },
      {
        title: "1,400+ Delighted Clients",
        description:
          "A client-focused approach built upon reliable coordination, creative ingenuity, transparent governance, and flawless delivery.",
      },
      {
        title: "Diverse Event Formats",
        bullets: [
          "Center Stage and Grand Stadium Concerts",
          "High-Capacity Festive Celebrations & Holi Carnivals",
          "Celebrity Shows & VIP Dignitary Convocations",
          "Major Corporate Summits & Product Launches",
          "Musical Festivals, Spiritual Melas, and Cultural Revivals",
        ],
      },
    ],
    mahotsavRoleTitle: "Event Strategy, Management & Marketing for Mahotsav 2027",
    mahotsavRoleDescription:
      "Bringing grand event planning, creative direction, operational infrastructure, and marketing experience to execute the massive scale of the Bhagavad Gita Vishwa Mahotsav 2027.",
    mahotsavBoxes: [
      {
        title: "Central Stage & Production",
        description:
          "Engineering world-class stage sets, acoustics, LED backdrops, and technical infrastructure.",
      },
      {
        title: "Crowd & Venue Logistics",
        description:
          "Designing seamless attendee flows, VIP protocols, security coordination, and seating arrangements.",
      },
      {
        title: "Event Marketing & Promotion",
        description:
          "Mobilizing audience awareness and on-ground engagement to maximize participation across all sessions.",
      },
    ],
    highlightQuote:
      "Transforming grand spiritual visions into flawless, memorable on-ground realities through 14 years of battle-tested event mastery.",
  },
  {
    id: "k-satya-prasad",
    name: "K. Satya Prasad (Surya)",
    designation: "Business Leadership & Partnerships • Diversified Entrepreneur",
    roleBadge: "Bhagavadgita Vishwa Mahotsav 2027 • Business Leadership & Partnerships",
    kicker: "Entrepreneur • Infrastructure • Business • Innovation",
    shortIntro:
      "Entrepreneur, infrastructure professional and business leader with a professional journey spanning infrastructure development, civil contracting, mining and crushing, digital media, creative studios, energy exploration, food ventures, technology-enabled services, and social welfare.",
    image: "/images/team/k_satya_prasad.jpg",
    objectPosition: "center 15%",
    stats: [
      { value: "Since 2004", label: "Infrastructure Sector Career" },
      { value: "2020", label: "Independent Civil Contracting Milestone" },
      { value: "10+", label: "Diversified Business & Social Ventures" },
      { value: "Multi-Sector", label: "Heavy Industry to Tech & Media" },
    ],
    skills: [
      "Infrastructure Development",
      "Civil Contracting",
      "Mining & Industrial Operations",
      "Digital Media & Content",
      "Energy Technologies",
      "Mobile Applications",
      "Community Philanthropy",
      "Strategic Business Partnerships",
    ],
    overviewTitle: "A diversified entrepreneur with a builder's mindset.",
    overviewDescription:
      "K. Satya Prasad's journey began with multinational infrastructure development corporations in 2004 and evolved into multi-state civil contracting, industrial ventures, creative studios, energy tech, mobile apps, and organized social welfare.",
    experiencesTitle: "From infrastructure to multi-sector entrepreneurship.",
    experiences: [
      {
        title: "Infrastructure Development",
        period: "Since 2004",
        description:
          "Professional career with multinational infrastructure development corporations, mastering large-scale project operations, heavy logistics, and complex contract environments.",
      },
      {
        title: "Independent Civil Contracting",
        period: "Since 2020",
        description:
          "Undertaking independent civil infrastructure and contracting activities across multiple states of India, expanding operational reach and execution capacity.",
      },
      {
        title: "Mining & Crusher Plant Operations",
        period: "Industrial Expansion",
        description:
          "Established resource-based mining and stone-crushing operations in Telangana, directly supporting regional construction and infrastructure networks.",
      },
      {
        title: "Digital Media & Creative Production",
        period: "SK Magic Creations • Wise Monkeys Media",
        description:
          "Pioneered digital content, creative communications, and video platforms including the popular Wise Monkeys Media YouTube initiative.",
      },
      {
        title: "Technology, Energy & Consumer Ventures",
        period: "Diversified Ventures",
        description:
          "Expanded into renewable and energy exploration, food innovation with SK Magic Recipes, and digital utility solutions through the Bhiksha mobile app.",
      },
    ],
    venturesTitle: "Entrepreneurial portfolio across sectors.",
    ventures: [
      {
        name: "Civil Contracting",
        tag: "Infrastructure",
        description: "Independent infrastructure contracting activities across various states of India.",
      },
      {
        name: "Mining & Crusher Plants",
        tag: "Industrial",
        description: "Resource-based industrial operations in Telangana supporting regional construction.",
      },
      {
        name: "SK Magic Creations",
        tag: "Creative",
        description: "Digital media and creative production studio venture.",
      },
      {
        name: "Wise Monkeys Media",
        tag: "Digital Media",
        description: "YouTube and content-led digital communication initiative.",
      },
      {
        name: "Bumble Bee",
        tag: "Creative Studio",
        description: "Kids miniature studio and model shoot studio in Telangana.",
      },
      {
        name: "Varenya Energy Technologies",
        tag: "Energy",
        description: "Energy exploration and sustainable technology initiative in Telangana.",
      },
      {
        name: "SK Magic Recipes Pvt. Ltd.",
        tag: "Food & Culinary",
        description: "Culinary and food-sector enterprise focused on Andhra Pradesh.",
      },
      {
        name: "Bhiksha App",
        tag: "Technology",
        description: "Service-based mobile application reflecting a commitment to practical digital solutions.",
      },
      {
        name: "Mana Niswardh Seva Foundation",
        tag: "Social Welfare",
        description: "Philanthropic social-welfare foundation focused on organized service and community empowerment.",
      },
      {
        name: "Real Business Matrix",
        tag: "Business Network",
        description: "Co-Founder, driving strategic business development, collaboration, and high-impact partnerships.",
      },
    ],
    strengthsTitle: "Initiative. Diversification. Innovation. Service.",
    strengths: [
      {
        title: "Entrepreneurial Initiative",
        description:
          "Proven capability in identifying nascent opportunities and turning them into scalable operating ventures across varied sectors.",
      },
      {
        title: "Strategic Business Development",
        description:
          "Strong orientation toward partnership formation, high-level negotiation, new market entry, and ecosystem expansion.",
      },
      {
        title: "Digital & Creative Outlook",
        description:
          "Practical experience across digital content, creative studio services, video platforms, and app technology.",
      },
      {
        title: "Social Responsibility",
        description:
          "Extending entrepreneurial resources into community welfare through the Mana Niswardh Seva Foundation.",
      },
    ],
    mahotsavRoleTitle: "Business Leadership & Partnerships Perspective",
    mahotsavRoleDescription:
      "Satya Prasad's multi-sector entrepreneurial network and execution mindset empower the Mahotsav through corporate relationships, strategic sponsorships, infrastructure logistics, and long-term ecosystem building.",
    mahotsavBoxes: [
      {
        title: "Corporate & Sponsor Partnerships",
        description:
          "Connecting the Mahotsav with corporate leaders, industrial patrons, and institutional sponsors.",
      },
      {
        title: "Infrastructure & Logistics Insight",
        description:
          "Leveraging two decades of civil contracting to advise on massive venue construction and site operations.",
      },
      {
        title: "Multi-Disciplinary Execution",
        description:
          "Bridging infrastructure, digital media, technology, and social service into a unified delivery framework.",
      },
    ],
    highlightQuote:
      "Building businesses, forging partnerships, and serving society — bringing an entrepreneurial builder's mindset to Bhagavadgita Vishwa Mahotsav 2027.",
  },
];
