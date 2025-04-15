import React, { useEffect, useRef, useState } from "react";
import { FiCheckCircle, FiTarget, FiPlus, FiEdit2, FiTrash2, FiClock, FiMessageSquare, FiStar } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const AdminReviews = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [reviews, setReviews] = useState(null);
    const inputRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [reviewedElements, setReviewedElements] = useState(0);
    const [pendingElements, setPendingElements] = useState(0);
    const [cancelElements, setCancelElements] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const size = 10;
    const location = useLocation();


    useEffect(() => {
        const fetchReviews = async (page) => {
            try {
                if (inputRef.current) inputRef.current.value = page;
                const response = await fetch(`http://localhost:8080/reviews/getAllReview?page=${page - 1}&size=${size}`);
                const res = await response.json();
                setReviews(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const fetchTotalPages = async () => {
            try {
                const response = await fetch(`http://localhost:8080/reviews/getTotalElements`);
                const res = await response.json();
                setReviewedElements(res.data.reviewedElements);
                setPendingElements(res.data.pendingElements);
                setCancelElements(res.data.cancelElements);
                setTotalElements(res.data.reviewedElements + res.data.pendingElements + res.data.cancelElements);
                setTotalPages(Math.ceil((res.data.reviewedElements + res.data.pendingElements + res.data.cancelElements) / size));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchReviews(currentPage);
        fetchTotalPages();
    }, [currentPage, location]);


    const statsData = [
        { label: "Total Reviews", value: "156", icon: FiMessageSquare, color: "blue" },
        { label: "Assessment Coverage", value: "42", icon: FiTarget, color: "purple" },
        { label: "Pending Reviews", value: "8", icon: FiClock, color: "orange" },
        { label: "Approved Reviews", value: "148", icon: FiCheckCircle, color: "green" }
    ];


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    return (

        <div className={`w-full min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
            <div className="flex justify-center">
                <div className="w-full max-w-screen-xl p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                                Assessment's Review
                            </h1>
                            <p className="text-gray-500 mt-2">Manage and monitor assessment quality feedback</p>
                        </div>
                        <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
                            <FiPlus className="w-5 h-5" />
                            Add New Review
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        {statsData.map((stat) => (
                            <div key={stat.label} className={`${darkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-xl shadow-sm border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">{stat.label}</p>
                                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                                    </div>
                                    <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : `bg-${stat.color}-100`}`}>
                                        <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={`${darkMode ? "bg-gray-800" : "bg-gray-100"} rounded-xl shadow-sm border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Assessment Review List</h2>
                            <div className="flex gap-4">
                                <select className={`px-4 py-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-white"} border-0`}>
                                    <option>All Types</option>
                                    <option>Technical Skills</option>
                                    <option>Framework Expertise</option>
                                </select>
                                <select className={`px-4 py-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-white"} border-0`}>
                                    <option>All Status</option>
                                    <option>Approved</option>
                                    <option>Pending</option>
                                </select>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {reviews?.map((review) => (
                                    <div key={review?.id} className={`${darkMode ? "bg-gray-900" : "bg-white"} p-6 rounded-xl transition-all hover:shadow-md`}>
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-semibold text-xl">{review?.assessmentName}</h3>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <span className="text-sm text-gray-500">{review?.assessmentType}</span>
                                                    <span className="text-sm text-gray-500">• {review?.difficultyLevel}</span>
                                                    <span className="text-sm text-gray-500">• {review?.timeToComplete}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`inline-flex px-4 py-2 rounded-full text-sm font-medium ${review?.status === "Approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                                                    {review?.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                {[...Array(5)].map((_, index) => (
                                                    <FiStar key={index} className={`w-5 h-5 ${index < Math.floor(review?.rating) ? "text-yellow-400" : "text-gray-300"}`} />
                                                ))}
                                                <span className="text-sm text-gray-500 ml-2">{review?.rating}/5</span>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300">{review?.comment}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <img src="https://i.pravatar.cc/150?img=3" alt="reviewer" className="w-6 h-6 rounded-full" />
                                                <span className="text-sm text-gray-500">Reviewed by {review?.reviewer}</span>
                                                <span className="text-sm text-gray-500">• {new Date(review?.date).toLocaleDateString('vi-VN', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric'
                                                })}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                                    <FiEdit2 className="w-5 h-5 text-gray-500" />
                                                </button>
                                                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                                    <FiTrash2 className="w-5 h-5 text-red-500" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div>
                <div className="flex items-center justify-center mt-6 mb-8">
                    <button
                        className={`px-4 py-2 bg-gradient-to-r from-blue-700 to-purple-700 text-white font-bold rounded-lg hover:from-blue-800 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed`}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <span
                        className={`mx-4 px-4 py-2 rounded-lg transition-all duration-300 ${darkMode
                            ? "bg-gray-800 border-2 border-blue-600/50 text-gray-200 hover:bg-gradient-to-r hover:from-blue-700/20 hover:to-purple-700/20"
                            : "bg-gray-100 border-2 border-blue-600 text-gray-900 hover:bg-gradient-to-r hover:from-blue-600/10 hover:to-purple-600/10"
                            }`}
                    >
                        Page
                        <input
                            className={`mx-4 w-16 text-center p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-800 border-blue-600/50 text-gray-200" : "bg-white border-blue-600 text-gray-900"
                                }`}
                            ref={inputRef}
                            type="number"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    const value =
                                        e.target.value > totalPages ? totalPages : e.target.value < 1 ? 1 : e.target.value;
                                    handlePageChange(value);
                                }
                            }}
                        />
                        of {totalPages}
                    </span>
                    <button
                        className={`px-4 py-2 bg-gradient-to-r from-blue-700 to-purple-700 text-white font-bold rounded-lg hover:from-blue-800 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed`}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminReviews;