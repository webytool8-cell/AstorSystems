/**
 * Photography used on the site. All images are openly licensed (found via Openverse)
 * and credited on /credits. Keep this file the single source of truth for attribution.
 */
export interface Photo {
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  creator: string;
  creatorUrl?: string;
  license: string;
  licenseUrl?: string;
  sourceUrl: string;
}

export const photos = {
  "property-management": { src: "/images/photos/property-management.webp", width: 1024, height: 768, alt: "Two-storey apartment complex with a white fence", title: "Art Deco Apartment Complex Little Havana", creator: "Phillip Pessar", creatorUrl: "https://www.flickr.com/photos/25955895@N03", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", sourceUrl: "https://www.flickr.com/photos/25955895@N03/39954476040" },
  "auto-repair": { src: "/images/photos/auto-repair.webp", width: 1024, height: 768, alt: "Mechanic working on a car wheel and brake", title: "2012-167 Strong Hands", creator: "mrsdkrebs", creatorUrl: "https://www.flickr.com/photos/56041749@N02", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", sourceUrl: "https://www.flickr.com/photos/56041749@N02/7377277352" },
  "plumbing-hvac": { src: "/images/photos/plumbing-hvac.webp", width: 1024, height: 678, alt: "Technician servicing an outdoor air conditioning unit", title: "Air Conditioning Repairs", creator: "KOMUnews", creatorUrl: "https://www.flickr.com/photos/12801018@N00", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", sourceUrl: "https://www.flickr.com/photos/12801018@N00/9130025365" },
  "cleaning-companies": { src: "/images/photos/cleaning-companies.webp", width: 1024, height: 768, alt: "Cleaner mopping the floor of a reception area", title: "Recepci\u00f3n", creator: "Daquella manera", creatorUrl: "https://www.flickr.com/photos/62518311@N00", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/", sourceUrl: "https://www.flickr.com/photos/62518311@N00/289146343" },
  "contractors-home-services": { src: "/images/photos/contractors-home-services.webp", width: 1024, height: 768, alt: "Electrician measuring and marking materials on a workbench", title: "Day 271 - Kev the electrician", creator: "Phil and Pam", creatorUrl: "https://www.flickr.com/photos/33987777@N00", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", sourceUrl: "https://www.flickr.com/photos/33987777@N00/2591308406" },
  "moving-companies": { src: "/images/photos/moving-companies.webp", width: 1024, height: 768, alt: "Mover carrying stacked boxes along a street", title: "Mover at Work", creator: "kohlmann.sascha", creatorUrl: "https://www.flickr.com/photos/96323831@N06", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/", sourceUrl: "https://www.flickr.com/photos/96323831@N06/13057496715" },
  "barbershops-salons": { src: "/images/photos/barbershops-salons.webp", width: 1023, height: 681, alt: "Barber giving a young customer a haircut", title: "Lakeforest Elementary Haircuts", creator: "Greenville, NC", creatorUrl: "https://www.flickr.com/photos/156869144@N02", license: "Public Domain Mark", licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/", sourceUrl: "https://www.flickr.com/photos/156869144@N02/52444206925" },
  "professional-services": { src: "/images/photos/professional-services.webp", width: 1024, height: 768, alt: "Small business accounting workshop in progress", title: "RUM Small Business Accounting", creator: "Anoka County Library", creatorUrl: "https://www.flickr.com/photos/62258409@N06", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", sourceUrl: "https://www.flickr.com/photos/62258409@N06/7129117969" },
  "nonprofits": { src: "/images/photos/nonprofits.webp", width: 1023, height: 993, alt: "Food bank volunteer sorting boxes of produce", title: "20111031-FNS-LSC-0385", creator: "USDAgov", creatorUrl: "https://www.flickr.com/photos/41284017@N08", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", sourceUrl: "https://www.flickr.com/photos/41284017@N08/6771443421" },
  "service-implementation": { src: "/images/photos/service-implementation.webp", width: 1024, height: 733, alt: "Team planning around a whiteboard", title: "Reflections on the new Machine Age \u2014 technology, inequality and the economy", creator: "jurvetson", creatorUrl: "https://www.flickr.com/photos/44124348109@N01", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", sourceUrl: "https://www.flickr.com/photos/44124348109@N01/16620787618" },
  "service-templates": { src: "/images/photos/service-templates.webp", width: 960, height: 640, alt: "Whiteboard covered in sticky notes mapping out a process", title: "Whiteboard Post-Itnotes", creator: "Startup Stock Photos", creatorUrl: "https://startupstockphotos.com", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/", sourceUrl: "https://stocksnap.io/photo/whiteboard-post-itnotes-YR89OQFMT1" },
  "service-support": { src: "/images/photos/service-support.webp", width: 1024, height: 575, alt: "Person on a phone call at a desk", title: "galaxy tab phone call", creator: "mrJasonWeaver", creatorUrl: "https://www.flickr.com/photos/30660917@N07", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", sourceUrl: "https://www.flickr.com/photos/30660917@N07/5951860034" },
  "receptionist": { src: "/images/photos/receptionist.webp", width: 1024, height: 680, alt: "Front-desk staff member answering a phone call", title: "100623-N-7364R-084", creator: "DOCHKAS", creatorUrl: "https://www.flickr.com/photos/50069770@N08", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", sourceUrl: "https://www.flickr.com/photos/50069770@N08/4771313441" },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
