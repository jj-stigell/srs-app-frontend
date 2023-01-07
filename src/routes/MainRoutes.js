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
//const UtilsColor = Loadable(lazy(() => import('../views/utilities/Color')));
//const UtilsShadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
//const UtilsMaterialIcons = Loadable(lazy(() => import('../views/utilities/MaterialIcons')));

// sample page routing
const NewsPage = Loadable(lazy(() => import('../views/news')));
const UnderConstruction = Loadable(lazy(() => import('../views/underConstruction')));

// account page
const AccountPage = Loadable(lazy(() => import('../views/account')));

// logout
const Logout = Loadable(lazy(() => import('../views/logout')));

const Study = Loadable(lazy(() => import('../views/study/StudyView')));


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
        '/xxx'
      ]}
    >
      <MainLayout>
        <Switch location={location} key={location.pathname}>
          <AuthGuard>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/study" component={StudyDecks} />
            <Route path="/achievements" component={UnderConstruction} />
            <Route path="/statistics/reviews" component={UnderConstruction} />
            <Route path="/statistics/kanji" component={UnderConstruction} />
            <Route path="/news" component={NewsPage} />
            <Route path="/settings/decks" component={UnderConstruction} />
            <Route path="/settings/account" component={AccountPage} />
            <Route path="/logout" component={Logout} />
            <Route path="/xxx" component={Study} />
          </AuthGuard>
        </Switch>
      </MainLayout>
    </Route>
  );
};

export default MainRoutes;
