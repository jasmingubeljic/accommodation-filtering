import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Container from "./components/Container/Container";
import AccommodationPage from "./pages/AccommodationPage";
import NotFoundPage from "./pages/NotFoundPage";
import BookingPage from "./pages/BookingPage";
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
