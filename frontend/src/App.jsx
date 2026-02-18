import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Footer from './components/Footer';
import ContactUs from './pages/ContactUs';
import StallOptions from './components/StallOptions';


// Home Component with Section IDs for smooth scroll
const Home = () => (
  <main>
    <Hero />
    <About />
    <Features />
    <StallOptions />
  </main>
);

// Layout for Public Pages
const PublicLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

function App() {
  return (
    
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Routes with Header/Footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />

            </Route>
        </Routes>
         
      </BrowserRouter>
   
  );
}

export default App;
