import { useTheme } from "../../hooks/useTheme";
import Navbar from "../Navbar/Navbar";
import "./Header.scss";

function Header() {
  const { theme } = useTheme();
  return (
    <header className="header dark:bg-gray-600 text-white text-5xl font-extralight h-20 text-center">
      <Navbar  />
    </header>
  );
}

export default Header;
