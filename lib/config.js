// =====================================================================
//  💍  YOUR WEDDING DETAILS  —  EDIT THIS ONE FILE TO PERSONALISE THE SITE
// =====================================================================
//
//  Everything the website shows comes from this file. You do NOT need to
//  touch any other code. Change the text between the quotes "  " and save.
//
//  Tip: keep the quotes and commas exactly as they are — only change the
//  words inside the quotes.
// =====================================================================

export const config = {
  // -------------------------------------------------------------------
  // 1. THE COUPLE
  // -------------------------------------------------------------------
  couple: {
    brideName: "Bhagyashri",
    groomName: "Pavan Kumar",

    // Which name shows first in "Pavan Kumar & Bhagyashri". Options: "bride" or "groom"
    nameOrderFirst: "groom",

    // A short blessing shown at the very top (Devanagari looks lovely here).
    // Examples: "॥ शुभ विवाह ॥"  ·  "॥ श्री गणेशाय नमः ॥"  ·  "Om Shri Ganeshaya Namah"
    blessing: "॥ श्री गणेशाय नमः ॥",

    // The big romantic line on the home screen.
    heroMessage:
      "Two souls, one journey — with the blessings of our families, we invite you to celebrate the beginning of our forever.",

    // Your wedding hashtag (leave "" empty to hide it).
    hashtag: "#PavanWedsBhagyashri",

    // A short "our story" paragraph shown near the countdown (leave "" to hide).
    story:
      "From a chance hello to a lifetime of togetherness — our families have blessed our bond, and now we begin the most beautiful chapter of our lives. We would be honoured to have you share in our joy.",
  },

  // -------------------------------------------------------------------
  // 2. THE BIG DAY  (drives the live countdown)
  // -------------------------------------------------------------------
  wedding: {
    // Wedding date & time in the format  "YYYY-MM-DDTHH:MM:SS"  (24-hour).
    // This is your LOCAL time. Example below = 16 Nov 2026, 10:15 AM.
    dateTimeISO: "2026-11-16T10:15:00",

    // How the date should read on the page.
    dateDisplay: "Monday, 16 November 2026",
    timeDisplay: "10:15 AM",
    cityDisplay: "Sedam, Karnataka",
  },

  // -------------------------------------------------------------------
  // 3. EVENTS / FUNCTIONS  (add or remove blocks as you like)
  //    Each event needs: name, date, time, venue, note, icon
  //    icon options: "mehndi" | "haldi" | "sangeet" | "wedding" | "reception"
  // -------------------------------------------------------------------
  events: [
    {
      name: "Wedding Ceremony",
      date: "Monday, 16 November 2026",
      time: "10:15 AM",
      venue: "Veerashaiva Kalyana Mantapa, Sedam",
      note: "The sacred vows — the moment we say forever.",
      icon: "wedding",
    },
  ],

  // -------------------------------------------------------------------
  // 4. MEMORIES / GALLERY
  //    Put your photos in the  /public/gallery  folder and list their
  //    file names here. Placeholder images are shown until you do.
  //    (For the couple's main photo, replace /public/couple.svg)
  // -------------------------------------------------------------------
  // Grouped memories — three themed rows in the Memories section.
  // Row 1 = the two of you, Row 2 = engagement, Row 3 = family.
  galleryGroups: [
    {
      title: "Bride & Groom",
      photos: [
        { src: "/couple1.jpeg" },
        { src: "/gallery/ed3.jpeg" },
        { src: "/gallery/ed4.jpeg" },
        { src: "/gallery/ed5.jpeg" },
        { src: "/gallery/ED1.jpeg" },
        { src: "/gallery/ED2.jpeg" },
        { src: "/gallery/p1.png" },
        { src: "/couple.jpeg" },
        { src: "/gallery/WIB1.jpeg" },
        { src: "/gallery/WIB2.jpeg" },
      ],
    },
    {
      title: "Engagement",
      photos: [
        { src: "/gallery/e4.jpeg" },
        { src: "/gallery/e6.jpeg" },
        { src: "/gallery/e7.jpeg" },
        { src: "/gallery/e5.jpeg" },
        { src: "/gallery/ec.jpeg" },
        { src: "/gallery/E1.jpeg" },
        { src: "/gallery/E3.jpeg" },
        { src: "/gallery/ef1.jpeg" },
        { src: "/gallery/p0.jpeg" },
        { src: "/gallery/E2.jpeg" },
        { src: "/gallery/p2.jpeg" },
      ],
    },
    {
      title: "Family",
      photos: [
        { src: "/gallery/f1.jpeg" },
        { src: "/gallery/f2.jpeg" },
        { src: "/gallery/f3.jpeg" },
      ],
    },
  ],

  // The main couple photo on the home screen (replace this file with yours).
  couplePhoto: "/dp.jpeg",

  // Your live site URL — used for link previews (Open Graph). Update if your domain changes.
  siteUrl: "https://marrypb.vercel.app",

  // -------------------------------------------------------------------
  // 5. LOCATION
  // -------------------------------------------------------------------
  location: {
    venueName: "Veerashaiva Kalyana Mantapa",
    address: "Sedam, Karnataka 585222, India",

    // The "Get Directions" button opens this link (your Google Maps link).
    directionsLink:
      "https://www.google.com/maps/search/?api=1&query=Veerashaiva+Kalyana+Mantapa+Sedam+Karnataka+585222",

    // The embedded map. This search query already points to your venue.
    // To change it: replace the words after  q=  with your venue + city
    // (use + signs instead of spaces).
    mapEmbedSrc:
      "https://www.google.com/maps?q=Veerashaiva+Kalyana+Mantapa+Sedam+Karnataka+585222&output=embed",
  },

  // -------------------------------------------------------------------
  // 6. CONTACT (shown in the footer — leave "" to hide any line)
  // -------------------------------------------------------------------
  contact: {
    phone: "",
    email: "",
    rsvpNote: "For any questions, please reach out to the families.",
  },
};

// -------------------------------------------------------------------
//  Helper: builds "Pavan Kumar & Bhagyashri" in the order you chose above.
//  (You don't need to edit this.)
// -------------------------------------------------------------------
export function coupleNames() {
  const { brideName, groomName, nameOrderFirst } = config.couple;
  return nameOrderFirst === "groom"
    ? `${groomName} & ${brideName}`
    : `${brideName} & ${groomName}`;
}
