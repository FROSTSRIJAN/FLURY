import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    pet: "Golden Retriever Owner",
    rating: 5,
    text: "Furly has been a lifesaver! The caretaker was incredibly professional and my dog absolutely loved her. Highly recommend!",
    avatar: "PS",
  },
  {
    name: "Arjun Mehta",
    pet: "Persian Cat Owner",
    rating: 5,
    text: "The grooming service was top-notch. My cat looks amazing and the groomer was so gentle. Will definitely book again.",
    avatar: "AM",
  },
  {
    name: "Sneha Reddy",
    pet: "Labrador Owner",
    rating: 5,
    text: "Finding a trusted pet sitter was always stressful. Furly made it so easy with verified profiles and real reviews.",
    avatar: "SR",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 lg:py-28 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Happy Pet Parents</span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mt-3">
            What Our Customers Say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="rounded-2xl shadow-sm hover:shadow-lg transition p-6 space-y-4 bg-card"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-furly-orange text-furly-orange" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed italic">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full furly-gradient flex items-center justify-center text-sm font-bold text-primary-foreground">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.pet}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
