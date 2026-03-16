import { motion } from "framer-motion";
import { Smartphone, Apple, Play } from "lucide-react";

const AppDownload = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-3xl furly-gradient p-8 md:p-16 overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-foreground/10 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-primary-foreground/5 translate-y-1/3 -translate-x-1/4 pointer-events-none" />

          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground">
                Get the Furly App
              </h2>
              <p className="text-primary-foreground/80 text-lg leading-relaxed">
                Book pet care services on the go. Get real-time updates, chat with caretakers, and manage everything from your phone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center gap-3 bg-foreground text-primary-foreground px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
                  <Apple className="h-6 w-6" />
                  <div className="text-left">
                    <p className="text-[10px] opacity-70">Download on the</p>
                    <p className="text-sm font-semibold">App Store</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 bg-foreground text-primary-foreground px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
                  <Play className="h-6 w-6" />
                  <div className="text-left">
                    <p className="text-[10px] opacity-70">Get it on</p>
                    <p className="text-sm font-semibold">Google Play</p>
                  </div>
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-56 h-96 rounded-[2.5rem] bg-foreground/20 border-2 border-primary-foreground/20 flex items-center justify-center">
                  <div className="text-center text-primary-foreground">
                    <Smartphone className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-sm font-semibold opacity-70">Coming Soon</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
