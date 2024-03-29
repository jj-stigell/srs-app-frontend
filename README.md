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
- [i18next](https://www.i18next.com/) i18next is an internationalization-framework written in and for JavaScript. [MIT License](https://github.com/i18next/i18next/blob/master/LICENSE)
- [Formik](https://formik.org/) forms and form validation. [Apache-2.0 license](https://github.com/jaredpalmer/formik/blob/master/LICENSE)
- [Berry UI](https://github.com/codedthemes/berry-free-react-admin-template) Berry is a free Material UI admin dashboard template built with React. [MIT License](https://github.com/codedthemes/berry-free-react-admin-template/blob/main/LICENSE)

## TODOs
- [X] Project base
    - [X] Install react and required dependencies
    - [X] Set clear project structure
    - [X] Set styling rules on lint etc.
    - [X] Environment variables
- [ ] Frontend Components (with functionality)
    - [ ] Navbar
    - [X] Login page
    - [X] Logout
    - [ ] Dashboard
    - [ ] Settings
    - [X] Sign up page
    - [ ] Language selector
- [ ] Styling
    - [ ] Navbar
    - [X] Login page
    - [ ] Logout
    - [ ] Dashboard
    - [ ] Settings
    - [X] Sign up page
    - [ ] Language selector
    - [ ] Animations
- [ ] Backend communications
    - [ ] User related
        - [ ] User registration
            - [X] Validate input, with React-hook-form, if bypassed notification component used backend error messages.
            - [ ] Captcha to prevent bots ([reCAPTCHA](https://www.google.com/recaptcha/about/))
            - [X] Check that username, email etc not taken
            - [X] Register user
            - [ ] Email verification ([node mailer](https://nodemailer.com/about/) & [Amazon SES](https://aws.amazon.com/ses/))
        - [X] User login, JWT on succesful login, otherwise error
            - [X] Validate input
            - [X] Error on missing, incorrect input, mismatch with password
            - [X] Succesfully login, token and user saved to redux store
        - [X] User logout
            - [X] Send session termination request to backend
            - [X] Empty token and user data from redux store
        - [X] User change password
            - [X] Validate new data, confirmation must match, cannot be same as old one
        - [ ] Recover account (e.g. password forgotten)
        - [X] Validation of user input, including error messages
    - [ ] Card related
        - [ ] Get cards based on user ID
        - [ ] Reschedule card based on user input
- [ ] Redux
    - [ ] Reducers
        - [ ] User
            - [X] User data
            - [X] Token
            - [X] Session
            - [X] Update information
        - [X] Theme/customization UI
        - [ ] Cards
    - [ ] Storage
        - [X] [Persist](https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/)
        - [ ] Merging
- [ ] Testing
    - [ ] Unit testing for functions
    - [ ] Integration tests
    - [ ] e2e testing


## Authorization

[GraphQL Authentication](https://www.apollographql.com/docs/react/networking/authentication/)
