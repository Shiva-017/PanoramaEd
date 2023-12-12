import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import App from "../App";
import CollegeDetails from "../home/CollegePage/CollegePage";
import CollegeCompare from "../home/CollegeCompare/CollegeCompare";
import StudentMetricsForm from "../home/StudentMetrics/StudentMetricsForm";
import CollegeSuggest from "../home/CollegeSuggest/CollegeSuggest";
import StudentPosts from "../home/StudentPost/StudentPosts"
import LoginPage from "../home/LoginPage/LoginPage";
import StudentProfile from "../home/StudentPage/StudentProfile";
import StudentForm from "../home/StudentPage/StudentForm";
import Layout from "../components/Layout";
export default createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <></>,
        children: [
            {
                element: (
                    <Layout>
                      <App />
                    </Layout>
                  ),
                index: true,
            },
            {
                path: '/colleges/:collegeName',
                element: 
                <Layout>
                    <CollegeDetails />
                    </Layout>
            },
            {
                path: '/college-compare',
        element: (
          <Layout>
            <CollegeCompare />
          </Layout>
        ),
            },
            {
                path: '/find-college',
                element: <Layout>
                <StudentMetricsForm />
              </Layout>
            },
            {
                path: '/suggested-colleges',
                element: <Layout>
                <CollegeSuggest />
              </Layout>
            },
            {
                path: '/login',
                element: <LoginPage/>
            },
            {
                path: '/posts',
                element: <Layout>
                <StudentPosts />
              </Layout>
            },
            {
                path: '/profile',
                element: 
                <Layout>
                  <StudentProfile />
                </Layout>
            },
            {
                path: '/studentform',
                element: 
                <Layout>
                    <StudentForm/>
                    </Layout>
            }
        
        ]
    }
])
