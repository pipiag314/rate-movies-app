import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";
import Auth from "./pages/auth";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<h1>This is Home page</h1>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/rated" element={<h1>your rated movies/tv shows</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
