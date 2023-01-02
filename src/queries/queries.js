import { gql } from '@apollo/client';

export const SESSIONS = gql`
  query Sessions {
    sessions {
      id
      browser
      os
      device
      createdAt
      expireAt
    }
  }
`;
