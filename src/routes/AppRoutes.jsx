import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home'
import PropertyPage from '../pages/PropertyPage'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties/:slug" element={<PropertyPage />} />
          <Route path="/property/:id" element={<PropertyPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default AppRoutes
