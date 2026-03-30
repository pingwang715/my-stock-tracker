import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center py-4 font-primary text-gray-700 bg-white dark:bg-darkbg dark:text-light">
      Built with
      <FontAwesomeIcon
        icon={faHeart}
        className="text-red-600 mx-1"
        aria-hidden="true"
      />
      by PW
      <a href="mailto:pingwang715@gmail.com" className="px-4 hover:text-blue-900 hover:underline dark:text-light dark:hover:text-blue-300 font-primary">
        Contact me
      </a>
    </footer>
  )
}
