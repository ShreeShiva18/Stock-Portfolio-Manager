import React from "react";
import Investor from "./components/Investor";
import Nominee from "./components/Nominee";
import Portfolio from "./components/Portfolio";
import Stock from "./components/Stock";
import Transactions from "./components/Transactions";
import Bank from "./components/Bank";
import Company from "./components/Company";

function App() {
  return (
    <div>
      <h1>Stock Portfolio Database Management System</h1>
      <Investor />
      <Nominee />
      <Bank />
      <Portfolio />
      <Stock />
      <Transactions />
      <Company />
    </div>
  );
}

export default App;




