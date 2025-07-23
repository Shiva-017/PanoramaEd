import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import store from "../store";
import {useEffect} from 'react';
import Layout from "../components/Layout";
import { useLocation, useNavigate } from 'react-router-dom';
import LayoutWithProfile from "../components/LayoutWithProfile";

export default () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Only redirect to login if it's the root path
        if (location.pathname === '/') {
            navigate('/login');
        }
    }, [navigate, location.pathname]);

    // Define which pages don't need layout
    const isLoginPage = location.pathname === '/login';
    const isMentorAuthPage = location.pathname === '/mentor-auth';
    const isStudentDetails = location.pathname === '/studentdetails';
    const isMentorDashboard = location.pathname === '/mentor-dashboard';

    // Pages that should render without any layout wrapper
    const noLayoutPages = isLoginPage || isMentorAuthPage;

    // Pages that should use LayoutWithProfile
    const profileLayoutPages = isStudentDetails;

    // Pages that should use mentor-specific layout (if you have one)
    const mentorPages = isMentorDashboard;

    return (
        <Provider store={store}>
            {noLayoutPages ? (
                <Outlet />
            ) : profileLayoutPages ? (
                <LayoutWithProfile>
                    <Outlet />
                </LayoutWithProfile>
            ) : mentorPages ? (
                // You might want a MentorLayout component later
                <Outlet />
            ) : (
                <Layout>
                    <Outlet />
                </Layout>
            )}
        </Provider>
    );
};