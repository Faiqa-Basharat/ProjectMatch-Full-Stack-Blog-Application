# ProjectMatch – Full Stack Blog Application

A full stack web app where students register, log in, and write, edit, search and manage blog posts. Built during the Codomax internship.

**Live demo:** _add your Netlify/Vercel link here_
**API:** _add your Render link here_

## Features

- **Authentication:** register and log in with JWT; passwords are hashed with bcrypt
- **Blog CRUD:** create, read, update and delete blogs (only the author can edit or delete)
- **Search and categories:** filter blogs by keyword and category
- **Private dashboard:** shows only the logged-in user's blogs, with stats and account details
- **Profile and logout:** account details, editable bio and skills, and a logout that clears the session
- **Responsive UI:** works on phones, tablets and desktops, with a fixed navigation bar

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas with Mongoose |
| Auth | JSON Web Tokens, bcryptjs |
| Hosting | Render (API), Netlify or Vercel (frontend) |

## Project structure

```
Codomax-Internship/
├── Back-end/
│   ├── middleware/auth.js     # checks the JWT on private routes
│   ├── models/                # User and Blog schemas
│   ├── routes/                # auth and blogs endpoints
│   ├── server.js
│   └── .env.example
└── Front-end/
    ├── index.html, login.html, register.html
    ├── dashboard.html, profile.html, explore.html
    ├── blogs.html, blog.html, write.html
    └── config.js, site.css, auth.css, blog.css, blog-common.js
```

## Run it locally

**Requirements:** Node.js 18+ and a free MongoDB Atlas cluster.

```bash
cd Back-end
npm install
cp .env.example .env      # then fill in your own values
npm run dev
```

The API runs at `http://localhost:5000`. Open `Front-end/index.html` with a local server such as VS Code Live Server.

### Environment variables (`Back-end/.env`)

| Name | Description |
|---|---|
| `PORT` | Port for the API (default 5000) |
| `MONGO_URI` | MongoDB Atlas connection string, ending in `/projectmatch` |
| `JWT_SECRET` | Long random text used to sign login tokens |
| `FRONTEND_URL` | Deployed frontend address (production only, enables CORS for it) |

Never commit `.env`; it is listed in `.gitignore`.

## API endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Create an account, returns a token |
| POST | `/api/auth/login` | No | Log in, returns a token |
| GET | `/api/auth/me` | Yes | Current user's account details |
| GET | `/api/blogs` | No | All blogs (`?search=` and `?category=` filters) |
| GET | `/api/blogs/mine` | Yes | Only the logged-in user's blogs |
| GET | `/api/blogs/:id` | No | One blog |
| POST | `/api/blogs` | Yes | Create a blog |
| PUT | `/api/blogs/:id` | Yes (author) | Update a blog |
| DELETE | `/api/blogs/:id` | Yes (author) | Delete a blog |

Send the token as `Authorization: Bearer <token>`.

## Deployment

1. **Backend (Render):** Web Service, root directory `Back-end`, build `npm install`, start `npm start`, and add the environment variables above.
2. **Frontend (Netlify or Vercel):** publish the `Front-end` folder.
3. Set `PRODUCTION_API` in `Front-end/config.js` to the Render address plus `/api`.

## Screenshots

_Add screenshots of the login page, blog list, blog detail and dashboard here._

## Author

**Faiqa Basharat** – Codomax internship project
