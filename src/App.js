import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Books from "./components/Books";
import Customers from "./components/Customers";
import Loans from "./components/Loans";
import LoansCreate from "./components/LoansCreate";
import HomePage from "./components/HomePage";

function App() {
  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Books" element={<Books />} />
        <Route path="/Customers" element={<Customers />} />
        <Route path="/Loans" element={<Loans />} />
        <Route path="/LoansCreate" element={<LoansCreate />} />
      </Routes>
    </Router>
  );
}

export default App;
