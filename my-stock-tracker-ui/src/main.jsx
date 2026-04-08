import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { ToastContainer, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import StockListings from './components/StockListings.jsx';
import Portfolio, { portfoliosLoader } from './components/Portfolio.jsx';
import News from './components/News.jsx';
import Login, { loginAction } from './components/Login.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import { stocksLoader } from './service/stocksLoader.js';
import StockDetail from './components/StockDetail.jsx';
import Register from './components/Register.jsx';
import { StockProvider } from './store/stock-context.jsx';

const routeDefinitions = createRoutesFromElements(
  <Route path="/" id="root" element={<App />} loader={portfoliosLoader} errorElement={<ErrorPage />}>
    <Route index element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/stocks" element={<StockListings />} loader={stocksLoader} />
    <Route path="/portfolios" element={<Portfolio />} />
    <Route path="/news" element={<News />} />
    <Route path="/login" element={<Login />} action={loginAction} />
    <Route path="/register" element={<Register />} />
    <Route path="/stocks/:stockId" element={<StockDetail />} />
  </Route>
);

const appRouter = createBrowserRouter(routeDefinitions);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StockProvider>
      <RouterProvider router={appRouter} allbackElement={<div>Loading...</div>} />
    </StockProvider>
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      draggable
      pauseOnHover
      theme={localStorage.getItem("theme") === "dark" ? "dark" : "light"}
      transition={Bounce}
    />
  </StrictMode>,
)
