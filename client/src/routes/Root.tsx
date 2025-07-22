import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import store from "../store";
import {useEffect} from 'react';
import Layout from "../components/Layout";
import { useLocation, useNavigate } from 'react-router-dom';
import LayoutWithProfile from "../components/LayoutWithProfile";

export default () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/login');
      }, [navigate]);
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    // const isCollegeFinder = location.pathname === '/find-college';
    // const isCollegPage = location.pathname.match(/^\/colleges\/([^/]+)$/);
    // const isPaymentPage = location.pathname === '/process-payment';
    // const isCollegeCompare = location.pathname === '/college-compare';
    // const isStudentPosts = location.pathname === '/posts';
    const isStudentDetails = location.pathname === '/studentdetails';
    return (
        < Provider store={store}>
            {isLoginPage ? <Outlet /> : !isStudentDetails ?
                <Layout>
                    <Outlet />
                </Layout> : <LayoutWithProfile><Outlet /></LayoutWithProfile>}
        </Provider>
    )
}
