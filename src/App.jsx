import { BrowserRouter, Routes, Route } from "react-router-dom"; //to enable routing
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Tasks from "./pages/Tasks.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        {/* Home Page (Placeholder) */}
        <Route path="/" element={<Home></Home>} />

        {/* Tasks Page (Placeholder) */}
        <Route path="/tasks" element={<Tasks></Tasks>} />

        {/* Catch-all for unknown routes */}
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
