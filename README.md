# FullStack Application

## User Reminder Notes

User will be able to create some notes he/she does not want to forget.

## Tech Stack (Monorepo)

- **Frontend:** Next.js, React.js, TypeScript, TailwindCSS
- **Backend:** Express, Node, TypeScript
- **Database:** PostgreSQL, Prisma
- **Package Manager**: pnpm

## Architecture

### Frontend

Following the architecture that Next.js builds with App Router all pages are defined within the `src/app` folder.
I have created a scaffolding that should be easy to read where things are and how are they related to each other, for example in the folder `src/context` there's a `UserContext.tsx` file and at the same level we will find the folder `src/hooks` the `useUser.tsx` custom hook that will use the value of the `UserContext`.

I have decided to define components in a modular way where we can build pages in a re-usable way with small pieces, we have an example of that for the Login page, we have the folder `src/components/pages/LoginPage.tsx` that is built from `src/components/modules/authentication` modules and these modules are built from re-usable components from `src/components/common`.

### Backend

I have decided to go with Hexagonal Architecture for the backend because it allows small applications to be ready to scale and easy to maintain, separating core business logic from external dependencies like databases, authentication services like `Cognito` the one I used, and the User Interface.

The domain layer in my backend clearly provides the information about the 2 entities (DTOs), and what actions we can do with each.

For now it is limited to a CRUD of `Notes` and Create and Find `User`.

It is important to mention that `cognitoId` is slightly coupled to my application right now, but we can easily abstract it to make this id more generic that could become from any Provider.

## How to run the Application

# IMPORTANT

I have decided to publish the `.env` files for the Frontend and Backend so my reviewers can test my application accurately. However, it is important to mention that environment variables should not be committed and should be handled by the host provider instead.

NEVER publish Secret Keys! I have done this time just for the matter of Curotec company reviewing and testing, but again, this should NEVER happen on a Production environment, not even Staging or Development.

## Pre-requisites

- docker-compose
- pnpm (Package manager)

## Initialize Database

Run `docker-compose up` - keep this terminal up and running.

## Database Seed (Optional)

Run `cd backend && npx prisma db seed`
I have created a `seed` file to create some data for my user, but given this user comes from my personal Cognito Auth, I would suggest to create a new User directly on the application.

## Install Dependencies

On a separate terminal, make sure you are placed at the root of the project and run `pnpm install`

This command will install dependencies for both repositories `frontend` and `backend`.

## Run both Applications

On the same terminal, run `pnpm run dev`

Verify both applications are running:

- Backend on port `4000`
- Frontend on port `3000`

Open a Browser: `http://localhost:3000/login`

Click `Login` button and create a new User.

Notice the Cognito Provider for Authentication.

After that you should be taken to the `/dashboard` page where you can interact with the Notes App.

### Expected UI

<img src="https://github.com/mesparza942/nextjs-fullstack/blob/main/assets/app-login-page.png"/>

<img src="https://github.com/mesparza942/nextjs-fullstack/blob/main/assets/cognito-login.png"/>

<img src="https://github.com/mesparza942/nextjs-fullstack/blob/main/assets/app-dashboard-page.png"/>
