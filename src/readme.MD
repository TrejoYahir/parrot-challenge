# Parrot Software Coding Challenge

Frontend coding challenge for Parrot Software

This is the codebase for the Parrot Software challenge, it uses react 18 with vite as a in conjunction with [Vite](https://vitejs.dev/) as a build tool, [Redux Toolkit](https://redux-toolkit.js.org/) for state management, [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) for server communication as well as caching and [React Router](https://reactrouter.com/en/main) for routing.

Styling is done with [CSS modules](https://github.com/css-modules/css-modules).

Testing is done with [Vitest](https://vitest.dev/) and[React Testing Library](https://testing-library.com/)

## Live Preview

A live preview of the website is available [here](https://parrot-challenge.netlify.app)

## How to run locally

To run the app locally in development mode just run `npm install` after cloning the repo and `npm run dev` after.

## Deploy as a static site

To deploy as a static site first run `npm run build` to generate a `dist` folder, the contents of this folder then can be uploaded to any hosting service as is.

The command `npm run preview` will boot up a local static web server that serves the files from dist at http://localhost:4173. It's an easy way to check if the production build looks OK in your local environment.

## Deploy with Node.js

To deploy with node first copy the contents of the `dist` folder to the `server` folder and then deploy the contents of the `server`  folder to the desires environment like any Node.js app. The Node.js server is started with the `npm start` command.

## Deploy to other popular hosting services

A detailed guide on how to deploy to Github Pages, CloudFlare, Vercel and other popular hosting services can be found [here](https://vitejs.dev/guide/static-deploy.html)

