import React, { useEffect, useState, lazy, Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import NotFound from '../components/NotFound'

const PageRender = () => {
  const { page, id } = useParams()
  const [component, setComponent] = useState(null)
  const { auth } = useSelector((state) => state)

  useEffect(() => {
    const fetchComponent = async () => {
      try {
        let modulePath = `../pages/${page}`
        if (id) {
          modulePath += '/[id]'
        }
        const module = await import(/* @vite-ignore */ modulePath)
        setComponent(() => module.default)
      } catch (err) {
        setComponent(() => NotFound)
      }
    }
    const isAuth = Boolean(auth.token)
    switch (page) {
      case 'message':
      case 'notify':
      case 'discover':
      case 'profile':
        if (!isAuth) {
          setComponent(() => NotFound)
        } else {
          fetchComponent()
        }
        break
      default:
        if (isAuth) {
          fetchComponent()
        } else if (page === 'register') {
          const RegisterComponent = lazy(() => import('../pages/register'))
          setComponent(() => RegisterComponent)
        } else if (page === 'login') {
          const LoginComponent = lazy(() => import('../pages/login'))
          setComponent(() => LoginComponent)
        } else {
          setComponent(() => NotFound)
        }
        break
    }
  }, [auth.token, page])

  return component ? (
    <Suspense fallback={<div>Loading...</div>}>
      {React.createElement(component)}
    </Suspense>
  ) : null
}

export default PageRender
