import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Books from "./components/Books";
import Customers from "./components/Customers";
import Loans from "./components/Loans";


function App() {
  return (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Books />} />
      <Route path="/Books" element={<Books />} />
      <Route path="/Customers" element={<Customers />} />
      <Route path="/Loans" element={<Loans />} />
    </Routes>
  </Router>
);
}

export default App;
