import React, { useState } from "react";
import { BsFillCake2Fill } from "react-icons/bs";
import { FiMail, FiPhone, FiBriefcase, FiCalendar, FiHash, FiClock, FiEdit2, FiTrash2, FiUser } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const EmployeeDetails = () => {
    const location = useLocation();
    const employee = location.state?.employee;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
                    <div className="transform hover:translate-x-2 transition-transform duration-300">
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Employee's Profiles
                        </h1>
                        <p className="text-gray-600 mt-2 font-medium">View and manage employee? information</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2">
                            <FiEdit2 className="w-5 h-5" />
                            Edit employee?
                        </button>
                        <button className="px-6 py-3 bg-white border-2 border-red-500 text-red-500 rounded-xl hover:bg-red-50 hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2">
                            <FiTrash2 className="w-5 h-5" />
                            Delete employee?
                        </button>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
                    <div className="p-10 border-b border-gray-100">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg transform hover:rotate-3 transition-transform duration-300">
                                <img
                                    src={employee?.avatar}
                                    alt="AVT"
                                    className="w-full h-full rounded-2xl"
                                />
                            </div>
                            <div className="text-center md:text-left">
                                <h2 className="text-3xl font-bold text-gray-800 mb-3">{employee?.name}</h2>
                                <div className="flex flex-wrap items-center gap-4 text-gray-600">
                                    <span className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                                        <FiBriefcase className="w-4 h-4 text-blue-500" />
                                        {employee?.jobTitle}
                                    </span>
                                    <span className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full">
                                        <FiHash className="w-4 h-4 text-purple-500" />
                                        ID: {employee?.employeeId}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-8">
                            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FiUser className="w-5 h-5 text-blue-500" />
                                </span>
                                Personal Information
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-2xl hover:shadow-md transition-all duration-300">
                                    <FiMail className="w-6 h-6 text-blue-500 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-blue-600 m-0 p-1">Email Address</p>
                                        <p className="font-semibold text-gray-800 m-0">{employee?.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-purple-50 to-purple-100/50 rounded-2xl hover:shadow-md transition-all duration-300">
                                    <FiPhone className="w-6 h-6 text-purple-500 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-purple-600 m-0 p-1">Phone Number</p>
                                        <p className="font-semibold text-gray-800 m-0">{employee?.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-pink-50 to-pink-100/50 rounded-2xl hover:shadow-md transition-all duration-300">
                                    <BsFillCake2Fill className="w-6 h-6 text-pink-500 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-pink-600 m-0 p-1">Birth Date</p>
                                        <p className="font-semibold text-gray-800 m-0">{new Date(employee?.birthDate).toLocaleDateString('vi-VN', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric'
                                        })}</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="space-y-8">
                            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <FiBriefcase className="w-5 h-5 text-purple-500" />
                                </span>
                                System Information
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-indigo-50 to-indigo-100/50 rounded-2xl hover:shadow-md transition-all duration-300">
                                    <FiBriefcase className="w-6 h-6 text-indigo-500 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-indigo-600 m-0 p-1">Department</p>
                                        <p className="font-semibold text-gray-800 m-0">{employee?.departmentName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-cyan-50 to-cyan-100/50 rounded-2xl hover:shadow-md transition-all duration-300">
                                    <FiUser className="w-6 h-6 text-cyan-500 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-cyan-600 m-0 p-1">Line Manager</p>
                                        <p className="font-semibold text-gray-800 m-0">{employee?.lineManagerName} - {employee?.lineManagerJobTitle}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-teal-50 to-teal-100/50 rounded-2xl hover:shadow-md transition-all duration-300">
                                    <FiClock className="w-6 h-6 text-teal-500 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-teal-600 m-0 p-1">Last Updated</p>
                                        <p className="font-semibold text-gray-800 m-0">{new Date(employee?.updatedAt).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;