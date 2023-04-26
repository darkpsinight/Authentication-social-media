import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/actions/authAction'
import { GLOBALTYPES } from '../redux/actions/globalTypes'
import Avatar from './Avatar'

const Header = () => {
  const { auth, theme } = useSelector((state) => state)

  const dispatch = useDispatch()

  const navLinks = [
    { label: 'Home', icon: 'home', path: '/' },
    { label: 'Message', icon: 'near_me', path: '/message' },
    { label: 'Discover', icon: 'explore', path: '/discover' },
    { label: 'Notify', icon: 'favorite', path: '/notify' }
  ]

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleTheme = () => {
    dispatch({ type: GLOBALTYPES.THEME, payload: !theme })
  }

  const { pathname } = useLocation()

  const isActive = (pn) => {
    if (pn === pathname) {
      return 'active'
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
      <Link to="/">
        <img
          src="/message-circle.svg"
          width="30"
          height="30"
          alt="Social Network"
          loading="eager"
        />
        <h1 className="navbar-brand text-uppercase p-0 m-0 ml-2">S-Network</h1>
      </Link>

      {/* <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button> */}

      <div className="menu">
        <ul className="navbar-nav flex-row">
          {navLinks.map((link, index) => (
            <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
              <Link className="nav-link" to={link.path}>
                <span className="material-icons">{link.icon}</span>
              </Link>
            </li>
          ))}

          <li className="btn-group dropdown">
            <span
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <Avatar src={auth.user.avatar} />
            </span>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link
                className="dropdown-item"
                to={`/profile/${auth.user._id}`}
                style={{ display: 'flex' }}
              >
                <span className="material-icons mr-2">account_circle</span>
                Profile
              </Link>
              <label
                htmlFor="theme"
                className="dropdown-item"
                onClick={handleTheme}
                style={{ display: 'flex' }}
              >
                {theme ? (
                  <span className="material-icons mr-2">light_mode</span>
                ) : (
                  <span className="material-icons mr-2">dark_mode</span>
                )}

                {theme ? 'Light mode' : 'Dark mode'}
              </label>

              <div className="dropdown-divider" />
              <Link
                className="dropdown-item"
                to="/"
                onClick={handleLogout}
                style={{ display: 'flex', flexDirection: 'center' }}
              >
                <span className="material-icons mr-2">logout</span>
                Logout
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
