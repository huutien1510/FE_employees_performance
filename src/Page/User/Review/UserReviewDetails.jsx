import React, { useState } from "react";
import { FaClock, FaImage } from "react-icons/fa";
import { FiMessageSquare, FiStar } from "react-icons/fi";

import { useLocation, useNavigate } from "react-router-dom";

const UserReviewDetails = () => {
    const localtion = useLocation();
    const navigate = useNavigate();
    const [review, setReview] = useState(localtion.state?.review);

    const handleScoreChange = (value) => {
        setReview(prev => ({ ...prev, evaluate: value }));
    };

    const handleCommentsChange = (e) => {
        setReview(prev => ({ ...prev, comments: e.target.value }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:8080/reviews/evaluateAssessment/${review?.assessmentId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("employeeId"),
                },
                body: JSON.stringify({ "evaluate": review.evaluate, "comments": review.comments })
            });
            const res = await response.json();
            console.log(res)
            navigate(-1);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 transform hover:scale-[1.01] transition-all">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Review Details
                        </h1>

                        <span
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-base font-semibold shadow-sm border ${review?.status === 'reviewed'
                                ? 'bg-green-100 text-green-700 border-green-300'
                                : review?.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
                                    : 'bg-red-100 text-red-700 border-red-300'
                                }`}
                        >
                            {review?.status === 'reviewed' && (
                                <>
                                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                                    </svg>
                                    Reviewed
                                </>
                            )}
                            {review?.status === 'pending' && (
                                <>
                                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" clipRule="evenodd" />
                                    </svg>
                                    Pending
                                </>
                            )}
                            {review?.status === 'cancel' && (
                                <>
                                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm2.121-10.121a1 1 0 00-1.414-1.414L10 8.586 9.293 7.879a1 1 0 00-1.414 1.414L8.586 10l-.707.707a1 1 0 001.414 1.414L10 11.414l.707.707a1 1 0 001.414-1.414L11.414 10l.707-.707z" clipRule="evenodd" />
                                    </svg>
                                    Cancelled
                                </>
                            )}
                        </span>

                        <div className="flex items-center text-gray-500 text bg-gray-50 px-4 py-2 rounded-full shadow-inner">
                            <FaClock className="mr-2" />
                            {new Date(review?.updatedAt).toLocaleDateString('vi-VN', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
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
                                            src={review?.employeeAvatar}
                                            alt="User Avatar"
                                            className="w-full h-full object-cover rounded-full "
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-lg font-semibold text-gray-900">Employee</h2>
                                        <p className="text-gray-700 font-medium">{review.employeeName}</p>
                                        <p className="text-sm text-gray-500">{review.employeeJobTitle}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:border-purple-200 transition-all hover:shadow-xl">
                                <div className="flex items-center">
                                    <div className="w-24 h-24 bg-blue-100 p-1 rounded-3xl">
                                        <img
                                            src={review?.lineManagerAvatar}
                                            alt="User Avatar"
                                            className="w-full h-full object-cover rounded-full "
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-lg font-semibold text-gray-900">Line Manager</h2>
                                        <p className="text-gray-700 font-medium">{review.lineManagerName}</p>
                                        <p className="text-sm text-gray-500">{review.lineManagerJobTitle}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                                    <h3 className="text-sm font-medium text-purple-600 mb-2">KPI (Key Performance Indicator)</h3>
                                    <p className="text-xl font-semibold text-gray-900 break-words whitespace-pre-wrap w-full">
                                        {review.kpiName}
                                    </p>
                                </div>
                                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                                    <h3 className="text-sm font-medium text-blue-600 mb-2">KPA (Key Performance Area)</h3>
                                    <p className="text-xl font-semibold text-gray-900 break-words whitespace-pre-wrap w-full">
                                        {review.kpaName}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="lg:col-span-1 h-full">
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 top-8 mt-5 h-72">
                            <h3 className="mt-5 text-xl font-semibold text-gray-900 mb-6">Employee Evaluation</h3>
                            <p className="mt-8 text-8xl font-semibold text-gray-800 w-full text-center">{review?.employeeEvaluate}%</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">Comments</h4>
                        <p className="text-black leading-relaxed break-words whitespace-pre-wrap w-full">
                            {review.employeeComments}
                        </p>
                    </div>
                </div>

                {review?.employeeLink && (
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 overflow-hidden">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold text-gray-900">Evidence Image</h3>
                            <FaImage className="text-gray-400 text-2xl" />
                        </div>
                        <div className="rounded-xl overflow-hidden shadow-inner">
                            <img
                                src={review?.employeeLink}
                                alt="review Evidence"
                                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>
                )}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6">
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                            <span className="w-8 h-8 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-lg flex items-center justify-center shadow-sm">
                                <FiStar className="w-5 h-5 text-indigo-600" />
                            </span>
                            Manager Evaluation
                        </h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl border border-indigo-100/20">
                                <p className="text-sm text-indigo-600 mb-3">Manager Evaluate ( 0-100% )</p>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={review?.evaluate}
                                    onChange={(e) => handleScoreChange(parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/50"
                                />
                            </div>

                            <div className="p-4 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl border border-indigo-100/20">
                                <div className="flex items-start gap-4">
                                    <FiMessageSquare className="w-5 h-5 text-indigo-500 mt-1" />
                                    <div className="flex-1">
                                        <p className="text-sm text-indigo-600 mb-3">Manager Comments</p>
                                        <textarea
                                            value={review?.comments}
                                            onChange={handleCommentsChange}
                                            rows="4"
                                            className="w-full px-4 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/50"
                                            placeholder="Enter your evaluation comments here..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full px-5 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-lg hover:from-indigo-600 hover:to-violet-600 transition-all duration-300 flex items-center justify-center gap-2 font-semibold shadow-md shadow-indigo-200/50 dark:shadow-indigo-900/30"
                        >
                            Submit Evaluation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserReviewDetails;
