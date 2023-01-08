import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import StudyRoutes from './StudyRoutes';

// project imports
import config from './../config';

//-----------------------|| ROUTING RENDER ||-----------------------//

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to={config.defaultPath} />
      <React.Fragment>
        {/* Routes for authentication pages */}
        <AuthenticationRoutes />

        {/* Route for login */}
        <LoginRoutes />

        {/* Routes for main layouts */}
        <MainRoutes />

        {/* Routes for study layouts */}
        <StudyRoutes />
      </React.Fragment>
    </Switch>
  );
};

export default Routes;
