import { motion } from "framer-motion";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "GAURI SINGH",
    designation: "CEO",
    image: "/Gauri%20Singh%20CEO.jpeg",
  },
  {
    id: 2,
    name: "NILAY SINGH",
    designation: "CFO",
    image: "/Nilay%20Singh%20CFO.jpeg",
  },
  {
    id: 3,
    name: "AARUSHI KUKREJA",
    designation: "CMO",
    image: "/Aarushi%20Kukreja%20CMO.jpeg",
  },
  {
    id: 4,
    name: "ASHMIT",
    designation: "CO-CMO",
    image: "/Ashmit%20CO-CMO.jpeg",
  },
];

const AboutUsTeam = () => {
  return (
    <section id="about-us" className="py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            About Us
          </span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mt-3">
            Meet the Team Behind Furly
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Hover to view each member and role.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-12 flex justify-center"
        >
          <AnimatedTooltip items={people} className="gap-1" />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsTeam;
