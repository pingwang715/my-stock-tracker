import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp, faMoon, faSun, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import { useAuth } from "../store/auth-context";
import { toast } from "react-toastify";

export default function Header() {

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark" ? "dark" : "light";
  });

  const { isAuthenticated, logout, user } = useAuth();

  const isAdmin = user?.roles?.includes("ROLE_ADMIN");
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isAdminMenuOpen, setAdminMenuOpen] = useState(false);
  const location = useLocation();
  const userMenuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setAdminMenuOpen(false);
    setUserMenuOpen(false);
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
        setAdminMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside)
  }, [theme, location.pathname]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newThheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newThheme);
      return newThheme;
    });
  };

  const toggleAdminMenu = () => setAdminMenuOpen((prev) => !prev);
  const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    toast.success("Logged out successfully!");
    navigate("/home");
  };

  const navLinkClass = "text-center text-xl font-primary font-semibold text-primary py-2 dark:text-light hover:text-dark dark:hover:text-lighter";

  const dropdownLinkClass =
    "block w-full text-left px-4 py-2 text-lg font-primary font-semibold text-primary dark:text-light hover:bg-gray-100 dark:hover:bg-gray-600";

  return (
    <header className="border-b border-gray-300 dark:border-gray-600 sticky top-0 z-20 bg-normalbg dark:bg-darkbg">
      <div className="flex items-center justify-between mx-auto max-w-[1152]px px-6 py-6">
        <a href="/" className={navLinkClass}>
          <FontAwesomeIcon icon={faArrowTrendUp}  className="h-8 w-8 mr-2"/>
          <span className="font-bold">My Stock Tracker</span>
        </a>
        <nav className="flex items-center py-2 z-10">
          <button
            className="flex items-center justify-center mx-3 w-8 h-8 rounded-full border border-primary dark:border-light transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            <FontAwesomeIcon
              icon={theme === "dark" ? faMoon : faSun}
              className="w-4 h-4 dark:text-light text-primary"
            />
          </button>
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? `underline ${navLinkClass}` : navLinkClass
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/stocks"
                className={({ isActive }) =>
                  isActive ? `underline ${navLinkClass}` : navLinkClass
                }
              >
                Stocks
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/portfolios"
                className={({ isActive }) =>
                  isActive ? `underline ${navLinkClass}` : navLinkClass
                }
              >
                Portfolios
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/news"
                className={({ isActive }) =>
                  isActive ? `underline ${navLinkClass}` : navLinkClass
                }
              >
                News
              </NavLink>
            </li>
            <li>
              {isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={toggleUserMenu}
                    className="relative text-primary"
                  >
                    <span className={navLinkClass}>
                      Welcome back, {user.name.length > 5 ? `${user.name.slice(0, 5)}...` : user.name}
                    </span>
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className="text-primary dark:text-light w-6 h-6"
                    />
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 w-48 bg-normalbg dark:bg-darkbg border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-20 transition ease-in-out duration-200">
                      <ul className="py-2">
                        {isAdmin && (
                          <li>
                            <button
                              onClick={toggleAdminMenu}
                              className={`${dropdownLinkClass} flex items-center justify-between`}
                            >
                              Admin
                              <FontAwesomeIcon icon={faAngleDown} />
                            </button>
                            {isAdminMenuOpen && (
                              <ul className="ml-4 mt-2 space-y-2">
                                <li>
                                  <Link
                                    to="/admin/messages"
                                    className={dropdownLinkClass}
                                  >
                                    Messages
                                  </Link>
                                </li>
                              </ul>
                            )}
                          </li>
                        )}

                        <li>
                          <Link
                            to="/home"
                            onClick={handleLogout}
                            className={dropdownLinkClass}
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )  : (<NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? `underline ${navLinkClass}` : navLinkClass
                }
              >
                Login
              </NavLink>)}

            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
