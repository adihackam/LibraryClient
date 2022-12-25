import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Books from "./components/Books";
import Customers from "./components/Customers";
import Loans from "./components/Loans";
import LoansCreate from "./components/LoansCreate";
import HomePage from "./components/HomePage";
import CustomersCreate from "./components/CustomersCreate";
import BooksCreate from "./components/BooksCreate";

function App() {
  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/Books" element={<Books />} />
        <Route path="/Customers" element={<Customers />} />
        <Route path="/Loans" element={<Loans />} />
        <Route path="/LoansCreate" element={<LoansCreate />} />
        <Route path="/CustomersCreate" element={<CustomersCreate />} />
        <Route path="/BooksCreate" element={<BooksCreate />} />

      </Routes>
    </Router>
  );
}

export default App;
