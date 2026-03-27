import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const navLinkClass = "text-center text-xl font-primary font-semibold text-primary py-2";

  return (
    <header className="border-b border-gray-300 sticky top-0 z-20 bg-gray-100">
      <div className="flex items-center justify-between mx-auto max-w-[1152]px px-6 py-6">
        <a href="/" className={navLinkClass}>
          <FontAwesomeIcon icon={faArrowTrendUp}  className="h-8 w-8 mr-2"/>
          <span className="font-bold">My Stock Tracker</span>
        </a>
        <nav className="flex items-center py-2 z-10">
          <ul className="flex space-x-6">
            <li>
              <a href="/" className={navLinkClass}>
                Home
              </a>
            </li>
            <li>
              <a href="/favorites" className={navLinkClass}>
                Favorites
              </a>
            </li>
            <li>
              <a href="/portfolio" className={navLinkClass}>
                Portfolio
              </a>
            </li>
            <li>
              <a href="/news" className={navLinkClass}>
                News
              </a>
            </li>
            <li>
              <a href="/login" className={navLinkClass}>
                Login
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
