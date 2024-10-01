# Events Platform Project

# [Bar-None Club](https://events-platform-project.onrender.com)


A platform for managing and sharing live events, featuring Google Calendar integration and secure payment options.

## Project Overview

This full-stack application, developed as a solo project, imagines a Bristol venue called *Bar-None Club*. It was built using **JavaScript (ReactJS)** for the frontend, **CSS** and **HTML** for styling and structure, and **SQL** for managing data. It integrates key features like event management, user authentication, secure payments, and accessibility features.

### Database

The backend connects to a **PostgreSQL** database hosted on **Tembo** to manage user and event data, such as event titles and descriptions. During development, a locally hosted PostgreSQL database was used. Database credentials and connection strings are securely injected as environment variables in the `connection.js` file to avoid exposure of sensitive information.

### Hosting

- **Frontend:** Deployed using a **Vite** server hosted on **Render**.
- **Backend:** Hosted on **Render** with an **Express** server.
- **Database:** Managed through a **PostgreSQL** instance hosted on **Tembo**.

### Security

User login information is secured via **bcrypt** password hashing, ensuring no plaintext passwords are stored in the system. Environment variables protect sensitive data such as database credentials and API keys.

### User Accounts

The platform supports individual user accounts, allowing users to log in, and manage their event bookings. Passwords are securely hashed, and users' information is stored in the database.

You can log in using the following demo accounts:

- **janedoe / janedoe**
- **johndoe / johndoe**
- **generic_user / generic_user**
- **admin / admin** (The only account with permissions to post new events)

All users can view and book events, but only the **admin** account has permission to create new events on the platform.

## Key Features

- **Google Calendar integration**: Users can add events to their Google Calendar with pre-filled event information.
- **Payment options**: Integrated with **Stripe** to handle payments for paid events, ensuring secure transactions.
- **Hosted on free distribution platforms**

## Additional Features

- **Error handling**: Provides detailed error messages for actions such as unauthorized HTTP methods on specific endpoints.
- **Optimistic rendering**: Enhances user experience by instantly updating the interface when users watch or book events.
- **Loading states**: The app displays loading messages while data is being fetched, ensuring users are aware of ongoing processes.

## Payment Integration

The application uses the **Stripe API** for processing payments. All secret keys and sensitive information are stored in environment variables, ensuring they are never exposed in the codebase. This guarantees secure and reliable payment processing for paid events.

## Google Calendar Integration

Google Calendar integration allows users to add events directly to their calendars. A new browser tab opens with pre-filled event details, ensuring that users can keep track of their scheduled events without leaving the platform.

## Project Structure

The project is organized with best practices in mind, ensuring maintainable and reusable code. The backend and frontend are separated, with npm configurations in the root directory allowing the project to be run locally using a single command. **Nodemon** is used during development to automatically reload the application when changes are made.

## Accessibility

Accessibility features have been implemented to ensure a smooth user experience across all devices and assistive technologies. The platform performs well on **Google Lighthouse** audits by:

- Ensuring adequate contrast between text and backgrounds for readability.
- Utilizing semantic HTML to improve navigation for assistive technologies.
- Implementing **ARIA attributes** to communicate loading states to users relying on screen readers.
- **Responsive design**: The event cards and buttons dynamically react to user interactions, such as mouse hovering or touch. Buttons change color and navbar links adapt in shape, providing feedback and making navigation intuitive and easy to understand.
- **Device-specific styling**: The platform includes different styling for touchscreen devices to optimize content fit and interactions. This ensures that the layout adjusts appropriately whether the user is on a desktop or mobile device, providing an improved user experience across various devices.

## Running the Application Locally

### Prerequisite npm Packages

#### Frontend

##### Dependencies

- **@stripe/stripe-js**: ^4.5.0
- **axios**: ^1.7.7
- **react**: ^18.3.1
- **react-dom**: ^18.3.1
- **react-router-dom**: ^6.26.1
- **sass**: ^1.79.3
- **stripe**: ^16.12.0

##### DevDependencies

- **@eslint/js**: ^9.9.0
- **@types/react**: ^18.3.3

#### Backend

##### Dependencies

- **bcrypt**: ^5.1.1
- **body-parser**: ^1.20.3
- **cors**: ^2.8.5
- **dotenv**: ^16.4.5
- **express**: ^4.19.2
- **pg**: ^8.12.0
- **pg-format**: ^1.0.4
- **stripe**: ^16.12.0

##### DevDependencies

- **jest**: ^29.7.0
- **nodemon**: ^3.1.4
- **supertest**: ^7.0.0

### Global

- **concurrently** ^9.0.1
### PostgreSQL Installation and Local Setup

Before running the application locally, ensure PostgreSQL (PSQL) is installed on your system. You can follow the official installation guide based on your operating system:

- **PostgreSQL Installation Guide**: [https://www.postgresql.org/download/](https://www.postgresql.org/download/)

Once installed, configure your local environment as follows:

1. **Create the `.env.development` File**:
   - Navigate to the root directory and create a file named `.env.development`.
   - Add the following environment variables, customized to match your local PostgreSQL setup:

    ```env
    PGDATABASE=bar_none_database
    PGUSER=`YOUR_POSTGRES_USER_NAME`
    PGPASSWORD=`YOUR_POSTGRES_PASSWORD`
    PGHOST=localhost
    PGPORT=5432

    HOMEPAGE_URL=http://localhost:5173
    API_BASE_URL=http://localhost:9090/api

   
   // optional - if you are using Stripe API: 
   STRIPE_SECRET_KEY=`your-stripe-secret-key`
   STRIPE_PUBLIC_KEY=`your-stripe-public-key`
    ```

   These values should match your local PostgreSQL database configuration. The `HOMEPAGE_URL` points to your local Vite frontend server, and `API_BASE_URL` is for your Express backend server.

1. **Install Required npm Packages**:
   - In the root directory of the project, run the following command to install all required dependencies for both the frontend and backend:
   
     ```bash
     npm install-all
     ```

2. **Start the Servers**:
   - Once all packages are installed, run the following command in the root directory to start the development servers:
   
     ```bash
     npm run dev
     ```

   This will automatically handle PostgreSQL database creation and seeding, followed by starting the **Vite** frontend and **Express** backend servers.


4. **Open in browser**
   - Navigate to localhost:5173 or localhost:PORT_VITE_IS_RUNNING_ON
