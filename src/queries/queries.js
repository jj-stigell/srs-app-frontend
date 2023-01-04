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

export const GET_DECKS = gql`
query Decks($date: Date!) {
  decks(date: $date) {
    id
    deckName
    subscriberOnly
    languageId
    active
    createdAt
    updatedAt
    deckTranslations {
      id
      languageId
      title
      description
      active
      createdAt
      updatedAt
    }
    accountDeckSettings {
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
}
`;
