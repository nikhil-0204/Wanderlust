# Wanderlust

Wanderlust is a full-stack web application for listing and discovering
vacation stays. Users can sign up, publish property listings with
photos, browse listings from other hosts, and leave reviews.

The application is built with **Node.js and Express.js**, uses
**EJS** templates for server-side rendering, **MongoDB** for data
storage, **Passport.js** for authentication, and **Cloudinary** for
image uploads.

> **Project status:** Local development project. Add a live demo link
> here if you deploy the application.

## Features

-   **User authentication:** Sign up, log in and log out using
    Passport.js (local strategy) with session-based authentication.
-   **Listings (CRUD):** Create, view, edit and delete property listings
    with a title, description, price, location and country.
-   **Image uploads:** Upload listing photos (PNG, JPG, JPEG) to
    Cloudinary using Multer.
-   **Reviews and ratings:** Logged-in users can add reviews to a
    listing, and authors can delete their own reviews.
-   **Authorization:** Only the owner of a listing can edit or delete
    it, and only the author of a review can delete it.
-   **Data validation:** Server-side validation of listings and reviews
    using Joi.
-   **Flash messages:** Success and error feedback after user actions.
-   **Persistent sessions:** Sessions stored in MongoDB using
    `connect-mongo`.
-   **Error handling:** Custom error class, async wrapper and error
    page for invalid routes and failed requests.
-   **Cascade delete:** Deleting a listing also deletes its reviews.

## Tech Stack

  Area                Technologies
  ------------------- ----------------------------------------------
  Frontend            EJS, ejs-mate (layouts), HTML, CSS, JavaScript
  Backend             Node.js, Express.js
  Database            MongoDB, Mongoose
  Authentication      Passport.js, passport-local-mongoose,
                      express-session
  Image storage       Cloudinary, Multer
  Validation          Joi
  Other               connect-flash, method-override, dotenv

## How It Works

1.  A user signs up or logs in, and a session is created and stored in
    MongoDB.
2.  The home page redirects to `/listings`, where all listings are shown.
3.  A logged-in user creates a listing, and the uploaded image is stored
    on Cloudinary.
4.  Any visitor can open a listing to see its details and reviews.
5.  A logged-in user can post a review on a listing.
6.  Middleware checks that the user is logged in and is the owner (or
    review author) before allowing edits or deletions.

## Routes

  Method            Route                           Description
  ----------------- ------------------------------- ---------------------------
  GET               `/listings`                     View all listings
  GET               `/listings/new`                 New listing form (login)
  POST              `/listings`                     Create a listing (login)
  GET               `/listings/:id`                 View a listing
  GET               `/listings/:id/edit`            Edit form (owner)
  PUT               `/listings/:id`                 Update a listing (owner)
  DELETE            `/listings/:id`                 Delete a listing (owner)
  POST              `/listings/:id/reviews`         Add a review (login)
  DELETE            `/listings/:id/reviews/:rid`    Delete a review (author)
  GET, POST         `/signup`                       Register a new user
  GET, POST         `/login`                        Log in
  GET               `/logout`                       Log out

## Project Structure

``` text
Wanderlust/
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── init/
│   ├── data.js
│   └── index.js
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── public/
│   ├── css/
│   │   ├── rating.css
│   │   └── style.css
│   └── js/
│       └── script.js
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
├── views/
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── error.ejs
├── app.js
├── cloudConfig.js
├── middleware.js
├── schema.js
├── package.json
├── .env
└── README.md
```

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

Install the following before starting:

-   [Node.js](https://nodejs.org/) (LTS recommended)
-   npm (included with Node.js)
-   [MongoDB](https://www.mongodb.com/) local installation or a MongoDB
    Atlas database
-   A [Cloudinary](https://cloudinary.com/) account for image uploads

### 1. Clone the repository

``` bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Wanderlust
```

Replace `<YOUR_GITHUB_REPOSITORY_URL>` with your actual GitHub
repository URL.

### 2. Install dependencies

``` bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

``` env
MONGO_URL=your_mongodb_connection_string
SECRET=your_strong_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

Never commit your real `.env` file, API keys, database credentials, or
session secret to GitHub.

### 4. (Optional) Seed sample data

The `init` folder contains sample listings. Run the seed script from
inside that folder, because it loads `../.env`:

``` bash
cd init
node index.js
cd ..
```

**Note:** The script deletes all existing listings first. It also assigns
every sample listing to a fixed user ID, so replace the `owner` value in
`init/index.js` with the ID of a user in your own database.

### 5. Start the application

``` bash
node app.js
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Use the application

-   Sign up for a new account and log in.
-   Create a listing with an image.
-   Browse, edit or delete your listings.
-   Open any listing and add a review.

## Security Notes

-   Keep API keys and database credentials in environment variables.
-   Do not push `.env` files to GitHub.
-   Use a strong, private session secret.
-   Validate incoming requests on the server.
-   Verify that the user owns a listing or review before allowing
    changes to it.

## Future Improvements

-   Add search and filters for listings.
-   Add maps to show listing locations.
-   Add booking functionality.
-   Add pagination for listings.
-   Deploy the application.

## Author

**Nikhil Vaidya**

-   GitHub: [nikhil-0204](https://github.com/nikhil-0204)
-   LinkedIn: [Nikhil Vaidya](https://www.linkedin.com/in/nikhil-vaidya02)

------------------------------------------------------------------------

If you find this project interesting, consider giving the repository a
⭐ on GitHub.
