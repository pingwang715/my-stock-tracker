import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Banner from "./components/Banner";
import TickerBar from "./components/TickerBar";

function App() {

  return (
    <>
      <Header />
      <TickerBar />
      <Banner />

      <Home />
      <Footer />
    </>
  )
}

export default App
