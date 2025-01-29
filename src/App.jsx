import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Container from "./components/Container/Container";
import AccomodationPage from "./components/pages/AccomodationPage";
import './App.css'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Container />,
      id: "wrapperComponent",
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
