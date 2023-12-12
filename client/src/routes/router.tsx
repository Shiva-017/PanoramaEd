import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import App from "../App";
import CollegeDetails from "../home/CollegePage/CollegePage";
import CollegeCompare from "../home/CollegeCompare/CollegeCompare";
import StudentMetricsForm from "../home/StudentMetrics/StudentMetricsForm";
import CollegeSuggest from "../home/CollegeSuggest/CollegeSuggest";
import StudentPosts from "../home/StudentPost/StudentPosts"
import LoginPage from "../home/LoginPage/LoginPage";

export default createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <></>,
        children: [
            {
                element: <App />,
                index: true,
            },
            {
                path: '/colleges/:collegeName',
                element: <CollegeDetails />
            },
            {
                path: '/college-compare',
                element: <CollegeCompare/>
            },
            {
                path: '/find-college',
                element: <StudentMetricsForm/>
            },
            {
                path: '/suggested-colleges',
                element: <CollegeSuggest/>
            },
            {
                path: '/login',
                element: <LoginPage/>
            },
            {
                path: '/posts',
                element: <StudentPosts/>
            }
        ]
    }
])
