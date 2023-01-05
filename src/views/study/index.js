/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/client';

// material-ui
import { Grid } from '@material-ui/core';

// project imports
import DeckCard from './DeckCard';
import { gridSpacing } from './../../store/constant';
import { GET_DECKS } from '../../queries/queries';
import { setDecks } from '../../store/deckReducer';

//-----------------------|| STUDY DECKS ||-----------------------//

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const decks = useSelector(state => state.decks);
  const userLanguage = useSelector(state => state.account.account.languageId);
  const dispatcher = useDispatch();
  const [ getDecks ] = useLazyQuery(GET_DECKS);

  const fetchDecks = async () => {
    try {
      const res = await getDecks({
        variables: {
          date: new Date()
        }
      });
      if (res.errors) {
        const error = res.errors.graphQLErrors[0].extensions.code;
        console.log(error);
      } else if (res.data) {
        dispatcher(setDecks(res.data.decks));
      }
    } catch(error) {
      console.log('error:', error);
    }
  };

  useEffect(async () => {
    setLoading(true);
    //if (decks.length === 0) await fetchDecks();
    await fetchDecks();
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          {decks.map(deck => (
            <Grid key={deck.id} item lg={4} md={6} sm={6} xs={12}>
              <DeckCard userLanguage={userLanguage} deck={deck} isLoading={isLoading} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
