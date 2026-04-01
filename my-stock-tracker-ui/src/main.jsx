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
import Login from './components/Login.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import { stocksLoader } from './service/stocksLoader.js';
import StockDetail from './components/StockDetail.jsx';

const routeDefinitions = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/stocks" element={<StockListings />} loader={stocksLoader} />
    <Route path="/portfolios" element={<Portfolio />} loader={portfoliosLoader}/>
    <Route path="/news" element={<News />} />
    <Route path="/login" element={<Login />} />
    <Route path="/stocks/:stockId" element={<StockDetail />} />
  </Route>
);

const appRouter = createBrowserRouter(routeDefinitions);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
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
