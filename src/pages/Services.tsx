import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Heart, Scissors, Footprints, GraduationCap, Stethoscope,
  Clock, Star, Shield, ArrowRight, MapPin, Filter
} from "lucide-react";
import { Input } from "@/components/ui/input";

const allServices = [
  {
    id: "pet-sitting",
    icon: Heart,
    title: "Temporary Pet Care",
    description: "Loving, in-home pet sitting by background-verified caretakers. Your pet stays comfortable in familiar surroundings.",
    price: "₹799",
    duration: "Per day",
    rating: 4.9,
    reviews: 2340,
    benefits: ["In-home care", "Daily photo updates", "Feeding & medication", "Insurance included"],
    color: "bg-furly-peach text-primary",
  },
  {
    id: "grooming",
    icon: Scissors,
    title: "Mobile Grooming",
    description: "Professional grooming at your doorstep. Full bath, haircut, nail trim, ear cleaning, and styling.",
    price: "₹1,500",
    duration: "Per session",
    rating: 4.8,
    reviews: 1890,
    benefits: ["Doorstep service", "Premium products", "Breed-specific care", "Spa add-ons available"],
    color: "bg-blue-50 text-blue-500",
  },
  {
    id: "walking",
    icon: Footprints,
    title: "Pet Walking",
    description: "Daily walks with GPS tracking. Experienced walkers who understand your dog's exercise needs.",
    price: "₹299",
    duration: "Per walk",
    rating: 4.9,
    reviews: 3100,
    benefits: ["GPS tracked", "30-60 min walks", "Photo updates", "Flexible schedules"],
    color: "bg-green-50 text-furly-green",
  },
  {
    id: "training",
    icon: GraduationCap,
    title: "Pet Training",
    description: "Certified trainers for obedience, behavior correction, socialization, and advanced tricks.",
    price: "₹1,999",
    duration: "Per session",
    rating: 4.7,
    reviews: 980,
    benefits: ["Certified trainers", "Custom training plans", "Progress reports", "At-home sessions"],
    color: "bg-amber-50 text-amber-600",
  },
  {
    id: "vet",
    icon: Stethoscope,
    title: "Vet Consultation",
    description: "Online and at-home veterinary consultations. Quick diagnosis, prescriptions, and follow-ups.",
    price: "₹499",
    duration: "Per consultation",
    rating: 4.9,
    reviews: 1560,
    benefits: ["Licensed vets", "Video consultations", "Prescription delivery", "24/7 emergency"],
    color: "bg-purple-50 text-purple-500",
  },
];

const Services = () => {
  const [search, setSearch] = useState("");

  const filtered = allServices.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-furly-cream">
        <div className="furly-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
              Our <span className="furly-gradient-text">Services</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-4">
              Everything your pet needs — from daily walks to full spa days
            </p>

            <div className="flex gap-3 mt-8 max-w-md mx-auto">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search services..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-12 rounded-xl pl-10"
                />
              </div>
              <Button variant="outline" className="h-12 rounded-xl px-4">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="furly-section">
        <div className="furly-container">
          <div className="space-y-8">
            {filtered.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="furly-card p-6 md:p-8"
              >
                <div className="grid md:grid-cols-[1fr_auto] gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className={`shrink-0 w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center`}>
                        <service.icon className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-heading font-bold text-foreground">{service.title}</h3>
                        <p className="text-muted-foreground mt-1">{service.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {service.benefits.map((b) => (
                        <span key={b} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-muted text-sm text-foreground">
                          <Shield className="h-3 w-3 text-primary" />
                          {b}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-furly-orange text-furly-orange" />
                        <span className="font-semibold text-foreground">{service.rating}</span>
                        <span>({service.reviews.toLocaleString()} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {service.duration}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Starting at</p>
                      <p className="text-3xl font-bold text-foreground">{service.price}</p>
                    </div>
                    <Link to="/signup">
                      <Button className="furly-gradient text-primary-foreground border-0 rounded-full px-8 h-12 font-semibold">
                        Book Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
