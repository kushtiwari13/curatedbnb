import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home'
import PropertyPage from '../pages/PropertyPage'
import Terms from '../pages/Terms'
import Privacy from '../pages/Privacy'
import Shipping from '../pages/Shipping'
import Cancellation from '../pages/Cancellation'
import Contact from '../pages/Contact'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties/:slug" element={<PropertyPage />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/cancellation-refund" element={<Cancellation />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default AppRoutes
