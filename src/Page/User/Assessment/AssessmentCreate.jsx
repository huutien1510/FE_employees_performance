import React, { useEffect, useRef, useState } from "react";
import { FiUser, FiLock, FiMail, FiEye, FiEyeOff, FiMoon, FiSun, FiCheckCircle, FiTarget } from "react-icons/fi";
import axios from "axios";
import default_upload from "../../../assets/default_upload.png"

const Assessment = () => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: "",
    kpa_id: "",
    kpi_id: "",
    evaluate: 0,
    comments: "",
    link: default_upload
  });
  const [kpi,setKpi] = useState(null);
  const [kpa,setKpa] = useState(null);


  useEffect(()=>{
    const fetchKPI = async()=>{
      try {
        const response = await fetch(`http://localhost:8080/kpi/getAllName`);
        const res = await response.json();
        setKpi(res.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };
    fetchKPI();
  },[])
  
  useEffect(()=>{
    const fetchKPAbyKPI = async()=>{
      try {
        const response = await fetch(`http://localhost:8080/kpa/getAllByKpi/${formData.kpi_id}`);
        const res = await response.json();
        setKpa(res.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };
  if (formData.kpi_id) fetchKPAbyKPI();
  },[formData.kpi_id])

  const handleEnvidenceChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File quá lớn. Vui lòng chọn file nhỏ hơn 5MB");
      return;
    }

    setIsUploading(true);
    try {
      const envidence = new FormData();
      envidence.append("file", file);
      envidence.append("upload_preset", "demo-upload");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dqlb6zx2q/image/upload",
        envidence
      );
      console.log(response.data.secure_url);

      setFormData((prev) => ({
        ...prev,
        link: response.data.secure_url,
      }));
      console.log("Tải ảnh lên thành công!");
    } catch (error) {
      console.log("Có lỗi xảy ra khi tải ảnh lên" + error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveEnvidence = (e) => {
    e.preventDefault();
    fileInputRef.current.value = "";
    setFormData((prev) => ({
      ...prev,
      link: default_upload,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Assessment submitted:", formData);
  };

  const glassStyle = darkMode ? 
    "bg-gray-900/80 backdrop-blur-lg border border-gray-700" :
    "bg-white/80 backdrop-blur-lg border border-gray-200";

  return (
    <div className={`min-h-screen p-8 ${darkMode ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black" : "bg-gradient-to-br from-blue-50 via-white to-gray-100"} bg-opacity-95 mt-16`}>
      <div className={`max-w-4xl mx-auto ${glassStyle} rounded-2xl p-8 shadow-xl`}>
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            KPI Assessment
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-full ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"} transition-all duration-300 shadow-lg`}
          >
            {darkMode ? <FiSun className="w-6 h-6" /> : <FiMoon className="w-6 h-6" />}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-medium mb-2 text-black dark:text-gray-400">KPI ID</label>
              <select
                className="w-full p-3 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 shadow-inner"
                value={formData.kpi_id}
                onChange={(e) => setFormData({...formData, kpi_id: e.target.value})}
                required
              >
              <option value="" disabled>Chọn loại KPI</option>
                {kpi?.map((item) => (
                  <option key={item.kpiId} value={item.kpiId}>
                      {item.kpiName}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium mb-2 text-black dark:text-gray-400">KPA ID</label>
              <select
                className="w-full p-3 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 shadow-inner"
                value={formData.kpa_id}
                onChange={(e) => setFormData({...formData, kpa_id: e.target.value})}
                required
              >
              <option value="" disabled>Chọn loại KPA</option>
                {kpa?.map((item) => (
                  <option key={item.kpaId} value={item.kpaId}>
                      {item.kpaName}
                  </option>
                ))}
                </select>

            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-medium mb-2 text-black dark:text-gray-400">Employee ID</label>
              <input
                type="text"
                className="w-full p-3 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 shadow-inner"
                value={formData.employee_id}
                onChange={(e) => setFormData({...formData, employee_id: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium mb-2 text-black dark:text-gray-400">Evaluation Score</label>
              <input
                type="number"
                min="0"
                max="100"
                className="w-full p-3 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 shadow-inner"
                value={formData.evaluate}
                onChange={(e) => setFormData({...formData, evaluate: parseInt(e.target.value)})}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium mb-2 text-black dark:text-gray-400">Comments</label>
            <textarea
              className="w-full h-64 p-4 border-0 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-inner"
              rows="4"
              value={formData.comments}
              onChange={(e) => setFormData({...formData, comments: e.target.value})}
              placeholder="Add your assessment comments..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium mb-2 text-black dark:text-gray-400">Envident</label>
            <div
            className="w-full h-96 rounded-xl bg-gray-700 mb-4 overflow-hidden cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            style={{
              backgroundImage: `url(${formData?.link})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
            <input
            type="file"
            ref={fileInputRef}
            onChange={handleEnvidenceChange}
            accept=".png, .jpg, .jpeg, .gif, .webp, .pdf, .doc, .docx, .txt, .zip, .rar"
            className="hidden"
          />
          <div className='flex '>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="bg-gradient-to-br from-teal-500 to-green-600 text-white py-2 px-4 rounded-lg mr-4"
            >
              {isUploading ? "Đang tải lên..." : "Thay ảnh"}
            </button>
            <button
              onClick={handleRemoveEnvidence}
              className="bg-gradient-to-br from-red-400 to-red-500 text-white py-2 px-4 rounded-lg">
              Gỡ ảnh
            </button>
          </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] font-medium text-lg shadow-lg"
          >
            Submit Assessment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Assessment;