import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/#about-us" },
  { label: "Blog", href: "/blog" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 bg-card/95 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/furly%20logo.jpeg"
            alt="Furly logo"
            className="h-10 w-10 rounded-xl object-cover border border-orange-100 shadow-sm"
          />
          <span className="text-xl font-heading font-bold text-foreground tracking-tight">
            Furly
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/marketplace"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Marketplace
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link
                to={user.role === "caretaker" ? "/caretaker-dashboard" : "/dashboard"}
              >
                <Button variant="ghost" size="sm" className="text-foreground font-medium">
                  Dashboard
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 furly-gradient rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-foreground max-w-[100px] truncate">{user.name.split(" ")[0]}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-foreground">
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="furly-gradient text-primary-foreground border-0 rounded-full px-6">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-foreground font-medium"
                >
                  {link.label}
                </a>
              ))}
              <Link to="/marketplace" onClick={() => setMobileOpen(false)} className="block py-2 text-foreground font-medium">
                Marketplace
              </Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="block py-2 text-foreground font-medium">
                Contact
              </Link>
              {user ? (
                <div className="flex gap-3 pt-2">
                  <Link to={user.role === "caretaker" ? "/caretaker-dashboard" : "/dashboard"} className="flex-1" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full">Dashboard</Button>
                  </Link>
                  <Button className="flex-1 border-red-200 text-red-500" variant="outline" onClick={() => { logout(); setMobileOpen(false); }}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex gap-3 pt-2">
                  <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full">Log in</Button>
                  </Link>
                  <Link to="/signup" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full furly-gradient text-primary-foreground border-0">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
