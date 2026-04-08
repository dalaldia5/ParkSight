import { Link, useLocation } from "react-router-dom";
import { CarFront, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const active = (path) =>
    location.pathname === path
      ? "text-emerald-400 font-semibold"
      : "text-gray-300 hover:text-white";

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/parking", label: "Parking" },
    { to: "/booking", label: "Booking" },
    { to: "/analytics", label: "Analytics" },
    { to: "/traffic", label: "Traffic" },
  ];

  return (
    <nav
      className="bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 backdrop-blur-xl border-b border-gray-700/50 text-white 
                    flex justify-between items-center px-6 md:px-10 py-4 shadow-2xl sticky top-0 z-50"
    >
      {/* Logo Section with Premium Glow */}
      <Link to="/" className="flex items-center gap-3 group">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <CarFront
            size={28}
            className="text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
          />
          <Sparkles
            size={12}
            className="absolute -top-1 -right-1 text-yellow-400 animate-pulse"
          />
        </motion.div>
        <div>
          <h1 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            ParkSight
          </h1>
          <p className="text-[10px] text-gray-400 -mt-1">AI-Powered Parking</p>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-8 text-base items-center">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`${active(
              link.to
            )} transition-all duration-300 hover:scale-105 relative group`}
          >
            {link.label}
            {location.pathname === link.to && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                initial={false}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        ))}

        {/* Premium Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-2 rounded-full font-semibold text-sm shadow-lg hover:shadow-purple-500/50 transition-all"
        >
          Get Premium
        </motion.button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden text-white hover:text-emerald-400 transition-colors"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 right-0 bottom-0 w-64 bg-gray-900/98 backdrop-blur-xl border-l border-gray-700 md:hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${active(link.to)} transition-all py-2 text-lg`}
                >
                  {link.label}
                </Link>
              ))}
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3 rounded-full font-semibold text-sm shadow-lg mt-4">
                Get Premium
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}