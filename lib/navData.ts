export type NavItem = {
  label: string;
  href: string;
};

export type NavGroup = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const navGroups: NavGroup[] = [
   {
    label: "Home",
    href: "/",
  },
  {
    label: "Mahotsav",
    href: "/mahotsav",
    children: [
      { label: "Overview", href: "/mahotsav" },
      { label: "Vision & Mission", href: "/mahotsav/vision" },
      { label: "Event Philosophy", href: "/mahotsav/philosophy" },
      { label: "Why Bhagavad Gita?", href: "/mahotsav/why-gita" },
      { label: "Significance of 18", href: "/mahotsav/significance-of-18" },
      { label: "The Legacy", href: "/mahotsav/legacy" },
    ],
  },
  {
    label: "The Journey",
    href: "/global-journey",
    children: [
      { label: "Curtain Raiser", href: "/global-journey/curtain-raiser" },
      { label: "18 Countries", href: "/global-journey/18-countries" },
      { label: "18 Chapters", href: "/global-journey/18-chapters" },
      { label: "18 Languages", href: "/global-journey/18-languages" },
      { label: "Global Parayana", href: "/global-journey/global-parayana" },
      { label: "Global Sankalpa", href: "/global-journey/global-sankalpa" },
      { label: "Road to 27 Feb 2027", href: "/global-journey/road-to-mahotsav" },
    ],
  },
  {
    label: "Experience",
    href: "/experience",
    children: [
      { label: "Venue", href: "/experience/venue" },
      { label: "Four Pathways", href: "/experience/four-pathways" },
      { label: "50,000+ Participants", href: "/experience/participants" },
      { label: "Central Stage", href: "/experience/central-stage" },
      { label: "Gita Experience Zone", href: "/experience/gita-experience" },
      { label: "Youth Zone", href: "/experience/youth-zone" },
      { label: "Cultural & Spiritual Zones", href: "/experience/zones" },
    ],
  },
  {
    label: "Programme",
    href: "/programme",
    children: [
      { label: "Curtain Raiser", href: "/programme/curtain-raiser" },
      { label: "Mega Mahotsav", href: "/programme/mega-mahotsav" },
      { label: "Grand Parayana", href: "/programme/grand-parayana" },
      { label: "Peetadhipati Sammelanam", href: "/programme/peetadhipati-sammelanam" },
      { label: "Gita Jnana Sabha", href: "/programme/gita-jnana-sabha" },
      { label: "Youth Gita", href: "/programme/youth-gita" },
      { label: "Cultural Programme", href: "/programme/cultural" },
      { label: "Global Connect", href: "/programme/global-connect" },
      { label: "Gita Sankalpa", href: "/programme/gita-sankalpa" },
    ],
  },
  {
    label: "Participate",
    href: "/participate",
    children: [
      
      { label: "Global Participation", href: "/participate/global" },
      { label: "Institution Participation", href: "/participate/institution" },
      { label: "Youth Participation", href: "/participate/youth" },
      { label: "Volunteer", href: "/participate/volunteer" },
      { label: "Gita Parayana", href: "/participate/host-parayana" },
      
    ],
  },
  {
    label: "Partners",
    href: "/partners",
    children: [
      { label: "Why Partner?", href: "/partners/why-partner" },
      { label: "Founding Patron", href: "/partners/founding-patron" },
      { label: "Partnership Opportunities", href: "/partners/opportunities" },
      { label: "Sponsorship", href: "/partners/sponsorship" },
      { label: "CSR Partnership", href: "/partners/csr" },
      { label: "Knowledge Partner", href: "/partners/knowledge" },
      { label: "Youth Partner", href: "/partners/youth" },
      { label: "Media Partner", href: "/partners/media" },
      { label: "Partnership Proposal", href: "/partners/proposal" },
    ],
  },
  {
    label: "Media",
    href: "/media",
    children: [
      { label: "News", href: "/media/news" },
      { label: "Announcements", href: "/media/announcements" },
      { label: "Press Releases", href: "/media/press-releases" },
      { label: "Stories", href: "/media/stories" },
      { label: "Gallery", href: "/media/gallery" },
      { label: "Videos", href: "/media/videos" },
      { label: "Media Coverage", href: "/media/coverage" },
      { label: "Press Kit", href: "/media/press-kit" },
      { label: "Up Coming", href: "/upcoming events" },
    ],
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Organising Body", href: "/about/organising-body" },
      { label: "Advisory Council", href: "/about/advisory-council" },
      { label: "Spiritual Leadership", href: "/about/spiritual-leadership" },
      { label: "Organising Committee", href: "/about/organising-committee" },
      { label: "Institutional Partners", href: "/about/institutional-partners" },
      { label: "Our Values", href: "/about/values" },
      { label: "Contact", href: "/about/contact" },
    ],
  },
];
