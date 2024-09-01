import React, { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { UserContext } from "../context/userContext"
import { removeToken } from "../pages/authUtils"
import { jwtDecode } from "jwt-decode"
import logodark from "../assets/img/logodark-1.png"
import logowhite from "../assets/img/logowhite-1.png"

const Header = () => {
  const { user, setUser } = useContext(UserContext)
  const [isAdmin, setIsAdmin] = useState(false)
  const [header, setHeader] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const token = localStorage.getItem("token")

  const nonTransparentRoutes = ["/SignInPage", "/admin-dashboard", "/register", "/profile"]
  const isNonTransparent = nonTransparentRoutes.some(route => location.pathname.startsWith(route))

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token)
        setIsAdmin(decodedToken.isAdmin)
      } catch (error) {
        console.error("Invalid token:", error)
      }
    }
  }, [token])

  // Update header state based on route and scroll position
  useEffect(() => {
    if (isNonTransparent) {
      setHeader(true) // Force non-transparent header
    } else {
      const handleScroll = () => {
        window.scrollY > 50 ? setHeader(true) : setHeader(false)
      }

      handleScroll() // Set initial state based on scroll position
      window.addEventListener("scroll", handleScroll)

      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [isNonTransparent, location.pathname])

  const handleLogout = () => {
    removeToken()
    setUser(null)
    setIsAdmin(false)
    alert("Successfully logged out!")
    navigate("/")
  }

  return (
    <header
      className={`${
        header ? "bg-white py-6 shadow-lg" : "bg-transparent py-8"
      } fixed z-50 w-full transition-all duration-500`}
    >
      <div className="container mx-auto flex flex-col items-center gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0">
        {/* logo */}
        <Link to="/">
          <img className="w-[160px]" src={header ? logodark : logowhite} alt="Logo" />
        </Link>

        {/* nav */}
        <nav
          className={`${
            header ? "text-primary" : "text-white"
          } flex gap-x-4 font-tertiary tracking-[3px] text-[15px] items-center uppercase lg:gap-x-8`}
        >
          <Link to="/" className="hover:text-accent transition">
            Home
          </Link>
          <Link to="/#property-listing" className="hover:text-accent transition">
            Tiny Homes
          </Link>
          {isAdmin && (
            <Link to="/admin-dashboard" className="hover:text-accent transition">
              Admin
            </Link>
          )}
          {user ? (
            <>
              <Link
                to={`/profile/${user._id}`}
                className="hover:text-accent transition"
              >
                Account
              </Link>
              <Link to="/" onClick={handleLogout} className="hover:text-accent transition">
                Logout
              </Link>
            </>
          ) : (
            <Link to="/SignInPage" className="hover:text-accent transition">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header