import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layouts/Main";
import fetchPreview from "./loaders/fetchPreview";
import Course from "./pages/Course";
import Error from "./pages/Error";
import PreviewCourses from "./pages/PreviewCourses";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Main,
    ErrorBoundary: Error,
    children:[
      {
        path:"preview-courses",
        index: true,
        Component: PreviewCourses,
        loader: fetchPreview
      },
      {
        path:"course/:id",
        Component: Course,
        loader: fetchPreview
      },
    ]
  }
])

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
