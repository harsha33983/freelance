// Shared content data for content pages
export type SimplePageData = {
  badge: string;
  title: string;
  subtitle: string;
  body: string[];
};

export const globalJourneyPages: Record<string, SimplePageData> = {
  "18-countries": {
    badge: "18 Countries",
    title: "One Chapter. One Country.",
    subtitle: "Eighteen nations host one chapter of the Bhagavad Gita each — creating an unprecedented global tapestry of sacred scholarship and celebration.",
    body: [
      "The eighteen host countries of the Bhagavad Gita Vishwa Mahotsav have been selected to represent every inhabited continent and major cultural region of the world — from South Asia to South America, from East Asia to East Africa.",
      "Each country hosts a dedicated chapter event — a multi-day celebration of the assigned chapter through recitation, discourse, cultural performance, and community gathering. These events are not merely symbolic; they are deep, immersive explorations of the Gita's wisdom in their local cultural context.",
      "The eighteen countries are: India, United States, United Kingdom, Ireland, France, Germany, Italy, Spain, Netherlands, Russia, China, Japan, UAE, Australia, New Zealand, Canada, Brazil, and South Africa.",
      "Each host country chapter event will be live-streamed to the global community and archived as part of the Mahotsav's permanent digital legacy.",
    ],
  },
  "18-languages": {
    badge: "18 Languages",
    title: "The Gita Speaks Every Tongue",
    subtitle: "For the first time, a coordinated global effort will translate, record, and broadcast the Bhagavad Gita across eighteen major world languages.",
    body: [
      "The Bhagavad Gita has already been translated into over 80 languages — but the Mahotsav takes this a step further by making 18 specific language editions the living, spoken voice of the event.",
      "The 18 languages of the Mahotsav are: Sanskrit (the original), Hindi, English, Portuguese , Afrikaans , Irish , Italian , Dutch , Chinese , Spanish, German, French, Japanese, Arabic, Russian , Maori ,  Zulu .",
      "Each language edition will include a fresh, scholar-reviewed translation of all 18 chapters, a high-quality audio recording by native-speaker practitioners, and a dedicated digital platform for free global access.",
      "The multilingual dimension of the Mahotsav is a living demonstration of one of the Gita's central teachings: that the eternal truth (sanatana dharma) transcends all particular forms, including language.",
    ],
  },
  "global-parayana": {
    badge: "Global Parayana",
    title: "The World Recites as One",
    subtitle: "The Grand Global Parayana on 27 February 2027 — 50,000 voices reciting all 18 chapters of the Bhagavad Gita in complete unison.",
    body: [
      "The centrepiece of the Mahotsav is the Grand Global Parayana — a complete recitation of all 700 verses of the Bhagavad Gita by 50,000 participants gathered at the main venue, joined virtually by hundreds of thousands more around the world.",
      "The Parayana will be led by trained recitation guides (parayana acharyas) stationed at intervals across the main recitation ground. All participants will recite together in Sanskrit — with the transliteration provided in all 18 languages on large screens.",
      "The recitation will take approximately three hours and will be a moment of profound collective intention — 50,000 human beings momentarily united in a single act of sacred attention.",
      "Participation in the Global Parayana is open to all registered attendees. Dedicated preparation sessions will be held in the days preceding 27 February to help participants learn the pronunciation and rhythm of the verses.",
    ],
  },
  "global-sankalpa": {
    badge: "Global Sankalpa",
    title: "A Collective Vow",
    subtitle: "At the close of the Mahotsav, every participant — physical and virtual — will take the Global Gita Sankalpa: a collective commitment to live by the Gita's wisdom.",
    body: [
      "A sankalpa is not merely a resolution — it is a sacred intention, made before the divine, that carries the full weight of one's consciousness and will.",
      "The Global Gita Sankalpa will be taken simultaneously by every participant on the evening of 27 February 2027 — those present at the venue and those joining virtually from all 18 countries.",
      "The sankalpa text, drafted by the Spiritual Advisory Council, encapsulates the Gita's essential teachings on right action, self-knowledge, and service — expressed in language accessible to practitioners of all backgrounds and traditions.",
      "Every person who takes the sankalpa will receive a digital certificate and be enrolled in the Global Gita Maitri Network — a community of practitioners committed to supporting each other in living the Gita's wisdom.",
    ],
  },
};
