import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import MainLayout from './../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import AuthGuard from './../utils/route-guard/AuthGuard';

// dashboard routing
//const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));
import Dashboard from '../views/dashboard/Default';

// study routing
const StudyDecks = Loadable(lazy(() => import('../views/study')));

// utilities routing
const UtilsColor = Loadable(lazy(() => import('../views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('../views/utilities/MaterialIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('../views/sample-page')));

// account page
const AccountPage = Loadable(lazy(() => import('../views/account')));

// logout
const Logout = Loadable(lazy(() => import('../views/logout')));

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
  const location = useLocation();

  return (
    <Route
      path={[
        '/dashboard',
        '/study',
        '/achievements',
        '/statistics/reviews',
        '/statistics/kanji',
        '/news',
        '/settings/decks',
        '/settings/account',
      ]}
    >
      <MainLayout>
        <Switch location={location} key={location.pathname}>
          <AuthGuard>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/study" component={StudyDecks} />
            <Route path="/achievements" component={UtilsColor} />
            <Route path="/statistics/reviews" component={UtilsShadow} />
            <Route path="/statistics/kanji" component={UtilsShadow} />
            <Route path="/news" component={SamplePage} />
            <Route path="/settings/decks" component={UtilsMaterialIcons} />
            <Route path="/settings/account" component={AccountPage} />
            <Route path="/logout" component={Logout} />
          </AuthGuard>
        </Switch>
      </MainLayout>
    </Route>
  );
};

export default MainRoutes;
