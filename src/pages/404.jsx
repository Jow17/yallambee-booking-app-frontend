import React from "react"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"

const NotFound404 = () => {
  const navigate = useNavigate()
  const goHome = () => {
    navigate("/")
  }
  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-green-600 ">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl ">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 ">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.
          </p>
          <Button onClick={goHome}>Back to Homepage</Button>
        </div>
      </div>
    </section>
  )
}

export default NotFound404