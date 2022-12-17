import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Books from "./components/Books";
import Customers from "./components/Customers";

function App() {
  return (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Books />} />
      <Route path="/Books" element={<Books />} />
      <Route path="/Customers" element={<Customers />} />
    </Routes>
  </Router>
);
}

export default App;
