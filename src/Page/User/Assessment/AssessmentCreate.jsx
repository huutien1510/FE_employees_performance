import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSave, FaTimes, FaImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AssessmentCreate = () => {
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState({
    employeeId: "",
    lineManagerId: "",
    kpiId: "",
    kpaId: "",
    evaluate: "",
    comments: "",
    link: "",
    createdAt: new Date(),
    updatedAt: new Date()
  });
  const employeeId = localStorage.getItem("employeeId");
  const [kpi, setKpi] = useState([]);
  const [kpa, setKpa] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    // Fetch KPI data
    const fetchKPI = async () => {
      try {
        const response = await fetch("http://localhost:8080/kpi/getAllName");
        const res = await response.json();
        setKpi(res.data);
      } catch (error) {
        console.error("Error fetching KPI data:", error);
      }
    };
    fetchKPI();

    const fetchEmployeeManager = async () => {
      try {
        const response = await fetch(`http://localhost:8080/employees/getEmployeeManager/${employeeId}`);
        const res = await response.json();
        console.log(res.data)
        setEmployee(res.data);
        setAssessment(prev => ({ ...prev, employeeId: res.data.employeeId, lineManagerId: res.data.lineManagerId }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchEmployeeManager();
  }, []);

  useEffect(() => {
    const fetchKPAbyKPI = async () => {
      if (assessment.kpiId) {
        try {
          const response = await fetch(`http://localhost:8080/kpa/getAllByKpi/${assessment.kpiId}`);
          const res = await response.json();
          setKpa(res.data);
          setAssessment(prev => ({ ...prev, kpaId: "" }));
        } catch (error) {
          console.error("Error fetching KPA data:", error);
        }
      }
    };
    fetchKPAbyKPI();
  }, [assessment.kpiId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssessment(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File quá lớn. Vui lòng chọn file nhỏ hơn 5MB");
      return;
    }

    setIsUploading(true);
    try {
      const evidence = new FormData();
      evidence.append("file", file);
      evidence.append("upload_preset", "demo-upload");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dqlb6zx2q/image/upload",
        evidence
      );

      setPreviewImage(response.data.secure_url);
      setAssessment(prev => ({ ...prev, link: response.data.secure_url }));
      console.log("Tải ảnh lên thành công!");
    } catch (error) {
      console.error("Có lỗi xảy ra khi tải ảnh lên:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:8080/assessment/createAssessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("employeeId"),
        },
        body: JSON.stringify(assessment),
      });
      const res = await response.json();
      console.log("Assessment created:", res);
      navigate(-1);
      alert("Assessment created successfully!");
    } catch (error) {
      console.error("Error creating assessment:", error);
      alert("Failed to create assessment.");
    }
  };

  const handleCancel = () => {
    setAssessment(prev => prev, ({
      kpiId: "",
      kpaId: "",
      evaluate: "",
      comments: "",
      link: ""
    }));
    setPreviewImage("");
    setKpa([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 transform hover:scale-[1.01] transition-all">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Create Assessment
            </h1>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-2.5 rounded-full hover:opacity-90 transition-all duration-300 shadow-lg"
              >
                <FaSave /> Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 bg-gradient-to-r from-red-400 to-red-500 text-white px-6 py-2.5 rounded-full hover:opacity-90 transition-all duration-300 shadow-lg"
              >
                <FaTimes /> Cancel
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:border-blue-200 transition-all hover:shadow-xl">
                <div className="flex items-center">
                  <div className="w-24 h-24 bg-blue-100 p-1 rounded-3xl">
                    <img
                      src={employee?.employeeAvatar}
                      alt="Employee Avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold text-gray-900">Employee</h2>
                    <p className="text-gray-700 font-medium">{employee?.employeeName || "Loading..."}</p>
                    <p className="text-sm text-gray-500">{employee?.employeeJobTitle || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:border-purple-200 transition-all hover:shadow-xl">
                <div className="flex items-center">
                  <div className="w-24 h-24 bg-blue-100 p-1 rounded-3xl">
                    <img
                      src={employee?.lineManagerAvatar}
                      alt="Line Manager Avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold text-gray-900">Line Manager</h2>
                    <p className="text-gray-700 font-medium">{employee?.lineManagerName || "None..."}</p>
                    <p className="text-sm text-gray-500">{employee?.lineManagerJobTitle || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <h3 className="text-sm font-medium text-purple-600 mb-2">KPI (Key Performance Indicator)</h3>
                  <select
                    name="kpiId"
                    value={assessment.kpiId}
                    onChange={handleInputChange}
                    className="w-full p-3 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 shadow-inner"
                    required
                  >
                    <option value="" disabled>Chọn loại KPI</option>
                    {kpi.map((item) => (
                      <option key={item.kpiId} value={item.kpiId}>
                        {item.kpiName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <h3 className="text-sm font-medium text-blue-600 mb-2">KPA (Key Performance Area)</h3>
                  <select
                    name="kpaId"
                    value={assessment.kpaId}
                    onChange={handleInputChange}
                    className="w-full p-3 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 shadow-inner"
                    required
                    disabled={!assessment.kpiId}
                  >
                    <option value="" disabled>Chọn loại KPA</option>
                    {kpa.map((item) => (
                      <option key={item.kpaId} value={item.kpaId}>
                        {item.kpaName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 h-full">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 top-8 mt-5 h-72">
              <h3 className="mt-5 text-xl font-semibold text-gray-900 mb-6">Evaluation</h3>
              <input
                type="number"
                name="evaluate"
                value={assessment.evaluate}
                onChange={handleInputChange}
                min="0"
                max="100"
                className="w-full p-2 border border-gray-300 rounded-lg text-center text-4xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0-100"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Comments</h4>
            <textarea
              name="comments"
              value={assessment.comments}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Enter your comments here..."
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Evidence Image</h3>
            <FaImage className="text-gray-400 text-2xl" />
          </div>
          <div className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              disabled={isUploading}
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Evidence Preview"
                className="w-full h-auto object-cover rounded-xl shadow-inner"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentCreate;