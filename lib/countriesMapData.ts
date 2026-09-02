export type CountryHotspot = {
  name: string;
  slug: string;
  top: string;
  left: string;
  width: string;
  height: string;
};

export const countryHotspots: CountryHotspot[] = [
  // Left column (top to bottom)
  { name: "India", slug: "india", top: "28%", left: "6.5%", width: "11%", height: "9%" },
  { name: "USA", slug: "usa", top: "39%", left: "6.5%", width: "11%", height: "9%" },
  { name: "Canada", slug: "canada", top: "50%", left: "6.5%", width: "11%", height: "9%" },
  { name: "Brazil", slug: "brazil", top: "61%", left: "6.5%", width: "11%", height: "9%" },
  { name: "South Africa", slug: "south-africa", top: "72%", left: "6.5%", width: "11%", height: "9%" },

  // Middle arch (left to right)
  { name: "UK", slug: "united-kingdom", top: "40%", left: "19.5%", width: "9%", height: "9%" },
  { name: "Ireland", slug: "ireland", top: "40%", left: "28.5%", width: "9%", height: "9%" },
  { name: "France", slug: "france", top: "40%", left: "37.5%", width: "9%", height: "9%" },
  { name: "Germany", slug: "germany", top: "40%", left: "46.5%", width: "9%", height: "9%" },
  { name: "Italy", slug: "italy", top: "40%", left: "55.5%", width: "9%", height: "9%" },
  { name: "Spain", slug: "spain", top: "40%", left: "64.5%", width: "9%", height: "9%" },
  { name: "Netherlands", slug: "netherlands", top: "40%", left: "73.5%", width: "9%", height: "9%" },
  
  // Placed over the "RUSSIA" label on the right side of the map
  { name: "Russia", slug: "russia", top: "59%", left: "59%", width: "10%", height: "9%" },

  // Right column (top to bottom)
  { name: "China", slug: "china", top: "28%", left: "93.5%", width: "11%", height: "9%" },
  { name: "Japan", slug: "japan", top: "39%", left: "93.5%", width: "11%", height: "9%" },
  { name: "UAE", slug: "uae", top: "50%", left: "93.5%", width: "11%", height: "9%" },
  { name: "Australia", slug: "australia", top: "61%", left: "93.5%", width: "11%", height: "9%" },
  { name: "New Zealand", slug: "new-zealand", top: "72%", left: "93.5%", width: "11%", height: "9%" },
];
