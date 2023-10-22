import { Routes, Route } from "react-router-dom";
import Departments from "./pages/Departments";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Regions from "./pages/Regions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="departements" element={<Departments />} />
        <Route path="regions" element={<Regions />} />

        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
