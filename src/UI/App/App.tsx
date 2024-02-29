import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {PRIVATE_PAGES, PUBLIC_PAGES} from "../../constants/pages";

import {PageKey} from "../../types/pages";
import {Login} from "../pages/Login/Login";
import { Registration } from "../pages/Registration/Registration";
import {PublicPage} from "../components/PublicPage/PublicPage";
import {PrivateRoute} from "../components/PrivatePage/PrivatePage";
import {Main} from "../pages/Main/Main";

export function App() {
  return (
      <Routes>
        {PUBLIC_PAGES.map(({ key, route }) => {
          const Page = pagesMap[key];

          return (
              <Route
                  key={key}
                  path={route}
                  element={
                    <PublicPage>
                      <Page />
                    </PublicPage>
                  }
              />
          );
        })}

      {PRIVATE_PAGES.map(({ key, route }) => {
          const Page = pagesMap[key];

          return (
              <Route
                  key={key}
                  path={route}
                  element={
                      <PrivateRoute>
                          <Page />
                      </PrivateRoute>
                  }
              />
          );
      })}
      </Routes>
  );
}

const pagesMap: { [key in PageKey]: React.FC } = {
    login: Login,
    registration: Registration,
    main: Main
};
