# Hire_Sphere

**Hire_Sphere** is a LinkedIn clone — a professional social network where users can sign up, create profiles, connect, post updates/articles, search people/jobs, message, and get notifications. This project is designed to go from a focused MVP to a full-featured product, with web-first design and mobile responsiveness.

---

## Table of Contents

1. [Project Goal](#project-goal)
2. [Scope](#scope)
3. [Tech Stack](#tech-stack)
4. [Functional Requirements](#functional-requirements)
5. [Data Models](#data-models)
6. [Key API Endpoints](#key-api-endpoints)
7. [Frontend Pages / Components](#frontend-pages--components)
8. [Development Plan / Milestones](#development-plan--milestones)
9. [Architecture & Scaling Notes](#architecture--scaling-notes)
10. [Security & Privacy](#security--privacy)
11. [Testing & QA](#testing--qa)
12. [Deployment Checklist](#deployment-checklist)
13. [Developer Tips](#developer-tips)
14. [Next Practical Steps](#next-practical-steps)

---

### Database Design

[View Database Design Online](https://017-anamika.github.io/Hire_Sphere/database_design.html)

---

## Project Goal

Make a professional social network where users can sign up, create profiles, connect, post updates/articles, search people/jobs, message, and get notifications — starting with an MVP and iterating towards a full product.

---

## Scope

### MVP (Must-Have)

- Email/password auth + social OAuth (Google)
- User profile (photo, headline, summary, experience, education, skills)
- Feed of posts (text + image), likes, comments
- Connect / follow model
- Basic search (people by name, skills, title)
- Private messaging (1:1)
- Notifications (connection request, message, like/comment)
- Responsive web UI, deployed

### v1 (Next)

- Endorsements / recommendations
- Rich articles (WYSIWYG), media uploads
- Job postings / apply flow
- People you may know suggestions
- Real-time notifications
- Profile analytics (views)

### Stretch / Scale

- Company pages, ads, newsletters, groups
- Advanced search & filters
- Feed ranking (ML)
- Video uploads, live events
- Mobile apps (React Native / native)

---

## Tech Stack

### Frontend

- React (Vite) + TypeScript
- Tailwind CSS (or MUI) for responsive UI
- React Query / Redux for state management
- TipTap or Draft.js for rich text (articles)

### Backend

- Node.js + TypeScript (Express / NestJS)
- REST or GraphQL API

### Database & Storage

- PostgreSQL for core data
- Elasticsearch / Postgres full-text search (MVP)
- AWS S3 for file storage

### Realtime & Queue

- Socket.IO / Pusher for messages & notifications
- BullMQ / Redis for background jobs

### Authentication & Infra

- JWT + OAuth (Google)
- SendGrid / SES for emails
- Hosting: Vercel (frontend) + Render / AWS ECS / DigitalOcean / Heroku (backend)
- CI/CD: GitHub Actions

### Monitoring

- Sentry / Datadog / Papertrail for logs and errors

---

## Functional Requirements

### Auth & User

- Sign up / login / logout / OAuth
- Email verification
- Profile creation & edit (photo, headline, location, industry)
- Profile sections: experiences, education, skills, resume upload

### Connections & Network

- Send request, accept/decline, remove connection
- Followers (optional)

### Feed & Content

- Create, edit, delete posts
- Like/unlike, comment, reply
- Share posts

### Search & Discovery

- Search people, jobs, companies by keywords

### Messaging

- 1:1 chat with history, typing indicators, read receipts (stretch)

### Notifications

- In-app badge, notification center, email digests

### Jobs (v1)

- Create job, apply (resume upload), manage applicants

### Admin

- Moderate content, user bans

### Non-Functional

- Mobile responsive
- Secure (OWASP basics)
- Horizontally scalable
- GDPR/privacy basics

---

## Data Models (Simplified)

### Users

`id, name, email, password_hash, headline, location, profile_pic_url, created_at, updated_at`

### Profiles

`summary, experiences(json), education(json), skills(array)`

### Connections

`id, requester_id, receiver_id, status, created_at`

### Posts

`id, author_id, content, media_urls(array), visibility, created_at, updated_at`

### Comments

`id, post_id, author_id, parent_comment_id, content, created_at`

### Likes

`id, user_id, target_type, target_id, created_at`

### Messages / Conversations

`conversation_id, participants(array), last_message_at`  
`messages: id, conversation_id, sender_id, content, attachments, created_at`

### Notifications

`id, user_id, type, payload(json), is_read, created_at`

### Jobs

`id, company_id, title, description, location, posted_by, created_at`

---

## Key API Endpoints (REST Examples)

### Auth

- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/refresh`

### Users / Profiles

- `GET /users/:id`
- `PATCH /users/:id`
- `GET /users?search=...`

### Connections

- `POST /connections` (send)
- `POST /connections/:id/accept`
- `DELETE /connections/:id`

### Posts

- `POST /posts`
- `GET /posts?feed=true` (paginated)
- `GET /posts/:id`
- `POST /posts/:id/like`
- `POST /posts/:id/comments`

### Messaging

- `POST /conversations`
- `GET /conversations/:id/messages`

### Notifications

- `GET /notifications`
- `POST /notifications/:id/mark-read`

> Consider GraphQL for flexible profile/feed queries.

---

## Frontend Pages / Components

### Pages

- Landing / Marketing
- Login / Signup / Forgot password
- Home feed
- Profile (view/edit)
- People search / results
- Jobs list / detail
- Messaging inbox / chat

### Components

- NavBar, SidePanel (suggestions)
- FeedCard, PostComposer, CommentList
- ProfileCard, ConnectButton, NotificationBell, Modal

### UX

- Infinite scroll or cursor pagination for feeds
- Optimistic UI for likes/comments
- Lazy-load images

---

## Development Plan / Milestones

### Milestone 0 — Setup

- Repo, linting, TypeScript, CI, DB migrations

### Milestone 1 — Auth & Profiles

- Signup/login, profile CRUD, image upload

### Milestone 2 — Posts & Feed

- Create posts, like/comment, feed query

### Milestone 3 — Connections & Search

- Connect flow, basic search

### Milestone 4 — Messaging & Notifications

- 1:1 chat (websocket), notifications

### Milestone 5 — Jobs, polish & deployment

- Job posting, apply, deploy to production

> Ship MVP at Milestone 3, then iterate

---

## Architecture & Scaling Notes

- Start monolith; extract microservices if needed
- Use CDN + S3 for static media
- Redis for caching & sessions
- Background workers for notifications & feed
- Chronological feed → advanced ranking later

---

## Security & Privacy

- Hash passwords with bcrypt/argon2
- Protect endpoints (rate limit, input validation)
- HTTPS everywhere
- Sanitize HTML, CSRF tokens if needed
- File type/size limits for uploads
- Role-based access for admin

---

## Testing & QA

- Unit tests (Jest)
- Integration tests (Supertest / Playwright)
- End-to-end tests (signup, post, connect)
- CI linting + type checks
- Manual usability testing

---

## Deployment Checklist

- Environment config & secrets
- Database migrations & backups
- HTTPS + domain setup
- Health checks & auto-scaling
- Monitoring (Sentry, Prometheus)
- Structured logging

---

## Developer Tips

- Prisma ORM for Postgres modeling
- Cloudinary for images
- Clerk/Auth0 for managed auth
- Socket.IO for chat
- Component libraries (MUI, shadcn/ui)
- Cursor pagination for feed APIs

---

## Next Practical Steps

1. Define MVP features from the list above
2. Choose stack: React + TS, Node + TS, Postgres
3. Initialize repo, CI, lint, prettier, tsconfig
4. Implement auth + profile edit + image upload
5. Iterate with short sprints: feature → test → deploy
