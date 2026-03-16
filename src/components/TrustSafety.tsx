import { motion } from "framer-motion";
import { Shield, BadgeCheck, HeadphonesIcon, Lock } from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Verified Professionals",
    description: "Every caretaker undergoes thorough background verification and identity checks.",
  },
  {
    icon: Shield,
    title: "Insurance Coverage",
    description: "All bookings include pet insurance for your complete peace of mind.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Our support team is always available to help you with any concerns.",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    description: "Bank-grade encryption protects every transaction on our platform.",
  },
];

const TrustSafety = () => {
  return (
    <section id="trust" className="py-20 lg:py-28 bg-foreground text-primary-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-furly-orange/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Your Pet's Safety First</span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mt-3">
            Trust & Safety
          </h2>
          <p className="mt-4 text-lg opacity-70">
            We go above and beyond to ensure every pet receives safe, professional care
          </p>
        </motion.div>

        <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center rounded-2xl shadow-sm hover:shadow-lg transition p-6 bg-primary-foreground/5 hover:bg-primary-foreground/10"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl furly-gradient mb-5">
                <feature.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-heading font-bold mb-2">{feature.title}</h3>
              <p className="text-sm opacity-70 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSafety;
