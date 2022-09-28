# Spaced Repetition System app frontend
Frontend for a [SRS](https://en.wikipedia.org/wiki/Spaced_repetition) app.

## Record of working hours for the Full Stack Open project
Project's record of working hours is in the file workinghours.md.
This file includes only hours spent developing the frontend.
Backend time keeping is in the backend GitHub [repository](https://github.com/jj-stigell/srs-app-backend)

## Tech stack
- [ReactJS](https://reactjs.org/)
- [GraphQL](https://graphql.org/)
- [React Redux](https://react-redux.js.org/)

## Libraries
- [i18next](https://www.i18next.com/) i18next is an internationalization-framework written in and for JavaScript.

## TODOs
- [X] Project base
    - [X] Install react and required dependencies
    - [X] Set clear project structure
    - [X] Set styling rules on lint etc.
    - [X] Environment variables
- [ ] Frontend Components (with functionality)
    - [ ] Navbar
    - [ ] Login page
    - [ ] Logout
    - [ ] Dashboard
    - [ ] Settings
    - [ ] Sign up page
    - [ ] Language selector
- [ ] Styling
    - [ ] Animations
- [ ] Backend communications
    - [ ] User related
        - [ ] User registration
            - [ ] Validate input
            - [ ] Captcha to prevent bots ([reCAPTCHA](https://www.google.com/recaptcha/about/))
            - [ ] Check that username, email etc not taken
            - [ ] Create user
            - [ ] Email verification ([node mailer](https://nodemailer.com/about/) & [Amazon SES](https://aws.amazon.com/ses/))
        - [ ] User login, JWT on succesful login, otherwise error
            - [ ] Validate input
            - [ ] Error on missing, incorrect input, mismatch with password
            - [ ] Succesfully login, safe to local storage
        - [ ] User logout
            - [ ] Send session termination request to backend
            - [ ] Empty token from local storage
        - [ ] User change password/personal data
            - [ ] Validate new data, confirmation must match, cannot be same as old one
            - [ ] Email, settings change
        - [ ] Recover account (e.g. password forgotten)
        - [ ] Validation of user input, including error messages
    - [ ] Card related
        - [ ] Get cards based on user ID
        - [ ] Reschedule card based on user input
- [ ] Redux
    - [ ] Reducers
    - [ ] Storage
- [ ] Testing
    - [ ] Unit testing for functions
    - [ ] Integration tests


## Authorization

[GraphQL Authentication](https://www.apollographql.com/docs/react/networking/authentication/)
