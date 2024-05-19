import { FaAddressCard, FaHeart } from "react-icons/fa";
import { useTheme } from "../../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import { PiWarningCircleBold } from "react-icons/pi";
import { useAuth } from "../../contexts/AuthContext";


function Footer() {
  const { toggle } = useTheme();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  return (

    <footer
      className="footer flex justify-between dark:text-red-300 bg-gray-400 dark:bg-gray-600 p-5 text-white text-lg font-extralight font-semibold text-center items-center md:text-2xl">

      <p className="paragraph flex justify-items-start">Developed by RO © 2024</p>
      <div className="links flex mx-6 md:gap-10 gap-3">
        <PiWarningCircleBold className=" cursor-pointer text-red-300 size-6 text-base" onClick={() => navigate("/about")} />
        {isLoggedIn && <FaHeart className=" cursor-pointer text-red-300 size-6 text-base" onClick={() => navigate("/favorites")} />}
        {isLoggedIn && user?.isBusiness && (
          <FaAddressCard className=" cursor-pointer text-red-300 size-6 text-base" onClick={() => navigate("/my-cards")} />
        )}
      </div>
    </footer>
  );
}

export default Footer;
