import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center py-4 font-primary text-gray-700">
      Built with
      <FontAwesomeIcon
        icon={faHeart}
        className="text-red-600 mx-1"
        aria-hidden="true"
      />
      by PW
      <a href="mailto:pingwang715@gmail.com" className="px-4 hover:text-blue-900 hover:underline">
        Contact me
      </a>
    </footer>
  )
}
