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

export const GET_REVIEW_HISTORY = gql`
query ReviewHistory($limitReviews: Int!) {
  reviewHistory(limitReviews: $limitReviews) {
    date
    count
  }
}
`;

export const GET_DUE_COUNTS = gql`
query DueCount($limitReviews: Int!, $date: Date!) {
  dueCount(limitReviews: $limitReviews, date: $date) {
    date
    count
  }
}
`;

export const GET_CARDS_FROM_DECK = gql`
query CardsFromDeck($deckId: Int!, $date: Date!, $newCards: Boolean, $languageId: Language!) {
  cardsFromDeck(deckId: $deckId, date: $date, newCards: $newCards, languageId: $languageId) {
    id
    cardType
    reviewType
    createdAt
    updatedAt
    accountCard {
      id
      reviewCount
      easyFactor
      accountStory
      accountHint
      dueAt
      mature
      createdAt
      updatedAt
    }
    kanji {
      id
      kanji
      jlptLevel
      onyomi
      onyomiRomaji
      kunyomi
      kunyomiRomaji
      strokeCount
      createdAt
      updatedAt
      translation {
        keyword
        story
        hint
        otherMeanings
        description
        createdAt
        updatedAt
      }
      radicals {
        radical
        reading
        readingRomaji
        strokeCount
        createdAt
        updatedAt
        translation {
          translation
          description
          createdAt
          updatedAt
        }
      }
    }
    word {
      id
      word
      jlptLevel
      furigana
      reading
      readingRomaji
      createdAt
      updatedAt
      translation {
        translation
        hint
        description
        createdAt
        updatedAt
      }
    }
  }
}
`;
