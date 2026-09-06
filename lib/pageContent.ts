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
    subtitle: "Eighteen countries host one chapter of the Bhagavad Gita each — creating an unprecedented global tapestry of sacred scholarship and celebration.",
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
};
