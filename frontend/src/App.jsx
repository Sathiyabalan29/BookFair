import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
import StallOptions from "./components/StallOptions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TermsAndConditions from "./components/TermsAndConditions";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import FAQ from './pages/FAQ';
import BookingHistory from "./pages/user/BookingHistory";

import { ReservationProvider } from "./context/ReservationContext";
import UserLayout from "./components/user/UserLayout";

import VenueMap from "./pages/map/VenueMap";
import BookingPage from "./pages/map/BookingPage";

import PaymentMethodSelection from './components/PaymentMethodSelection';
import CreditCardPage from './pages/payment/CreditCardPage';
import DebitCardPage from './pages/payment/DebitCardPage';
import BankTransferPage from './pages/payment/BankTransferPage';
import PaymentHistory from './components/PaymentHistory';
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
      <ReservationProvider>
        <ScrollToTop />
        <Routes>
          {/* Public Routes with Header/Footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/stalls" element={<StallOptions />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/faq" element={<FAQ />} />
            {/* User Profile Dashboard */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Profile />} />
              <Route path="bookings" element={<BookingHistory />} />
               <Route path="payments" element={<PaymentHistory />} />
            </Route>

            {/* Payment Routes */}
            <Route path="/payment" element={<PaymentMethodSelection />} />
            <Route path="/payment/credit-card" element={<CreditCardPage />} />
            <Route path="/payment/debit-card" element={<DebitCardPage />} />
            <Route path="/payment/bank-transfer" element={<BankTransferPage />} />

            <Route
              path="/venue-map"
              element={
                <ProtectedRoute>
                  <VenueMap />
                </ProtectedRoute>
              }
            />

            <Route
              path="/booking-summary"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </ReservationProvider>
    </BrowserRouter>
  );
}

export default App;
