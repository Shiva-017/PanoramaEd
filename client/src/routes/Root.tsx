import { Provider } from "react-redux"
import { Outlet } from "react-router-dom"
import store from "../store"
import Layout from "../components/Layout";
import { useLocation } from 'react-router-dom';

export default () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    return (
        < Provider store={store}>
            {isLoginPage ? <Outlet /> :
                <Layout>
                    <Outlet />
                </Layout>}
        </Provider>
    )
}