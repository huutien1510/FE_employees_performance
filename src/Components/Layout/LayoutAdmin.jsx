import React, { useEffect } from 'react'
import AdminSidebar from '../Sidebar/AdminSidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const LayoutAdmin = () => {
  const userRole = localStorage.getItem('role');
  const navigate = useNavigate();
  useEffect(() => {
    console.log(userRole)
    if (!userRole) {
      navigate('/login');
    } else if (!(userRole === "admin")) {
      navigate('*');
    }
  }, []);
  return (
    <div className='flex mt-16 bg-main'>
      <AdminSidebar />
      <section className='flex-1 bg-main'>
        <Outlet />
      </section>
    </div>
  )
}

export default LayoutAdmin;