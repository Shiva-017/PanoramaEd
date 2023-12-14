import { Provider } from "react-redux"
import { Outlet } from "react-router-dom"
import store from "../store"
import Layout from "../components/Layout";
import { useLocation } from 'react-router-dom';
import LayoutWithProfile from "../components/LayoutWithProfile";

export default () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const isCollegeFinder = location.pathname === '/find-college';
    const isCollegPage = location.pathname.match(/^\/colleges\/([^/]+)$/);
    return (
        < Provider store={store}>
            {isLoginPage ? <Outlet /> : isCollegeFinder || isCollegPage ?
                <Layout>
                    <Outlet />
                </Layout> : <LayoutWithProfile><Outlet /></LayoutWithProfile>}
        </Provider>
    )
}
