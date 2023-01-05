import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      session
      account {
        id
        email
        emailVerified
        username
        languageId
        lastLogin
        createdAt
        updatedAt
      }
    }
  }
`;

export const REGISTER = gql`
  mutation CreateAccount($email: String!, $username: String!, $password: String!, $passwordConfirmation: String!, $languageId: Language) {
    createAccount(email: $email, username: $username, password: $password, passwordConfirmation: $passwordConfirmation, languageId: $languageId) {
      id
      email
      emailVerified
      username
      languageId
      lastLogin
      createdAt
      updatedAt
    }
  }
`;

export const LOGOUT = gql`
  mutation Mutation {
    logout
  }
`;

export const DELETE_SESSION = gql`
  mutation DeleteSession($sessionId: String!) {
    deleteSession(sessionId: $sessionId)
  }
`;

export const CHANGE_PASSWORD = gql`
mutation ChangePassword($currentPassword: String!, $newPassword: String!, $newPasswordConfirmation: String!) {
  changePassword(currentPassword: $currentPassword, newPassword: $newPassword, newPasswordConfirmation: $newPasswordConfirmation) {
    id
    email
    emailVerified
    username
    languageId
    lastLogin
    createdAt
    updatedAt
  }
}
`;

export const CHANGE_DECK_SETTINGS = gql`
mutation ChangeDeckSettings($deckId: Int!, $newCardsPerDay: Int, $reviewsPerDay: Int, $reviewInterval: Int, $favorite: Boolean) {
  changeDeckSettings(deckId: $deckId, newCardsPerDay: $newCardsPerDay, reviewsPerDay: $reviewsPerDay, reviewInterval: $reviewInterval, favorite: $favorite) {
    id
    accountId
    deckId
    favorite
    dueCards
    reviewInterval
    reviewsPerDay
    newCardsPerDay
    createdAt
    updatedAt
  }
}
`;
