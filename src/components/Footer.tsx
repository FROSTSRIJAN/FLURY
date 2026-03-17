import { Link } from "react-router-dom";
import { PawPrint, Instagram, Twitter, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="furly-gradient rounded-xl p-2">
                <PawPrint className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-heading font-bold">Furly</span>
            </Link>
            <p className="text-sm opacity-70 leading-relaxed">
              Care you can trust. Love they deserve. India's most trusted pet care marketplace.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href={i === 0 ? "https://www.instagram.com/__furly__?igsh=MXJteDZvdGViMWFwNw%3D%3D&utm_source=qr" : "#"} target={i === 0 ? "_blank" : undefined} rel={i === 0 ? "noreferrer" : undefined} className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary/20 transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-lg">Services</h4>
            <div className="space-y-2 text-sm opacity-70">
              {["Temporary Pet Care", "Mobile Grooming", "Furly Pro Membership", "Community Groups", "Team Furly"].map((s) => (
                <a key={s} href="/services" className="block hover:opacity-100 transition-opacity">{s}</a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-lg">Company</h4>
            <div className="space-y-2 text-sm opacity-70">
              {["About Us", "How It Works", "Blog", "Careers", "Press"].map((s) => (
                <a key={s} href="#" className="block hover:opacity-100 transition-opacity">{s}</a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-lg">Contact</h4>
            <div className="space-y-3 text-sm opacity-70">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>hello@furly.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>9650673927</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Bangalore, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-50">
          <p>© 2026 Furly. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
