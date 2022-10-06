import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ... on Error {
        errorCode
      }
      ... on AccountToken {
        token {
          value
        }
        user {
          id,
          email,
          username
        }
      }
    }
  }
`;

export const REGISTER = gql`
  mutation createAccount($username: String!, $email: String!, $password: String!, $passwordConfirmation: String!) {
    createAccount(username: $username, email: $email, password: $password, passwordConfirmation: $passwordConfirmation) {
      ... on Error {
        errorCode
      }
      ... on Account {
        email
      }
    }
  }
`;

/*
OLD LOGIN

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)  {
      token {
        value
      } user {
        id,
        email,
        username
      }
    }
  }
`;

export const REGISTER = gql`
  mutation createAccount($username: String!, $email: String!, $password: String!, $passwordConfirmation: String!) {
    createAccount(username: $username, email: $email, password: $password, passwordConfirmation: $passwordConfirmation)  {
      email
    }
  }
`;
*/