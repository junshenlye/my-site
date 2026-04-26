# jun_shen

> A personal site that stays honest — nothing published until it's real.

Built for a computing student in Singapore who wanted a home on the internet that reflects how he actually works: quietly, incrementally, and in public.

---

## The idea

Most portfolio sites are frozen in time. They show a version of you that existed at some point — and then slowly become a lie as you grow past them.

This site is built differently. The content is intentionally empty at launch. The writing section fills up as posts get written. Projects appear when they're worth documenting. Experience gets added when there's experience worth adding. Nothing is fabricated to make the page look fuller than it is.

The design reflects that too — clean holding states instead of placeholder content, a contribution graph that shows real activity, and a structure that makes adding one new thing as simple as editing a text file.

---

## What's here

### Writing
Notes from learning computing. The blog is for things worth writing down — explanations of concepts I had to work out myself, reflections on building things, observations about how software works. Written slowly, published when they're ready.

### Projects
Things built to understand. Not a portfolio of polished deliverables — more a record of learning through making. Each project gets a writeup that explains what it was, what the interesting problem was, and what came out of it.

### Experience
Roles and education, documented plainly. Added as they accumulate. No inflated titles or vague descriptions — just what happened and what it involved.

---

## The activity graph

The contribution heatmap on the landing page is pulled live from GitHub. It shows real commit activity — not a graphic, not a decoration. When there's nothing happening, the graph is quiet. When there's a lot happening, it shows.

It's there because I think showing up consistently matters more than showing off finished things. The graph is a record of the work, not the result.

The graph updates automatically every hour via ISR — so it's always current without needing to rebuild the site.

---

## How it stays current

The site is designed to be updated like a notebook, not rebuilt like a project. New content is a JSON entry and an HTML file. No CMS, no dashboard, no rebuild pipeline to think about. Write the post, drop the file in, push — it's live.

The same applies to everything else. A new project is two lines in a manifest. A new experience entry is a JSON object. The structure stays out of the way so the actual work of writing and building can happen without friction.

---

## Built with

Next.js · TypeScript · IBM Plex Mono + IBM Plex Sans · GitHub GraphQL API · Vercel

---

*Everything on this site is real or not yet here.*
