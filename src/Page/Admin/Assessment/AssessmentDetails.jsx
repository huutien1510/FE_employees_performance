import React from "react";
import { FaStar, FaLink, FaUser, FaClock, FaBuilding, FaImage } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const AssessmentDetails = () => {
    const location = useLocation();
    const assessment = location.state?.assessment;
    console.log(assessment);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 transform hover:scale-[1.01] transition-all">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Assessment Review
                        </h1>
                        <span
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-base font-semibold shadow-sm border ${assessment?.status === "reviewed"
                                ? "bg-green-100 text-green-700 border-green-300"
                                : "bg-yellow-100 text-yellow-700 border-yellow-300"
                                }`}
                        >
                            {assessment?.status === "reviewed" && (
                                <>
                                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Reviewed
                                </>
                            )}
                            {assessment?.status === "pending" && (
                                <>
                                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Pending
                                </>
                            )}
                        </span>
                        <div className="flex items-center text-gray-500 text bg-gray-50 px-4 py-2 rounded-full shadow-inner">
                            <FaClock className="mr-2" />
                            {new Date(assessment?.updatedAt).toLocaleDateString("vi-VN", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
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
                                            src={"https://i.pravatar.cc/100"}
                                            alt="User Avatar"
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-lg font-semibold text-gray-900">Employee</h2>
                                        <p className="text-gray-700 font-medium">{assessment.employeeName}</p>
                                        <p className="text-sm text-gray-500">{assessment.employeeJobTitle}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:border-purple-200 transition-all hover:shadow-xl">
                                <div className="flex items-center">
                                    <div className="w-24 h-24 bg-blue-100 p-1 rounded-3xl">
                                        <img
                                            src={"https://i.pravatar.cc/100"}
                                            alt="User Avatar"
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-lg font-semibold text-gray-900">Line Manager</h2>
                                        <p className="text-gray-700 font-medium">{assessment.lineManagerName}</p>
                                        <p className="text-sm text-gray-500">{assessment.lineManagerJobTitle}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                                    <h3 className="text-sm font-medium text-purple-600 mb-2">KPI (Key Performance Indicator)</h3>
                                    <p className="text-xl font-semibold text-gray-900 break-words whitespace-pre-wrap w-full">
                                        {assessment.kpiName}
                                    </p>
                                </div>
                                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                                    <h3 className="text-sm font-medium text-blue-600 mb-2">KPA (Key Performance Area)</h3>
                                    <p className="text-xl font-semibold text-gray-900 break-words whitespace-pre-wrap w-full">
                                        {assessment.kpaName}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 h-full">
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 top-8 mt-5 h-72">
                            <h3 className="mt-5 text-xl font-semibold text-gray-900 mb-6">Evaluation</h3>
                            <p className="mt-8 text-8xl font-semibold text-gray-800 w-full text-center">{assessment.evaluate}%</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">Comments</h4>
                        <p className="text-black leading-relaxed break-words whitespace-pre-wrap w-full">{assessment.comments}</p>
                    </div>
                </div>

                {assessment?.link && (
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 overflow-hidden">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold text-gray-900">Evidence Image</h3>
                            <FaImage className="text-gray-400 text-2xl" />
                        </div>
                        <div className="rounded-xl overflow-hidden shadow-inner">
                            <img
                                src={assessment.link}
                                alt="Assessment Evidence"
                                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssessmentDetails;