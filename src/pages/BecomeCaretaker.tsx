import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  PawPrint, CheckCircle, ArrowRight, Heart, Shield, Banknote, Clock
} from "lucide-react";

const benefits = [
  { icon: Banknote, title: "Earn ₹30,000+/month", description: "Set your own prices and work on your schedule." },
  { icon: Heart, title: "Do What You Love", description: "Spend your days caring for adorable pets." },
  { icon: Shield, title: "Insurance Included", description: "Every booking includes pet care insurance." },
  { icon: Clock, title: "Flexible Hours", description: "Choose when and how much you want to work." },
];

const BecomeCaretaker = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 furly-gradient text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-foreground/5" />
        <div className="furly-container relative z-10 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-5xl mb-6">🐾</div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              Become a Furly Caretaker
            </h1>
            <p className="text-lg mt-4 opacity-80 max-w-xl mx-auto">
              Join India's fastest-growing pet care community. Earn money doing what you love while making pet parents happy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="furly-section">
        <div className="furly-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="furly-card p-6 text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl furly-gradient mb-4">
                  <b.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-bold text-foreground text-lg mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="furly-section bg-furly-cream">
        <div className="furly-container max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-heading font-bold text-foreground">Apply Now</h2>
            <p className="text-muted-foreground mt-2">Fill out the form and we'll get back to you within 24 hours</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="furly-card p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="Your full name" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input type="tel" placeholder="+91 98765 43210" className="h-12 rounded-xl" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="you@example.com" className="h-12 rounded-xl" />
            </div>

            <div className="space-y-2">
              <Label>City</Label>
              <Input placeholder="e.g., Bangalore, Mumbai" className="h-12 rounded-xl" />
            </div>

            <div className="space-y-2">
              <Label>Experience with Pets</Label>
              <Textarea
                placeholder="Tell us about your experience with pet care..."
                className="rounded-xl min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Services You Can Offer</Label>
              <div className="grid grid-cols-2 gap-3">
                {["Pet Sitting", "Grooming", "Pet Walking", "Training", "Vet Support"].map((s) => (
                  <label key={s} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-border text-primary" />
                    <span className="text-sm text-foreground">{s}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1 rounded border-border" />
              <p className="text-sm text-muted-foreground">
                I agree to undergo background verification and abide by Furly's code of conduct.
              </p>
            </div>

            <Button type="submit" className="w-full h-12 furly-gradient text-primary-foreground border-0 rounded-xl text-base font-semibold">
              Submit Application
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BecomeCaretaker;
