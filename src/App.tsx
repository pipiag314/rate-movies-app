import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<h1>This is Home page</h1>} />
          <Route path="/auth" element={<h1>sign up / sign in</h1>} />
          <Route path="/rated" element={<h1>your rated movies/tv shows</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
