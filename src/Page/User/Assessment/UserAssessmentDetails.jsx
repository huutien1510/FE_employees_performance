import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar, FaLink, FaUser, FaClock, FaBuilding, FaImage, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const UserAssessmentDetails = () => {
    const location = useLocation();
    const assessmentId = location.state?.assessmentId;
    const [reviewResult, setReviewResult] = useState(null);
    const [assessmentBackup, setAssessmentBackup] = useState(null);
    const [assessment, setAssessment] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [kpi, setKpi] = useState(null);
    const [kpa, setKpa] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [previewImage, setPreviewImage] = useState(assessment?.link || "");

    useEffect(() => {
        const fetchAssessmentById = async () => {
            try {
                const response = await fetch(`http://localhost:8080/assessment/getAssessmentById/${assessmentId}`);
                const res = await response.json();
                console.log(res.data)
                setAssessment(res.data);
                setAssessmentBackup(res.data);
                setPreviewImage(res.data.link);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchAssessmentById();



        const fetchKPI = async () => {
            try {
                const response = await fetch(`http://localhost:8080/kpi/getAllName`);
                const res = await response.json();
                setKpi(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (isEditing) fetchKPI();
    }, [isEditing]);

    useEffect(() => {
        const fetchKPAbyKPI = async () => {
            try {
                const response = await fetch(`http://localhost:8080/kpa/getAllByKpi/${assessment?.kpiId}`);
                const res = await response.json();
                setKpa(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (assessment?.kpiId) fetchKPAbyKPI();
    }, [assessment?.kpiId]);

    useEffect(() => {
        const fetchReviewResult = async () => {
            try {
                const response = await fetch(`http://localhost:8080/reviews/getReviewResultById/${assessment.assessmentId}`);
                const res = await response.json();
                console.log(res.data)
                setReviewResult(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (assessment?.status == "reviewed") fetchReviewResult();
    }, [assessment?.status]);

    // Xử lý thay đổi input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAssessment((prev) => ({ ...prev, [name]: value }));
    };

    // Xử lý tải lên file ảnh
    const handleFileChange = async (e) => {
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

            setPreviewImage(response.data.secure_url);
            setAssessment((prev) => ({ ...prev, link: response.data.secure_url }));
            console.log("Tải ảnh lên thành công!");
        } catch (error) {
            console.log("Có lỗi xảy ra khi tải ảnh lên" + error);
        } finally {
            setIsUploading(false);
        }
    };

    // Bật chế độ chỉnh sửa
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Lưu dữ liệu
    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:8080/assessment/updateAssessment/${assessment?.assessmentId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.getItem("employeeId"),
                },
                body: JSON.stringify(assessment),
            });
            const res = await response.json();
            console.log(res);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setAssessment(assessmentBackup);
        setIsEditing(false);
    };

    // Hủy chỉnh sửa
    const handleCancel = () => {
        setAssessmentBackup(assessment);
        setPreviewImage(assessment?.link || "");
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 transform hover:scale-[1.01] transition-all">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Assessment Review
                        </h1>
                        <div className="flex items-center gap-4">
                            <span
                                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-base font-semibold shadow-sm border ${assessment?.status === "reviewed"
                                    ? "bg-green-100 text-green-700 border-green-300"
                                    : assessment?.status === "pending"
                                        ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                                        : "bg-red-100 text-red-700 border-red-300"
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
                                {assessment?.status === "cancel" && (
                                    <>
                                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm2.121-10.121a1 1 0 00-1.414-1.414L10 8.586 9.293 7.879a1 1 0 00-1.414 1.414L8.586 10l-.707.707a1 1 0 001.414 1.414L10 11.414l.707.707a1 1 0 001.414-1.414L11.414 10l.707-.707z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Cancelled
                                    </>
                                )}
                            </span>
                            {!isEditing && assessment?.status !== "reviewed" ? (
                                <button
                                    onClick={handleEditClick}
                                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2.5 rounded-full hover:opacity-90 transition-all duration-300 shadow-lg"
                                >
                                    <FaEdit /> Edit
                                </button>
                            ) : (
                                isEditing && (
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
                                )
                            )}
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
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:border-blue-200 transition-all hover:shadow-xl">
                                <div className="flex items-center">
                                    <div className="w-24 h-24 bg-blue-100 p-1 rounded-3xl">
                                        <img
                                            src={assessment?.employeeAvatar}
                                            alt="User Avatar"
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-lg font-semibold text-gray-900">Employee</h2>
                                        <p className="text-gray-700 font-medium">{assessment?.employeeName}</p>
                                        <p className="text-sm text-gray-500">{assessment?.employeeJobTitle}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:border-purple-200 transition-all hover:shadow-xl">
                                <div className="flex items-center">
                                    <div className="w-24 h-24 bg-blue-100 p-1 rounded-3xl">
                                        <img
                                            src={assessment?.lineManagerAvatar}
                                            alt="User Avatar"
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-lg font-semibold text-gray-900">Line Manager</h2>
                                        <p className="text-gray-700 font-medium">{assessment?.lineManagerName}</p>
                                        <p className="text-sm text-gray-500">{assessment?.lineManagerJobTitle}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                                    <h3 className="text-sm font-medium text-purple-600 mb-2">KPI (Key Performance Indicator)</h3>
                                    {isEditing ? (
                                        <select
                                            className="w-full p-3 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 shadow-inner"
                                            value={assessment?.kpiId}
                                            onChange={(e) => setAssessment({ ...assessment, kpiId: e.target.value })}
                                            required
                                        >
                                            <option value="" disabled>
                                                Chọn loại KPI
                                            </option>
                                            {kpi?.map((item) => (
                                                <option key={item.kpiId} value={item.kpiId}>
                                                    {item.kpiName}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <p className="text-xl font-semibold text-gray-900 break-words whitespace-pre-wrap w-full">
                                            {assessment?.kpiName}
                                        </p>
                                    )}
                                </div>
                                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                                    <h3 className="text-sm font-medium text-blue-600 mb-2">KPA (Key Performance Area)</h3>
                                    {isEditing ? (
                                        <select
                                            className="w-full p-3 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 shadow-inner"
                                            value={assessment?.kpaId}
                                            onChange={(e) => setAssessment({ ...assessment, kpaId: e.target.value })}
                                            required
                                        >
                                            <option value="" disabled>
                                                Chọn loại KPA
                                            </option>
                                            {kpa?.map((item) => (
                                                <option key={item.kpaId} value={item.kpaId}>
                                                    {item.kpaName}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <p className="text-xl font-semibold text-gray-900 break-words whitespace-pre-wrap w-full">
                                            {assessment?.kpaName}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 h-full">
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 top-8 mt-5 h-72">
                            <h3 className="mt-5 text-xl font-semibold text-gray-900 mb-6">Evaluation</h3>
                            {isEditing ? (
                                <input
                                    type="number"
                                    name="evaluate"
                                    value={assessment?.evaluate}
                                    onChange={handleInputChange}
                                    min="0"
                                    max="100"
                                    className="w-full p-2 border border-gray-300 rounded-lg text-center text-4xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="mt-8 text-8xl font-semibold text-gray-800 w-full text-center">{assessment?.evaluate}%</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">Comments</h4>
                        {isEditing ? (
                            <textarea
                                name="comments"
                                value={assessment?.comments}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="4"
                            />
                        ) : (
                            <p className="text-black leading-relaxed break-words whitespace-pre-wrap w-full">{assessment?.comments}</p>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-gray-900">Evidence Image</h3>
                        <FaImage className="text-gray-400 text-2xl" />
                    </div>
                    {isEditing ? (
                        <div className="space-y-4">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                            {previewImage && (
                                <img
                                    src={previewImage}
                                    alt="Evidence Preview"
                                    className="w-full h-auto object-cover rounded-xl shadow-inner"
                                />
                            )}
                        </div>
                    ) : (
                        assessment?.link && (
                            <div className="rounded-xl overflow-hidden shadow-inner">
                                <img
                                    src={assessment?.link}
                                    alt="Assessment Evidence"
                                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        )
                    )}
                </div>
                {assessment?.status == "reviewed" && (
                    <div className="bg-green-200  rounded-xl shadow-md p-6 border border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Review Results</h3>
                        <div className="flex items-center mb-4 bg-white">
                            <span className="ml-3 text-2xl font-bold text-gray-900">{reviewResult?.evaluate} /100%</span>
                        </div>
                        <div className="bg-white rounded-lg p-4 mb-3">
                            <h4 className="text-xl font-semibold text-green-600 mb-2">Review Comments</h4>
                            <p className="text-gray-700">{reviewResult?.comments}</p>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm justify-end">
                            <FaClock className="mr-2" />
                            Reviewed at: {new Date(reviewResult?.updatedAt).toLocaleDateString('vi-VN', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserAssessmentDetails;