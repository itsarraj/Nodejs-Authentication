# Node.js Authentication System

This is a complete authentication system that can be used as a starter code for creating any new application. The system includes user sign up, sign in, sign out, reset password, and Google login/signup functionalities.

## Table of Contents

-   Installation
-   Usage
-   Features
-   Folder Structure
-   Routes
-   Technologies Used
-   Contributing
-   License

## Installation

To install the project, follow these steps:

1. Clone the repository: git clone
2. Install the dependencies: npm install
3. Set up the environment variables by creating a .env file in the root directory and adding the necessary variables. Refer to the .env.example file for the list of required variables.
4. Start the server: npm start

## Usage

To use the authentication system, follow these steps:

1. Open your web browser and go to the URL http://localhost:8000, or use the custom port you defined in the .env file.
2. To create a new account, click on the "Sign up" button and fill out the necessary details. If you already have an account, click on the "Sign in" button to log in with your credentials.
3. After successful sign in or sign up, you will be redirected to the home page where you can access all the features of the application.
4. If you forget your password, click on the "Forgot password" button and follow the instructions to reset your password.
5. To log out of your account, click on the "Sign out" button in the navigation bar.

Features

## Folder Structure

The project has the following folder structure:

```
|-- assets
| |-- css
| | |-- footer.css
| | |-- forget_pass.css
| | |-- header.css
| | |-- home.css
| | |-- layout.css
| | |-- reset_pass.css
| | |-- signin.css
| | └── signup.css
| |-- img
| | └── fav.svg
| └── js
|-- config
| |-- environment.js
| |-- middleware.js
| |-- mongoose.js
| |-- nodemailer.js
| |-- passport-google-oauth2-strategy.js
| └── passport-local-strategy.js
|-- controllers
| |-- home_controller.js
| |-- password_controller.js
| └── users_controller.js
|-- mailers
| └── forget_password_mailer.js
|-- models
| └── User.js
|-- routes
| |-- index.js
| |-- passwordRoutes.js
| └── userRoutes.js
|-- views
| |-- _footer.ejs
| |-- forget_password.ejs
| |-- _header.ejs
| |-- home.ejs
| |-- layout.ejs
| |-- mailers
| | └── forget_password
| | └── forget_password.ejs
| |-- reset_password.ejs
| |-- reset-signin-password.ejs
| |-- user_sign_in.ejs
| └── user_sign_up.ejs
|-- LICENSE
|-- index.js
|-- package-lock.json
|-- package.json
└── README.md
```

## Routes

The project has the following routes:

index

-   GET / - Displays the home page.
-   USE /users - Mounts the user routes.
-   USE /password - Mounts the password routes.
    passwordRoutes

-   GET /forgot-password - Displays the forgot password page.
-   POST /forgot-password - Sends a reset link to the user's email.
-   GET /reset-password/:id/:token - Displays the reset password page.
-   POST /reset-password/:id/:token - Resets the user's password.
-   GET /reset-signin-password - Displays the reset password page after sign-in.
-   POST /reset-signin-password - Resets the user's password after sign-in.
    userRoutes

-   GET /sign-up - Displays the sign up form.
-   POST /create-account - Creates a new user account.
-   GET /sign-in - Displays the sign in form.
-   POST /create-session - Logs the user in.
-   GET /sign-out - Logs the user out.
-   GET /auth/google - Redirects the user to the Google authentication page.
-   GET /auth/google/callback - Callback URL for the Google authentication.

## Technologies Used

## The technologies used in this project are:

-   Node.js: a JavaScript runtime built on Chrome's V8 JavaScript engine.
-   Express.js: a popular Node.js web framework used for building web applications and APIs.
-   MongoDB: a NoSQL database that uses a document-oriented data model.
-   Mongoose: a MongoDB object modeling tool designed to work in an asynchronous environment.
-   EJS: a simple templating language that lets you generate HTML markup with plain JavaScript.
-   Passport: an authentication middleware for Node.js that supports various authentication strategies such as local, Google OAuth, etc.
-   Bcrypt: a library used to hash passwords.
-   JSON Web Tokens (JWT): a standard used to create access tokens for APIs.
-   Nodemailer: a Node.js module used to send emails.
-   PM2: a process manager for Node.js applications used to manage application processes, keeping them running in the background even after a server restart.

## Contributing to nodejs-authentication

Thank you for your interest in contributing to nodejs-authentication! This package is currently under development, and we welcome any contributions to help improve it.

### How to Contribute

To contribute to this package, please follow these steps:

1. Fork the repository and create a new branch for your changes.
2. Make your changes and ensure that they pass all tests.
3. Update the README.md file to reflect any changes you have made.
4. Submit a pull request to merge your changes into the master branch.

### Guidelines for Contributing

-   Please make sure tests are added for any new functionalities you introduce.
-   Make sure your code adheres to the existing coding style and conventions.
-   Keep your changes focused and avoid making multiple unrelated changes in a single pull request.

### Code of Conduct

We ask that all contributors follow our code of conduct when participating in this project. You can find it in the CODE_OF_CONDUCT.md file.

Thank you for helping to improve nodejs-authentication!

## License

License
This project is licensed under the MIT License - see the LICENSE file for details.
