import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaHome } from "react-icons/fa";
import Logo from "./Logo";

import { useDashboardContext } from "../pages/DashboardLayout";
import ThemeToggle from "./ThemeToggle";
const Navbar = () => {
  // destructure sidebar context for easy toggle
  const { toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
        </div>
        <div className="btn-container">
          <ThemeToggle />
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
