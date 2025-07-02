import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Header from "./components/Header/Header"
import { HomePage } from "./pages/HomePage/HomePage"
import Footer from "./components/Footer/Footer"
import AuthPage from "./pages/AuthPage/AuthPage"
import SearchPage from "./pages/SearchPage/SearchPage"
import { useAuth } from "./context/AuthContext"

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/search" element={isAuthenticated ? <SearchPage /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
