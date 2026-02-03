import { Menu } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="h-[50px] flex bg-black justify-between sticky z-10 items-center top-0 w-full">
      {/* Logo */}
      <div className="flex w-[10%] font-bold text-white justify-center items-center lg:mx-[40px] md:mx-[30px] sm:mx-[20px] mx-[20px]">
        <img
          alt="logo"
          loading="lazy"
          width={60}
          height={30}
          decoding="async"
          src="/astro-logo-white.png"
        />
      </div>

      {/* Nav Links */}
      <div className="flex justify-end h-[50px] items-center lg:mx-[100px] md:mx-[70px] sm:mx-[50px] mx-[30px]">
        {[
          { name: "Home", href: "/" },
          { name: "Yuri's Night", href: "/yuriNight" },
          { name: "Blogs", href: "/blog" },
          { name: "Projects", href: "/projects" },
          { name: "Activities", href: "/activities" },
          { name: "Gallery", href: "/gallery" },
          { name: "Achievements", href: "/achievements" },
          { name: "Our Team", href: "/team" },
        ].map((item) => (
          <div
            key={item.name}
            className="hidden lg:w-[120px] md:w-[100px] sm:w-[80px] w-[60px] sm:flex items-center justify-center"
          >
            <Link to={item.href}>
              <button className="hover:font-bold transition-transform transform hover:scale-110 text-white">
                {item.name}
              </button>
            </Link>
          </div>
        ))}

        {/* Mobile Menu Icon */}
        <div className="sm:hidden flex">
          <button>
            <Menu className="size-5"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
