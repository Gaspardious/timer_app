import { Outlet, useLocation } from "react-router-dom"
import Header from "./components/Header/Header"

function App() {
  const location = useLocation()
  const hideHeaderFooter = location.pathname === "/";


  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Outlet />
    </>
  )
}

export default App
