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

export const GET_DECK_SETTINGS = gql`
query DeckSettings($deckId: Int!) {
  deckSettings(deckId: $deckId) {
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

export const GET_LEARNING_STATS_BY_TYPE = gql`
query LearningStatisticsByType($cardType: CardType!, $reviewType: ReviewType!) {
  learningStatisticsByType(cardType: $cardType, reviewType: $reviewType) {
    matured
    learning
    new
  }
}
`;
