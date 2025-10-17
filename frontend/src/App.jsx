import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/ui/Navbar.jsx";
import Footer from "./components/ui/Footer.jsx";
import Privacy from "./pages/legal/Privacy.jsx";
import NotFoundPage from "./pages/Notfound.jsx";
import Tracks from "./components/Tracks.jsx";
import Drivers from "./pages/Drivers.jsx";
import { Home } from "./pages/Home.jsx";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-black">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <Home/>
              }
            />
            <Route
              path="/calendar"
              element={
                <h1 className="text-white text-5xl font-bold">calendar test</h1>
              }
            />
            <Route
              path="/tracks"
              element={<>
                <h1 className="text-white text-5xl font-bold">tracks test</h1>
                <Tracks/>
              </>
              }
            />

            <Route
              path="/Drivers"
              element={
                <>
                  <h1 className="text-white text-5xl font-bold p-2">Drivers</h1>
                  <Drivers/>
                </>
              }
            />

            <Route
              path="/Teams"
              element={
                <h1 className="text-white text-3xl font-bold">Drivers</h1>
              }
            />

            <Route
              path="/news"
              element={
                <h1 className="text-white text-3xl font-bold">news test</h1>
              }
            />

            <Route
              path="/about"
              element={
                <h1 className="text-white text-3xl font-bold">About Us</h1>
              }
            />

            <Route
              path="/privacy"
              element={
                <Privacy />
              }
            />

            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
