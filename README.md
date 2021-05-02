# AviGuardX App

This repository contain the information about the page which stores and returns images that are being used by [AviGuardX](https://github.com/jfcorsini/aviguardx). The images are being stored in AWS S3 and only the URLs are being stored in the database. We also store the current status of the computer, which can be either reading, tracking, or identifying.

## Stack

This project uses NextJS and it's deployed in Vercel so it's easier to have something deployed right away. It uses FaunaDB's GraphQL database to store the information regarding the detection entries.

## Run locally

Install packages, then run the development server:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)!

## Deploy

Whenever there is a new commit in the `main` branch, this project deploy it's latest content to [http://aviguardx.vercel.app/](http://aviguardx.vercel.app/).
