import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Container from "./components/Container/Container";
import AccomodationPage from "./components/pages/AccomodationPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import './App.css'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Container />,
      id: "wrapperComponent",
      errorElement: <NotFoundPage />,
      children: [
        { path: "/", element: <AccomodationPage /> },
      ],
    },
  ]);


  return (
    <RouterProvider router={router} />
  )
}

export default App
