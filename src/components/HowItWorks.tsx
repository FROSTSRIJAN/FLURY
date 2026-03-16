import { motion } from "framer-motion";
import { PawPrint, Search, CalendarCheck } from "lucide-react";

const steps = [
  {
    icon: PawPrint,
    step: "01",
    title: "Create Pet Profile",
    description: "Add your furry friend's details — breed, age, medical history, and more.",
  },
  {
    icon: Search,
    step: "02",
    title: "Browse Caretakers",
    description: "Explore verified professionals near you, compare ratings, and read reviews.",
  },
  {
    icon: CalendarCheck,
    step: "03",
    title: "Book Instantly",
    description: "Pick a date, choose a time slot, and book your service in seconds.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Simple & Easy</span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mt-3">
            How Furly Works
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Book trusted pet care in three simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative text-center group rounded-2xl shadow-sm hover:shadow-lg transition p-6"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] border-t-2 border-dashed border-primary/20 pointer-events-none" />
              )}

              <div className="relative z-10 inline-flex items-center justify-center w-20 h-20 rounded-2xl furly-gradient mb-6 group-hover:scale-110 transition-transform duration-300">
                <step.icon className="h-8 w-8 text-primary-foreground" />
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-foreground text-primary-foreground rounded-full text-xs font-bold flex items-center justify-center">
                  {step.step}
                </span>
              </div>

              <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
