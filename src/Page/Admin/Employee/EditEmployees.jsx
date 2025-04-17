import React, { useState } from "react";
import { FaStar, FaLink, FaUser, FaClock, FaBuilding, FaImage, FaEdit, FaSave, FaTimes, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSitemap, FaBirthdayCake } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const EditEmployees = () => {
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const employee = location.state?.employee;
  const [editedAssessment, setEditedAssessment] = useState(null);
  console.log(employee)

  const assessment = {
    assessmentId: 1,
    employeeName: "Mai Lam 1",
    employeeJobTitle: "Software Engineer",
    email: "mailam@example.com",
    phone: "+84 123 456 789",
    location: "Ho Chi Minh City, Vietnam",
    department: "Engineering",
    lineManagerName: "Mai Lam 1",
    lineManagerJobTitle: "Software Engineer",
    kpaName: "Timely Project Execution",
    kpiName: "Project Completion Rate",
    evaluate: 4,
    comments: "Met project deadlines efficiently",
    link: "http://example.com/report1",
    updateAt: "2024-01-10T02:00:00.000+00:00",
    reviewed: true,
    evidenceImage: "https://example.com/evidence-image.jpg",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    performanceScore: 95
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedAssessment({ ...assessment });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedAssessment(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 transform hover:scale-[1.01] transition-all">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Employee Profile</h1>
            <div className="flex items-center gap-4">
              {!isEditing ? (
                <button onClick={handleEditClick} className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2.5 rounded-full hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <FaEdit /> Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={handleSave} className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-2.5 rounded-full hover:opacity-90 transition-all duration-300 shadow-lg">
                    <FaSave /> Save
                  </button>
                  <button onClick={handleCancel} className="flex items-center gap-2 bg-gradient-to-r from-red-400 to-red-500 text-white px-6 py-2.5 rounded-full hover:opacity-90 transition-all duration-300 shadow-lg">
                    <FaTimes /> Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:border-blue-200 transition-all">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mb-4">
                  <img className="text-white text-4xl w-full h-full rounded-full" src={employee?.avatar} />
                </div>
                <span className="text-2xl font-bold text-gray-900 mb-2">{employee?.name}</span>
                <p className="text-lg text-gray-600 mb-4">{employee?.jobTitle}</p>
                <div className="w-full space-y-3">
                  <div className="flex items-center text-gray-600">
                    <FaEnvelope className="mr-3" />
                    <span>{employee?.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaPhone className="mr-3" />
                    <span>{employee?.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaBirthdayCake className="mr-3" />
                    <span>{new Date(employee?.birthDate).toLocaleDateString('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaSitemap className="mr-3" />
                    <span>{employee?.departmentName}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Line Manager</h3>
              <div className="flex items-center gap-4">
                <div className="relative group/avatar">
                  <img
                    src={employee?.lineManagerAvatar}
                    alt={employee?.lineManagerName}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700 group-hover/avatar:border-transparent transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-full border-3 border-transparent group-hover/avatar:border-indigo-500 animate-spin-slow"></div>
                </div>
                <div className="flex flex-col items-start">
                  <h3 className="text-[19px] font-semibold text-gray-900 dark:text-white tracking-tight">
                    {employee?.lineManagerName}
                  </h3>
                  <h3 className="text-[13px] text-gray-500 dark:text-gray-400 font-medium">
                    {employee?.lineManagerJobTitle}
                  </h3>
                  <p className="text text-gray-900 dark:text-white tracking-tight">
                    {employee?.lineManagerMail}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Performance Overview</h3>
                <div className="flex items-center">
                  <label htmlFor="yearFilter" className="mr-2 text-gray-600">Năm:</label>
                  <select
                    id="yearFilter"
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                  <div className="text-4xl font-bold text-blue-600 mb-2">90%</div>
                  <div className="text-gray-600">Overall Performance</div>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
                  <div className="text-4xl font-bold text-purple-600 mb-2">4.5/5</div>
                  <div className="text-gray-600">Manager Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployees;