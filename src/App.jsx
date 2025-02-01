import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Container from "./components/Container/Container";
import AccommodationPage from "./components/pages/AccommodationPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import AccommodationDetailsPage from "./components/pages/AccommodationDetailsPage";
import './App.css'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Container />,
      id: "wrapperComponent",
      errorElement: <NotFoundPage />,
      children: [
        { path: "/", element: <AccommodationPage /> },
        { path: "/accommodation/:id", element: <AccommodationDetailsPage />}
      ],
    },
  ]);


  return (
    <RouterProvider router={router} />
  )
}

export default App
