import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import DashboardPage from './Page/Admin/DashboardPage.jsx'
import LoginPage from './Page/LoginPage'
import AssessmentCreate from './Page/User/Assessment/AssessmentCreate.jsx'
import { AuthProvider } from './Auth/AuthProvider'
import Assessments from './Page/User/Assessment/Assessment.jsx'
import LayoutAdmin from './Components/Layout/LayoutAdmin.jsx'
import LayoutUser from './Components/Layout/LayoutUser.jsx'
import Page404 from "./Page/Page404.jsx"
import AdminAssessments from './Page/Admin/Assessment/AdminAssessment.jsx'
import AssessmentDetails from './Page/Admin/Assessment/AssessmentDetails.jsx'
import AdminEmployees from './Page/Admin/User/AdminEmployees.jsx'
import EmployeeDetails from './Page/Admin/User/EmployeeDetails.jsx'
import AdminReview from './Page/Admin/Review/AdminReviews.jsx'

function App() {

  return (
    <div className="flex flex-col color">
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Page404 />} />
            <Route path="/user" element={<LayoutUser />}>
              <Route index path="assessment" element={<Assessments />} />
              <Route path="assessment_create" element={<AssessmentCreate />} />
            </Route>
            <Route path="/admin" element={<LayoutAdmin />}>
              <Route index element={<DashboardPage />} />
              <Route path="assessments" element={<AdminAssessments />} />
              <Route path="assessment_details" element={<AssessmentDetails />} />
              <Route path="employees" element={<AdminEmployees />} />
              <Route path="employee_details" element={<EmployeeDetails />} />
              <Route path="reviews" element={<AdminReview />} />
            </Route>

          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>

  )
}

export default App;
