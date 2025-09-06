# Ember (Early Build)

Ember is a developer tool built with Vite and Express to streamline full-stack project creation and management.

With Ember, you can quickly spin up projects that include a Vite frontend, an Express backend, and a local PostgreSQL database.

## Core Features

 1. Install packages
 2. Enable Git for version control
 3. Deploy and Redeploy to Github
 4. Run projects
 5. Open projects in editor 
 6. Open project in terminal
 7. Deploy and Redeploy to Cloudflare (Frontend only)
 8. Enable Prisma (Backend only)
 9. Connect to Database (Backend only)
 10. View Database in Prisma Studio (Backend only)


## Ember Dependencies 

- `wangler` - version 4.23 

-  `psql` - version 17.6

-  `node` - version 20.19.0

-  `gh` - version 2.4.0


## Ember Project Structure 

`ember-api` - Backend API (Express + Prisma)

`ember-ui` - User interface (Vite + React)

`ember-scripts` - CLI scripts and utilities

`ember-project` - Folder where generated projects live


## Getting Started with Ember 

1. Create a local database for Ember:
``` sh
createdb <database name>
```

2. Start `ember-api`:
``` sh
cd ember-api
npm install
npm run dev
```

3. Start `ember-ui`:
``` sh
cd ember-ui
npm install 
npm run dev
```

4. Go to `http://localhost:3000` in your browser of choice

## Found a bug (feature)? 

- Open an issue, or
- Submit a pull request