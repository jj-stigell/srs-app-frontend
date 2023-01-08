import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import Loadable from '../ui-component/Loadable';
import AuthGuard from './../utils/route-guard/AuthGuard';

const Study = Loadable(lazy(() => import('../views/study/StudyView')));

//-----------------------|| STUDY ROUTING ||-----------------------//

const StudyRoutes = () => {
  const location = useLocation();

  return (
    <Route
      path={[ '/studymode/deck/:id' ]}
    >
      <Switch location={location} key={location.pathname}>
        <AuthGuard>
          <Route path="/studymode/deck/:id" component={Study} />
        </AuthGuard>
      </Switch>
    </Route>
  );
};

export default StudyRoutes;
