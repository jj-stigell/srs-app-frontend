/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

// project imports
import Card from './card';
import LoadingPage from './LoadingPage';
import ReviewFinished from './ReviewFinished';
import { setCards } from '../../../store/cardReducer';
import { GET_CARDS_FROM_DECK } from '../../../queries/queries';

const Study = () => {
  const dispatcher = useDispatch();
  const cardStore = useSelector(state => state.cards);
  const account = useSelector(state => state.account);
  const [loading, setLoading] = useState(true);
  const deckId = Number(useParams().id);
  const [ loadCardsFromDeck ] = useLazyQuery(GET_CARDS_FROM_DECK);

  useEffect(async () => {
    const res = await loadCardsFromDeck({
      variables: {
        deckId: deckId,
        date: new Date(),
        newCards: true,
        languageId: account.account.languageId
      }
    });

    if (res?.errors) {
      const error = res.errors.graphQLErrors[0].extensions.code;
      console.log(res.errors);
    } else if (res?.data) {
      console.log(res.data.cardsFromDeck);
      setLoading(false);
      dispatcher(setCards(res.data.cardsFromDeck));
    }
  }, []);

  if (loading) return <LoadingPage />;

  if (!cardStore.activeCard) return <ReviewFinished />;

  return <Card />;
};

export default Study;
