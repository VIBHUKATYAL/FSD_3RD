# Master Prompt — College Lecture Room Allocation System

## 1. ROLE

You are a senior **Full-Stack React Developer, UI/UX Engineer, and Backend Architect**.

Build a production-quality web application for a college that manages **lecture-room allocation and room availability**.

The application must feel like a carefully designed modern college operations product — **not generic AI-generated UI**. Prioritize visual hierarchy, spacing, typography, interaction quality, responsive behavior, accessibility, and realistic data.

---

## 2. PROJECT GOAL

Create a web application where college staff can:

- View all college rooms and their current lecture allocations.
- See which rooms are occupied or available.
- Search for empty rooms.
- Search/filter scheduled lectures.
- Add a lecture to a room.
- Edit an existing scheduled lecture.
- Delete/cancel a scheduled lecture.
- View lecturer name, subject, class/year, room, date, and time.
- Understand the room allocation visually at a glance.
- Avoid double-booking a room for overlapping lectures.

The system should start with **realistic seeded lecture allocations**, but all room and lecture data must come from the backend/database.

Do **not** hardcode lecture data inside React components.

---

# 3. COLLEGE ROOM STRUCTURE

The college has:

- **7 floors total**
- Ground Floor
- 1st Floor
- 2nd Floor
- 3rd Floor
- 4th Floor
- 5th Floor
- 6th Floor
- **8 rooms on every floor**
- Total: **56 rooms**

Use this room naming convention:

| Floor | Room Numbers |
|---|---|
| Ground | KC G01 – KC G08 |
| 1st | KC 101 – KC 108 |
| 2nd | KC 201 – KC 208 |
| 3rd | KC 301 – KC 308 |
| 4th | KC 401 – KC 408 |
| 5th | KC 501 – KC 508 |
| 6th | KC 601 – KC 608 |

Example:

`KC 401` = 4th floor, room 01.

The room list should be generated/seeded in the backend/database rather than manually duplicated across frontend files.

---

# 4. TECHNOLOGY STACK

Use a modern, maintainable stack.

### Frontend

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- TanStack Query for server state
- React Hook Form
- Zod for validation
- Lucide React for icons
- date-fns for date/time handling

### Backend

- Node.js
- TypeScript
- Express
- Zod
- PostgreSQL
- Prisma ORM

### Development

- ESLint
- Prettier
- Environment variables
- Git-friendly project structure

Do not use deprecated React APIs, deprecated libraries, or obsolete patterns.

Do not put secrets/API keys in frontend code.

---

# 5. VISUAL DIRECTION

The UI must look like a **premium modern college operations dashboard**.

Avoid:

- Generic AI-dashboard appearance
- Excessive gradients
- Neon colors everywhere
- Huge rounded cards
- Random glassmorphism
- Overuse of shadows
- Excessive animations
- Stock illustrations
- Unnecessary decorative elements

### Color direction

Use a primarily white/light interface with a sophisticated dark accent.

Suggested palette:

- Background: `#F7F8FA`
- Surface: `#FFFFFF`
- Primary: deep navy / near-black
- Accent: electric blue
- Success: green
- Warning: amber
- Danger: red
- Text: dark charcoal
- Muted text: cool gray
- Borders: subtle gray

The final palette can be refined, but maintain strong contrast and a professional visual identity.

### Typography

Use a modern sans-serif such as:

- Inter
- Geist
- Plus Jakarta Sans

Use typography deliberately:

- Large page heading
- Small uppercase labels where useful
- Strong numerical statistics
- Clear table hierarchy
- Comfortable line height

---

# 6. APPLICATION LAYOUT

Create a responsive application shell.

### Desktop

Left sidebar:

- Logo / College name
- Dashboard
- Rooms
- Schedule
- Available Rooms
- Lecturers
- Settings

Bottom:

- User/profile area

Main content:

- Header
- Page title
- Search/filter controls
- Content area

### Mobile

Use:

- Collapsible navigation
- Mobile-friendly filters
- Responsive cards
- Horizontally scrollable tables when necessary

The interface must remain usable at approximately:

- 1440px
- 1280px
- 1024px
- 768px
- 390px

---

# 7. DASHBOARD

Create a polished dashboard.

Header:

**Lecture Room Management**

Subtitle:

**B.Tech 1st Year • Academic Room Allocation**

Show summary cards:

1. Total Rooms
2. Occupied Rooms
3. Available Rooms
4. Today's Lectures

Example:

`56 Total Rooms`

`31 Occupied`

`25 Available`

`42 Today's Lectures`

These values must be calculated from backend data.

Do not hardcode them.

---

# 8. ROOM OVERVIEW

Create a room-management page.

Allow users to browse rooms by floor.

Example:

### Ground Floor
`KC G01` `KC G02` `KC G03` ... `KC G08`

### 4th Floor
`KC 401` `KC 402` ... `KC 408`

Each room should visually communicate:

- Available
- Occupied
- Next lecture
- Current lecture

Use subtle status indicators.

Example:

**KC 401**

`OCCUPIED`

`10:00 – 11:00`

`Data Structures`

`B.Tech 1st Year`

---

# 9. EMPTY ROOM SEARCH

This is one of the main features.

At the top of the Rooms / Available Rooms page, create a prominent search/filter section.

Example:

`Search rooms...`

Filters:

- Date
- Start time
- End time
- Floor
- Availability

The user should be able to enter:

**Date:** 22 Sep 2026  
**From:** 11:00  
**To:** 12:00

Then the application should return only rooms that have no conflicting lecture during that interval.

Example result:

```text
Available Rooms

KC 103
KC 204
KC 305
KC 401
KC 406
KC 602
```

Availability must be calculated by the backend/database.

Do not simply filter based on a hardcoded `available: true` field.

---

# 10. SCHEDULE PAGE

Create a schedule page showing lectures.

Columns:

| Time | Room | Subject | Lecturer | Class |
|---|---|---|---|---|
| 09:00–10:00 | KC 401 | Data Structures | Dr. Ananya Sharma | B.Tech 1st Year |
| 10:00–11:00 | KC 204 | Computer Networks | Prof. Rohan Mehta | B.Tech 2nd Year |

Include:

- Date selector
- Floor filter
- Room filter
- Lecturer filter
- Class filter
- Subject search

Allow switching between:

- List view
- Room view
- Day schedule view

---

# 11. LECTURE DATA

Create realistic sample data through database seed scripts.

Do NOT use generic placeholder values such as:

`Teacher 1`

`Subject A`

Instead use realistic names.

Examples:

### Lecturers

- Dr. Ananya Sharma
- Prof. Rohan Mehta
- Dr. Neha Kapoor
- Prof. Arjun Malhotra
- Dr. Priya Nair
- Prof. Karan Verma

### Subjects

- Data Structures
- Database Management Systems
- Computer Networks
- Operating Systems
- Object-Oriented Programming
- Mathematics
- Web Technology
- Computer Organization
- Software Engineering

### Classes

- B.Tech 1st Year
- B.Tech 2nd Year
- B.Tech 3rd Year
- B.Tech CSE 1A
- B.Tech CSE 1B
- B.Tech CSE 2A

The seed database should contain enough schedules to make the dashboard look realistic.

Use different rooms, lecturers, classes, dates and time slots.

---

# 12. ADD LECTURE

Create a polished modal/drawer for adding a lecture.

Fields:

- Subject
- Lecturer
- Class
- Date
- Start time
- End time
- Room

Before submission, validate:

- Required fields
- Start time < end time
- Valid date
- Room exists
- Lecturer exists
- No room conflict
- No lecturer conflict
- No invalid overlapping schedule

Example error:

> KC 401 is already occupied from 10:00 AM to 11:00 AM.

Show this error clearly without refreshing the page.

---

# 13. EDIT LECTURE

Every scheduled lecture must have an action menu.

Actions:

- Edit
- Delete

Edit should open the same form with existing values.

Example:

```text
KC 401
Data Structures
Dr. Ananya Sharma
B.Tech 1st Year
10:00 AM – 11:00 AM

[Edit] [Delete]
```

When editing, the backend must again check for conflicts.

Do not rely only on frontend validation.

---

# 14. DELETE LECTURE

Deleting a lecture should not happen immediately.

Show a confirmation dialog:

**Delete lecture?**

> This will remove the Data Structures lecture from KC 401 on 22 September.

Buttons:

`Cancel`

`Delete Lecture`

After successful deletion:

- Update UI immediately
- Refresh affected room availability
- Show a small success toast

---

# 15. BACKEND API

Create a clean REST API.

Suggested endpoints:

### Rooms

```http
GET /api/rooms
GET /api/rooms/:id
GET /api/rooms/available
```

Available-room query example:

```http
GET /api/rooms/available?date=2026-09-22&startTime=11:00&endTime=12:00
```

### Lectures

```http
GET /api/lectures
GET /api/lectures/:id
POST /api/lectures
PUT /api/lectures/:id
DELETE /api/lectures/:id
```

### Lecturers

```http
GET /api/lecturers
```

### Classes

```http
GET /api/classes
```

### Dashboard

```http
GET /api/dashboard
```

The dashboard endpoint should return calculated statistics.

---

# 16. DATABASE DESIGN

Use PostgreSQL with Prisma.

Suggested models:

### Room

```text
Room
- id
- roomNumber
- floor
- floorName
- capacity
- createdAt
- updatedAt
```

### Lecturer

```text
Lecturer
- id
- name
- department
- createdAt
- updatedAt
```

### Class

```text
Class
- id
- name
- year
- section
- department
- createdAt
- updatedAt
```

### Subject

```text
Subject
- id
- name
- code
- createdAt
- updatedAt
```

### Lecture

```text
Lecture
- id
- roomId
- lecturerId
- classId
- subjectId
- date
- startTime
- endTime
- createdAt
- updatedAt
```

Use proper foreign-key relationships.

---

# 17. ROOM AVAILABILITY LOGIC

A room is unavailable if an existing lecture overlaps the requested interval.

Two intervals overlap when:

```text
existingStart < requestedEnd
AND
existingEnd > requestedStart
```

Example:

Existing:

`10:00 – 11:00`

Requested:

`10:30 – 11:30`

Result:

`CONFLICT`

Existing:

`10:00 – 11:00`

Requested:

`11:00 – 12:00`

Result:

`AVAILABLE`

Implement this logic on the backend.

---

# 18. FRONTEND STATE

Use TanStack Query for server state.

Example operations:

```text
useQuery()
useMutation()
invalidateQueries()
```

After:

- Adding lecture
- Editing lecture
- Deleting lecture

invalidate the relevant queries so that:

- Dashboard statistics update
- Room status updates
- Available rooms update
- Schedule updates

Avoid manually duplicating server state throughout components.

---

# 19. COMPONENT STRUCTURE

Use reusable components.

Suggested structure:

```text
src/
├── components/
│   ├── layout/
│   ├── ui/
│   ├── rooms/
│   ├── lectures/
│   ├── dashboard/
│   ├── filters/
│   └── modals/
│
├── pages/
│   ├── Dashboard.tsx
│   ├── Rooms.tsx
│   ├── Schedule.tsx
│   ├── AvailableRooms.tsx
│   ├── Lecturers.tsx
│   └── Settings.tsx
│
├── hooks/
├── api/
├── types/
├── schemas/
├── utils/
├── routes/
└── App.tsx
```

Backend:

```text
server/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   ├── schemas/
│   ├── utils/
│   └── server.ts
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
└── package.json
```

Keep business logic out of React components.

---

# 20. ERROR HANDLING

Create proper error handling.

Frontend:

- Loading skeletons
- Empty states
- Error states
- Toast notifications
- Form validation messages
- Confirmation dialogs

Backend:

- Central error middleware
- HTTP status codes
- Structured JSON errors
- Validation using Zod
- Database error handling

Example:

```json
{
  "success": false,
  "message": "Room KC 401 is already occupied during the selected time."
}
```

---

# 21. SEARCH EXPERIENCE

The room search should feel fast and intentional.

Search bar:

```text
⌕  Search rooms by number, floor or status...
```

Filters should be easy to clear.

Provide:

`Clear filters`

Show result count:

`12 rooms available`

Do not make users navigate through multiple pages just to find an empty room.

---

# 22. ROOM CARD DESIGN

Room cards should have a clean visual hierarchy.

Example:

```text
KC 401
4th Floor

● OCCUPIED

10:00 – 11:00
Data Structures

Dr. Ananya Sharma
B.Tech 1st Year
```

Available:

```text
KC 406
4th Floor

● AVAILABLE

No lecture scheduled
```

The card should provide an obvious action such as:

`View Schedule`

or

`Assign Lecture`

---

# 23. SCHEDULE VISUALIZATION

Create a clean timeline/day view.

Example:

```text
09:00 ─────────────────────────

KC 401
Data Structures
Dr. Ananya Sharma
B.Tech 1st Year

10:00 ─────────────────────────

KC 204
Computer Networks
Prof. Rohan Mehta
B.Tech 2nd Year
```

Avoid overwhelming the user with too many colors.

Use colors primarily for status:

- Green = Available
- Amber/blue = Scheduled
- Red = Conflict/Error

---

# 24. UX DETAILS

Include polished micro-interactions:

- Hover states
- Focus states
- Button feedback
- Smooth modal transitions
- Toast notifications
- Skeleton loading
- Empty states
- Confirmation dialogs

Keep animations subtle.

Do not animate every element.

---

# 25. ACCESSIBILITY

Follow accessible UI practices:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Proper form labels
- Accessible dialogs
- Sufficient color contrast
- `aria-label` where needed
- Do not rely on color alone to communicate status

---

# 26. RESPONSIVE BEHAVIOR

On smaller screens:

- Sidebar becomes a drawer
- Cards become single-column
- Tables can horizontally scroll
- Filters stack vertically
- Modals become near-full-screen
- Buttons remain touch-friendly

Do not simply shrink desktop UI.

Re-design layouts where necessary.

---

# 27. SEED DATA

Create a Prisma seed script.

It should automatically create:

- 56 rooms
- Multiple lecturers
- Multiple subjects
- Multiple classes
- Realistic lecture schedules

Generate rooms programmatically.

Example logic:

```text
for each floor:
    create 8 rooms
```

Do not manually write 56 room records if they can be generated safely.

Seed enough lectures so that:

- Some rooms are occupied
- Some rooms are free
- Different floors have different occupancy
- There are multiple time slots
- The search feature can be demonstrated

---

# 28. IMPORTANT BUSINESS RULES

The backend must enforce:

1. A lecture must belong to an existing room.
2. A lecture must belong to an existing lecturer.
3. A lecture must belong to an existing subject.
4. A lecture must belong to an existing class.
5. End time must be after start time.
6. A room cannot have overlapping lectures.
7. A lecturer cannot teach two overlapping lectures.
8. A class cannot have two overlapping lectures.
9. Deleting a lecture should free the room for that time.
10. Availability must be calculated from actual schedules.

---

# 29. SECURITY

Implement basic production practices:

- Validate all incoming data
- Never trust frontend validation
- Use environment variables
- Do not expose database credentials
- Sanitize/validate request data
- Configure CORS correctly
- Use Helmet where appropriate
- Do not expose stack traces in production

---

# 30. API RESPONSE FORMAT

Keep API responses consistent.

Success:

```json
{
  "success": true,
  "data": {}
}
```

List:

```json
{
  "success": true,
  "data": [],
  "meta": {
    "total": 56
  }
}
```

Error:

```json
{
  "success": false,
  "message": "Human-readable error",
  "code": "ROOM_CONFLICT"
}
```

---

# 31. PHASED DEVELOPMENT PLAN

Build the project in phases. Do not attempt everything at once.

## PHASE 1 — Project Foundation

Build:

- React + Vite + TypeScript
- Tailwind
- Express + TypeScript
- Prisma
- PostgreSQL connection
- Environment configuration
- ESLint
- Prettier
- Basic folder structure

Deliverable:

Both frontend and backend run independently.

---

## PHASE 2 — Database + Seed Data

Build:

- Prisma schema
- Room model
- Lecturer model
- Subject model
- Class model
- Lecture model
- Relationships
- Seed script
- 56 generated rooms
- Realistic seed lectures

Deliverable:

Database can be reset and seeded successfully.

---

## PHASE 3 — Backend API

Implement:

- Room endpoints
- Lecture endpoints
- Lecturer endpoint
- Class endpoint
- Dashboard endpoint
- Availability endpoint
- Validation
- Conflict detection
- Error middleware

Deliverable:

Complete REST API that can be tested independently.

---

## PHASE 4 — Frontend Shell

Build:

- Sidebar
- Header
- Routing
- Dashboard layout
- Responsive navigation
- Design system
- Buttons
- Inputs
- Cards
- Dialogs
- Toasts
- Loading states

Deliverable:

The app looks polished before complex functionality is added.

---

## PHASE 5 — Dashboard

Implement:

- Total rooms
- Occupied rooms
- Available rooms
- Today's lectures
- Occupancy visualization
- Recent/upcoming lectures
- Floor summary

All values must come from APIs.

---

## PHASE 6 — Room Management

Implement:

- All 56 rooms
- Floor grouping
- Room cards
- Occupied/available status
- Room search
- Floor filter
- Room detail/schedule view

Deliverable:

Users can understand the state of the entire college.

---

## PHASE 7 — Available Room Finder

Implement:

- Date picker
- Start time
- End time
- Floor filter
- Search
- Backend availability calculation
- Available room results

This phase is a core feature and should receive extra UX attention.

---

## PHASE 8 — Lecture Scheduling

Implement:

- Add lecture
- Room selection
- Lecturer selection
- Subject selection
- Class selection
- Date/time selection
- Backend conflict validation
- Friendly error messages

---

## PHASE 9 — Edit + Delete

Implement:

- Edit lecture
- Delete lecture
- Confirmation dialog
- Backend validation
- Automatic UI refresh
- Toast feedback

---

## PHASE 10 — Schedule Views

Implement:

- Daily schedule
- List view
- Room view
- Filters
- Lecturer filter
- Class filter
- Subject search
- Date navigation

---

## PHASE 11 — UI POLISH

Perform a dedicated visual pass.

Improve:

- Spacing
- Typography
- Color hierarchy
- Empty states
- Skeletons
- Hover states
- Mobile layouts
- Accessibility
- Form UX
- Modal UX

The result should look like a real SaaS product rather than a student CRUD project.

---

## PHASE 12 — TESTING + FINALIZATION

Test:

- Room creation/seed
- Lecture creation
- Room conflicts
- Lecturer conflicts
- Class conflicts
- Edit lecture
- Delete lecture
- Availability search
- Dashboard calculations
- Empty states
- Mobile responsiveness
- API errors

Then:

- Remove unused code
- Remove console logs
- Fix TypeScript errors
- Fix lint errors
- Improve loading states
- Add README
- Add setup instructions
- Add `.env.example`

---

# 32. FINAL USER FLOW

The main flow should feel like this:

```text
Open Dashboard
       ↓
See today's room occupancy
       ↓
Need a room?
       ↓
Open "Available Rooms"
       ↓
Select date + time
       ↓
See available rooms
       ↓
Choose KC 401
       ↓
Assign Lecture
       ↓
Select subject
Select lecturer
Select class
       ↓
Submit
       ↓
Backend checks conflicts
       ↓
Lecture created
       ↓
KC 401 becomes occupied
       ↓
Dashboard + schedule update automatically
```

---

# 33. FINAL QUALITY REQUIREMENT

Do not stop when the CRUD functionality works.

The application should feel:

- Fast
- Clean
- Modern
- Professional
- Intuitive
- Responsive
- Realistic
- Production-oriented

The most important visual feature is the **room availability experience**.

The user should immediately understand:

> "Which rooms are free right now, and what is happening in every room?"

Build the interface around that question.

---

# 34. IMPLEMENTATION INSTRUCTION FOR THE AI CODING AGENT

When implementing this project:

1. First inspect the existing repository.
2. Do not destroy existing working code unless necessary.
3. Create the project in the phases above.
4. After every phase, verify that the application still runs.
5. Keep frontend and backend responsibilities separate.
6. Never hardcode database data into UI components.
7. Use realistic seed data.
8. Use reusable components.
9. Keep API calls in a dedicated API layer.
10. Keep validation schemas separate from UI components.
11. Keep business logic in backend services.
12. Use TypeScript throughout.
13. Fix errors before moving to the next phase.
14. Do not create fake functionality that only looks functional.
15. Every button that appears functional must actually work.
16. Do not use placeholder screens where a real implementation is expected.
17. Prioritize the room availability/search experience.
18. Make the final UI visually refined and deliberately designed.

---

# 35. DEFINITION OF DONE

The project is complete only when a user can:

- Open the dashboard.
- See live room statistics.
- Browse all 56 rooms.
- Filter rooms by floor.
- Search rooms.
- Search for rooms available during a selected date/time.
- See which lectures occupy rooms.
- Add a lecture.
- Receive a conflict error when a room is already occupied.
- Edit a lecture.
- Delete a lecture.
- See availability update after changes.
- Use the application comfortably on desktop and mobile.

The final product should look and behave like a **real college room-allocation platform**, not a basic CRUD demo.
