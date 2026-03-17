import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Scissors, Footprints, GraduationCap, Stethoscope, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Temporary Pet Care",
    description: "Loving care for your pet while you're away. In-home sitting by verified caretakers.",
    price: "₹799",
    color: "bg-furly-peach text-primary",
  },
  {
    icon: Scissors,
    title: "Mobile Grooming",
    description: "Professional grooming at your doorstep. Bath, haircut, nail trim, and more.",
    price: "₹1500",
    color: "bg-blue-50 text-blue-500",
  },
  {
    icon: Footprints,
    title: "Furly Pro Membership",
    description: "Caretakers with this membership are more visible to people searching for temporary pet care.",
    price: "₹199",
    color: "bg-green-50 text-furly-green",
  },
  {
    icon: GraduationCap,
    title: "Community Groups",
    description: "Join local communities for pet parents and caretakers. Share tips, updates, and support.",
    price: "Free of cost",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Stethoscope,
    title: "Team Furly",
    description: "Platform-led support and activities by Team Furly for the wider pet care community.",
    price: "Free of cost",
    color: "bg-purple-50 text-purple-500",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">What We Offer</span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mt-3">
            Services for Every Paw
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            From grooming to training, find everything your pet needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl shadow-sm hover:shadow-lg transition p-6 group cursor-pointer bg-card"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${service.color} mb-5 group-hover:scale-110 transition-transform`}>
                <service.icon className="h-7 w-7" />
              </div>

              <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {service.description}
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-muted-foreground">Starting at </span>
                  <span className="text-lg font-bold text-foreground">{service.price}</span>
                </div>
                <Link to="/services" className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                  Book Now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
