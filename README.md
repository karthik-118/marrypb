# 💍 Royal Peacock — Wedding Website

A beautiful, mobile-friendly Hindu wedding website built with **Next.js**.
It has a hero with your photo and a blessing, a live countdown, an events
schedule, a memories gallery, a "Send Wishes" guestbook, and a venue map.

Everything you'll want to change lives in **one file**: `lib/config.js`.

---

## ✨ What's inside

| Section | What it does |
|--------|---------------|
| **Home / Hero** | Your names, photo, a blessing and a romantic message |
| **Countdown** | A live timer counting down to your wedding date |
| **Events** | Cards for Mehndi, Haldi, Sangeet, Wedding, Reception… |
| **Memories** | A photo gallery with a full-screen lightbox |
| **Send Wishes** | Guests leave blessings that are saved and shown to everyone |
| **Location** | Venue details + an embedded Google Map + directions button |

---

## 🚀 Getting started (run it on your computer)

You'll need **Node.js 18.18 or newer**. Get it from https://nodejs.org (choose the "LTS" version).

1. Open a terminal **inside this folder**, then install the packages:

   ```bash
   npm install
   ```

2. Start the site in development mode:

   ```bash
   npm run dev
   ```

3. Open **http://localhost:3000** in your browser. 🎉

   As you edit files and save, the site updates automatically.

---

## 📝 Personalise it (the only file you *must* edit)

Open **`lib/config.js`** and change the text between the quotes. It's fully
commented, so you'll see exactly what each line does. You can set:

- The **couple's names** and the order they appear in
- The **blessing** (Devanagari like `॥ शुभ विवाह ॥` looks lovely) and the romantic message
- Your **wedding date & time** (this drives the countdown)
- Your **events** — add or remove blocks freely
- Your **venue** name, address and Google Maps link
- Optional **hashtag**, **story** and **contact** details

> Tip: only change the words *inside* the quotes `" "`. Keep the quotes and
> commas where they are.

### Changing the colours (optional)

All colours live at the top of **`app/globals.css`** under `:root`. Change a
value there (e.g. the gold or teal shades) and it updates across the whole site.

---

## 🖼️ Adding your photos

1. **Main couple photo (home screen):**
   Replace the file `public/couple.svg` with your own photo.
   - Easiest way: name your photo `couple.svg`… *or* keep your file's name
     (e.g. `couple.jpg`) and update this line in `lib/config.js`:
     ```js
     couplePhoto: "/couple.jpg",
     ```
   - A square photo (e.g. 800×800) looks best.

2. **Gallery photos (Memories):**
   Put your photos in the **`public/gallery/`** folder, then list them in
   `lib/config.js` under `gallery`:
   ```js
   gallery: [
     { src: "/gallery/us-1.jpg", caption: "Where it began" },
     { src: "/gallery/us-2.jpg", caption: "The proposal" },
     // add as many as you like…
   ],
   ```

Until you add your own, tasteful peacock-themed placeholders are shown.

---

## 💌 Make the guestbook save wishes for everyone (free)

Out of the box, "Send Wishes" already works — but wishes are saved only in each
visitor's **own browser**. To make wishes **saved permanently and shared with
everyone**, connect a free database called **Supabase** (about 5 minutes):

1. Go to **https://supabase.com** → create a free account → **New project**.
2. Once the project is ready, open **SQL Editor** and run this once:

   ```sql
   create table wishes (
     id uuid primary key default gen_random_uuid(),
     name text not null,
     message text not null,
     created_at timestamptz default now()
   );

   -- allow the website to read and add wishes
   alter table wishes enable row level security;

   create policy "Anyone can read wishes"
     on wishes for select using (true);

   create policy "Anyone can add a wish"
     on wishes for insert with check (true);
   ```

3. Open **Project Settings → API** and copy two values:
   - **Project URL**
   - **anon / public** key

4. In this project, make a copy of `.env.local.example`, rename it to
   **`.env.local`**, and paste your values in:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...your-key...
   ```

5. Stop the site (Ctrl+C in the terminal) and run `npm run dev` again.

That's it — the little "saved on this device" badge disappears, and every wish
is now stored in your database and shown to all your guests. 💛

---

## 🌐 Put it online for free (Vercel)

Vercel is made by the creators of Next.js and hosts sites like this for free.

1. Create a free account at **https://vercel.com** (sign in with GitHub is easiest).
2. Push this folder to a **GitHub** repository (or use the Vercel CLI).
3. In Vercel: **Add New → Project →** import your repository → **Deploy**.
4. **If you set up the guestbook**, add the two environment variables in Vercel:
   **Project → Settings → Environment Variables** →
   add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   then redeploy.

Your site goes live at a free `your-project.vercel.app` address. You can add a
custom domain later in Vercel's settings.

> Prefer Netlify? It works too — it auto-detects Next.js. Add the same two
> environment variables under Site settings → Environment variables.

---

## 🛠️ Handy commands

```bash
npm run dev     # run locally while editing (http://localhost:3000)
npm run build   # make the optimised production version
npm start       # run the production build locally
```

---

## 📁 Where things live

```
lib/config.js          ← ⭐ your details (edit this)
app/globals.css        ← colours, fonts, all styling
app/page.js            ← the order of the sections
app/layout.js          ← page title, fonts, <head>
app/api/wishes/route.js← the guestbook's save/load logic
components/             ← each section (Hero, Countdown, Events, …)
public/                 ← your images (couple.svg + gallery/)
```

---

## ❓ Small troubleshooting

- **Fonts look plain when building offline:** the fonts load from Google Fonts,
  so the first load needs internet. Once loaded they're cached.
- **The map is blank locally:** some networks block the Google Maps embed; it
  works once the site is deployed. The "Get Directions" button always works.
- **Countdown shows `––`:** that's just the very first moment before the timer
  starts; it fills in within a second.

---

Made with love for **Aanya & Arjun** — change that to your names in
`lib/config.js` and make it yours. 💛
