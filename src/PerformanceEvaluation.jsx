import React, { useState, useEffect } from "react";
import { FaUser, FaChartLine, FaClipboardList, FaStar, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const PerformanceEvaluation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      name: "",
      department: "",
      jobTitle: "",
      reviewPeriod: ""
    },
    quantitativeKPI: {
      goalAchievement: 0,
      projectCompletion: 0,
      teamCollaboration: 0,
      innovation: 0,
      technicalSkills: 0
    },
    qualitativeFeedback: {
      strengths: "",
      improvements: "",
      managerComments: "",
      selfAssessment: ""
    },
    goalSetting: {
      objectives: "",
      development: "",
      careerPlans: ""
    }
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 1:
        if (!formData.personalInfo.name) newErrors.name = "Name is required";
        if (!formData.personalInfo.department) newErrors.department = "Department is required";
        if (!formData.personalInfo.jobTitle) newErrors.jobTitle = "Job Title is required";
        if (!formData.personalInfo.reviewPeriod) newErrors.reviewPeriod = "Review Period is required";
        break;
      case 2:
        Object.keys(formData.quantitativeKPI).forEach(key => {
          if (formData.quantitativeKPI[key] === 0) newErrors[key] = "Rating is required";
        });
        break;
      case 3:
        if (!formData.qualitativeFeedback.strengths.trim()) newErrors.strengths = "Strengths are required";
        if (!formData.qualitativeFeedback.improvements.trim()) newErrors.improvements = "Areas of improvement are required";
        break;
      case 4:
        if (!formData.goalSetting.objectives.trim()) newErrors.objectives = "Objectives are required";
        if (!formData.goalSetting.development.trim()) newErrors.development = "Development plans are required";
        break;
      default:
        break;
    }
    return newErrors;
  };

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length === 0) {
      setCurrentStep(prev => prev + 1);
      setErrors({});
    } else {
      setErrors(stepErrors);
    }
  };

  const handleSubmit = async () => {
    const finalErrors = validateStep(currentStep);
    if (Object.keys(finalErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert("Evaluation submitted successfully!");
        setFormData({
          personalInfo: { name: "", department: "", jobTitle: "", reviewPeriod: "" },
          quantitativeKPI: { goalAchievement: 0, projectCompletion: 0, teamCollaboration: 0, innovation: 0, technicalSkills: 0 },
          qualitativeFeedback: { strengths: "", improvements: "", managerComments: "", selfAssessment: "" },
          goalSetting: { objectives: "", development: "", careerPlans: "" }
        });
        setCurrentStep(1);
      } catch (error) {
        alert("Error submitting evaluation. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(finalErrors);
    }
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between mb-2 relative">
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200">
          <div
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />
        </div>
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${currentStep >= step
              ? "bg-blue-600 text-white border-2 border-blue-600 transform scale-110"
              : "bg-white border-2 border-gray-300 text-gray-500"
              }`}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <label className="block mb-2 text-sm font-semibold text-gray-700">Employee Name</label>
        <input
          type="text"
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition duration-200 ${errors.name ? "border-red-500" : "border-gray-300"
            }`}
          value={formData.personalInfo.name}
          onChange={(e) => handleInputChange("personalInfo", "name", e.target.value)}
          placeholder="Enter employee name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
      </div>
    </div>
  );

  const renderQuantitativeKPI = () => (
    <div className="space-y-8">
      {Object.keys(formData.quantitativeKPI).map((key) => (
        <div key={key} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <label className="block mb-4 text-sm font-semibold text-gray-700">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </label>
          <input
            type="range"
            min="0"
            max="5"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            value={formData.quantitativeKPI[key]}
            onChange={(e) => handleInputChange("quantitativeKPI", key, parseInt(e.target.value))}
          />
          <div className="flex justify-between text-sm mt-2 text-gray-600">
            {[0, 1, 2, 3, 4, 5].map((num) => (
              <span key={num} className={formData.quantitativeKPI[key] === num ? "text-blue-600 font-semibold" : ""}>
                {num}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderQualitativeFeedback = () => (
    <div className="space-y-6">
      {Object.keys(formData.qualitativeFeedback).map((key) => (
        <div key={key} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </label>
          <textarea
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition duration-200 ${errors[key] ? "border-red-500" : "border-gray-300"
              }`}
            rows="4"
            value={formData.qualitativeFeedback[key]}
            onChange={(e) => handleInputChange("qualitativeFeedback", key, e.target.value)}
            placeholder={`Enter ${key.toLowerCase().replace(/([A-Z])/g, " $1").trim()}`}
          />
          {errors[key] && <p className="text-red-500 text-sm mt-2">{errors[key]}</p>}
        </div>
      ))}
    </div>
  );

  const renderGoalSetting = () => (
    <div className="space-y-6">
      {Object.keys(formData.goalSetting).map((key) => (
        <div key={key} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </label>
          <textarea
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition duration-200 ${errors[key] ? "border-red-500" : "border-gray-300"
              }`}
            rows="4"
            value={formData.goalSetting[key]}
            onChange={(e) => handleInputChange("goalSetting", key, e.target.value)}
            placeholder={`Enter ${key.toLowerCase().replace(/([A-Z])/g, " $1").trim()}`}
          />
          {errors[key] && <p className="text-red-500 text-sm mt-2">{errors[key]}</p>}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Annual Performance Evaluation</h1>
        {renderProgressBar()}

        <div className="mb-8">
          {currentStep === 1 && renderPersonalInfo()}
          {currentStep === 2 && renderQuantitativeKPI()}
          {currentStep === 3 && renderQualitativeFeedback()}
          {currentStep === 4 && renderGoalSetting()}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-lg transition duration-200 ${currentStep === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
              }`}
          >
            Previous
          </button>
          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 shadow-md hover:shadow-lg disabled:bg-green-300 disabled:shadow-none"
            >
              {isSubmitting ? "Submitting..." : "Submit Evaluation"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerformanceEvaluation;