import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Container from "./components/Container/Container";
import AccommodationPage from "./components/pages/AccommodationPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import BookingPage from "./components/pages/BookingPage";
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
        { path: "/booking/:id", element: <BookingPage />}
      ],
    },
  ]);


  return (
    <RouterProvider router={router} />
  )
}

export default App
