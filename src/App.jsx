import './App.css'
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import DashboardPage from './Page/Admin/DashboardPage.jsx'
import LoginPage from './Page/LoginPage'
import AssessmentCreate from './Page/User/Assessment/AssessmentCreate.jsx'
import UserAssessments from './Page/User/Assessment/UserAssessments.jsx'
import UserAssessmentsDetails from './Page/User/Assessment/UserAssessmentDetails.jsx'
import LayoutAdmin from './Components/Layout/LayoutAdmin.jsx'
import LayoutUser from './Components/Layout/LayoutUser.jsx'
import Page404 from "./Page/Page404.jsx"
import AdminAssessments from './Page/Admin/Assessment/AdminAssessment.jsx'
import AssessmentDetails from './Page/Admin/Assessment/AssessmentDetails.jsx'
import AdminEmployees from './Page/Admin/Employee/AdminEmployees.jsx'
import EmployeeDetails from './Page/Admin/Employee/EmployeeDetails.jsx'
import AdminReview from './Page/Admin/Review/AdminReviews.jsx'
import ReviewDetails from './Page/Admin/Review/ReviewDetails.jsx';
import EditEmployees from './Page/Admin/Employee/EditEmployees.jsx';
import UserReviews from './Page/User/Review/UserReviews.jsx'
import UserReviewDetails from './Page/User/Review/UserReviewDetails.jsx';
import UserProfiles from './Page/User/Profiles/UserProfiles.jsx';

function App() {

  return (
    <div className="flex flex-col color">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Page404 />} />
          <Route path="/user" element={<LayoutUser />}>
            <Route index path="profiles" element={<UserProfiles />} />
            <Route path="assessments" element={<UserAssessments />} />
            <Route path="assessment_details" element={<UserAssessmentsDetails />} />
            <Route path="assessment_create" element={<AssessmentCreate />} />
            <Route path="reviews" element={<UserReviews />} />
            <Route path="review_details" element={<UserReviewDetails />} />
            {/* <Route path="employees" element={<AdminEmployees />} />
            <Route path="employee_details" element={<EditEmployees />} />
            <Route path="review_details" element={<ReviewDetails />} />
            <Route path="test" element={<EmployeeDetails />} /> */}
          </Route>
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<DashboardPage />} />
            <Route path="assessments" element={<AdminAssessments />} />
            <Route path="assessment_details" element={<AssessmentDetails />} />
            <Route path="employees" element={<AdminEmployees />} />
            <Route path="employee_details" element={<EditEmployees />} />
            <Route path="reviews" element={<AdminReview />} />
            <Route path="review_details" element={<ReviewDetails />} />
            <Route path="test" element={<EmployeeDetails />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App;
