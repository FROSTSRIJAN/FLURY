import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroPets from "@/assets/hero-pets.png";

const stats = [
  { icon: Users, value: "10,000+", label: "Happy Pet Parents" },
  { icon: Star, value: "4.9/5", label: "Average Rating" },
  { icon: Shield, value: "100%", label: "Verified Caretakers" },
];

const HeroSection = () => {
  return (
    <section className="pt-28 pb-20 lg:pb-28 bg-gradient-to-b from-white to-orange-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative z-10 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 rounded-full bg-furly-peach px-4 py-2 text-sm font-medium text-primary"
          >
            <span className="animate-paw-bounce">🐾</span>
            India's #1 Pet Care Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight text-foreground"
          >
            <span className="furly-gradient-text">Fur The Love</span>
            <br />
            of Paws
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6 }}
            className="mt-6 text-lg text-muted-foreground leading-relaxed"
          >
            Trusted pet care services at your doorstep. Book verified pet sitters,
            grooming professionals, and pet services in minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start"
          >
            <Link to="/services">
              <Button
                size="lg"
                className="furly-gradient text-primary-foreground border-0 rounded-full px-8 h-14 text-base font-semibold shadow-lg hover:shadow-xl"
              >
                Book a Service
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link to="/become-caretaker">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 h-14 text-base font-semibold border-2 border-primary text-primary hover:bg-primary/5"
              >
                Become a Caretaker
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.6 }}
            className="grid grid-cols-3 gap-4 sm:gap-6 mt-10"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white shadow-sm p-4 text-center border border-orange-100/60">
                <div className="flex items-center justify-center gap-1.5">
                  <stat.icon className="h-4 w-4 text-primary" />
                  <span className="text-lg sm:text-xl font-bold text-foreground leading-none">
                    {stat.value}
                  </span>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-[420px] sm:min-h-[480px] lg:min-h-[540px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.16, duration: 0.65 }}
            className="relative z-10 max-w-md mx-auto"
          >
            <div className="absolute inset-0 pointer-events-none furly-gradient rounded-full blur-3xl opacity-20 scale-110" />
            <img
              src={heroPets}
              alt="Happy dog and cat - Furly pet care"
              className="relative z-10 w-full animate-float"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="absolute top-6 right-2 sm:right-8 lg:right-0 z-10 shadow-lg rounded-xl bg-white px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 furly-gradient rounded-full flex items-center justify-center">
                <Star className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Top Rated</p>
                <p className="text-xs text-muted-foreground">4.9 stars</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="absolute bottom-8 left-2 sm:left-8 lg:left-0 z-10 shadow-lg rounded-xl bg-white px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-furly-green rounded-full flex items-center justify-center">
                <Shield className="h-4 w-4 text-furly-green-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Verified</p>
                <p className="text-xs text-muted-foreground">Background checked</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
