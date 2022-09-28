import React, { StrictMode, Suspense } from 'react';
import reportWebVitals from './reportWebVitals';
import thunk from 'redux-thunk';
import { ColorModeScript, Progress, ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider, ScrollRestoration } from "react-router-dom";
import * as ReactDOM from 'react-dom/client';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { reducers } from './redux/combinedReducers';

const Home = React.lazy(() => import('./pages/home'));
const PreviewRecipe = React.lazy(() => import('./pages/preview'));
const Login = React.lazy(() => import('./pages/login'));
const Registration = React.lazy(() => import('./pages/registration'));
const Favorites = React.lazy(() => import('./pages/favorites'));
const Conversation = React.lazy(() => import('./pages/conversation'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <h1>Page not found</h1>
  },
  {
    path: "/:reference",
    element: <PreviewRecipe />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />
  },
  {
    path: "/favorites",
    element: <Favorites />
  },
  // ::TODO
  {
    path: "/conversation",
    element: <Conversation />
  },
]);

const store = configureStore({
  reducer: reducers,
  compose: (applyMiddleware(thunk)),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })

})
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  // <StrictMode>
  <Provider store={store}>
    <ChakraProvider>
      <Suspense
        fallback={<Progress
          size='xs'
          colorScheme={'pink'}
          isIndeterminate />}>
        <ColorModeScript />
        <RouterProvider router={router} />
      </Suspense>
    </ChakraProvider>
  </Provider>
  //</StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
