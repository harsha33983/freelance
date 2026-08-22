# BGVM 2027 — 18 Countries Feature

The project has been updated with an interactive 18 Countries global map.

## What was added

- `components/global-journey/CountriesMap.tsx`
  - Displays `public/18-countries-map.png`
  - Adds clickable hotspots over all 18 country labels.
  - Clicking a country opens its dedicated country page.

- `lib/countries.ts`
  - Central data for all 18 countries.
  - Includes country name, slug, language, description, gallery and video fields.

- `app/global-journey/18-countries/[country]/page.tsx`
  - Dynamic country detail page.
  - URL format:
    `/global-journey/18-countries/india`
    `/global-journey/18-countries/canada`
    etc.
  - Includes country information, gallery area, videos area and back navigation.

- `app/global-journey/18-countries/page.tsx`
  - Updated to show the 18-country interactive map.

- The previously empty home components were changed to `return null;` so the project TypeScript check succeeds while those sections remain removed.

## Adding country images

Add country-specific images under:

`public/images/countries/`

Then add the image paths to the `gallery` array for the relevant country in:

`lib/countries.ts`

Example:

`gallery: ["/images/countries/india-1.jpg", "/images/countries/india-2.jpg"]`

## Adding YouTube videos

Add embed URLs to the country's `videos` array in `lib/countries.ts`.

Example:

`videos: ["https://www.youtube.com/embed/VIDEO_ID"]`

## Run the project

1. Open the project folder in VS Code.
2. Open Terminal.
3. Run:

`npm install`

4. Then:

`npm run dev`

5. Open:

`http://localhost:3000/global-journey/18-countries`

The map image is already included in `public/18-countries-map.png`.

Note: `node_modules`, `.next`, and `.git` are excluded from this ZIP so the project stays smaller. Run `npm install` after extracting it.
