import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<h1 className="text-white text-3xl font-bold">Welcome to the Home Page</h1>} />
            <Route path="/about" element={<h1 className="text-white text-3xl font-bold">About Us</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
