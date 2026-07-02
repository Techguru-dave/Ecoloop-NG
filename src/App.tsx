import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastProvider } from '@/components/ui/Toast'
import Home from '@/pages/Home'
import DonorSchedulePickup from '@/pages/DonorSchedulePickup'
import DonorAvailablePickups from '@/pages/DonorAvailablePickups'
import DonorReviewPickup from '@/pages/DonorReviewPickup'
import RecyclerSelectWasteType from '@/pages/RecyclerSelectWasteType'
import RecyclerCollectionMap from '@/pages/RecyclerCollectionMap'
import AdminDashboard from '@/pages/AdminDashboard'

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donor/schedule" element={<DonorSchedulePickup />} />
          <Route path="/donor/available" element={<DonorAvailablePickups />} />
          <Route path="/donor/review/:id" element={<DonorReviewPickup />} />
          <Route path="/recycler/select" element={<RecyclerSelectWasteType />} />
          <Route path="/recycler/map" element={<RecyclerCollectionMap />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App
