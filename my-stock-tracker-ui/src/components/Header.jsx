import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import {Link, NavLink} from "react-router-dom";

export default function Header() {

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newThheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newThheme);
      return newThheme;
    });
  };

  const navLinkClass = "text-center text-xl font-primary font-semibold text-primary py-2 dark:text-light hover:text-dark dark:hover:text-lighter";

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
                Portfolio
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
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? `underline ${navLinkClass}` : navLinkClass
                }
              >
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
