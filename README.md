# MERN Movie Booking Application

Lightweight movie-ticket booking web application built with MongoDB, Express, React and Node (MERN). This repository contains the API (Express + MongoDB) and the React frontend for browsing movies, creating bookings, and managing users/admins.

## Features

- Browse and search movies
- Add movies (admin)
- User authentication and profiles
- Create and view bookings
- Simple admin dashboard

## Tech stack

- Frontend: React (Create React App)
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)
- Authentication: JWT

## Prerequisites

- Node.js v16+ and npm
- MongoDB (local or Atlas)

## Quick start

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file in the project root with the following (example):

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/moviedb
JWT_SECRET=your_jwt_secret
```

3. Seed sample data (optional)

```bash
node scripts/seed.js
```

4. Run the app

```bash
npm run dev
```

By default the frontend runs on port 3000 and the backend on port 5000. Adjust `package.json` scripts or proxy settings as needed.

## Scripts

- `npm start` — run production build
- `npm run build` — build frontend into `build/`
- `npm run dev` — start backend and frontend in development (project-specific script)

## API (quick reference)

- `GET /api/movies` — list movies
- `GET /api/movies/:id` — movie details
- `POST /api/bookings` — create booking (auth)
- `GET /api/bookings` — list bookings (auth)
- `POST /api/users/login` — user login
- `POST /api/users/register` — user registration

See the `routes/` folder for complete endpoints and `controllers/` for implementation.

## Project structure (high level)

- `app.js` — Express app entry
- `controllers/` — route handlers
- `models/` — Mongoose models
- `routes/` — route definitions
- `scripts/seed.js` — seed sample data
- `src/` — React frontend source
- `build/` — production frontend build

## Contributing

Feel free to open issues or submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
