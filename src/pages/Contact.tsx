import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, CheckCircle, Instagram } from "lucide-react";

const CONTACT_INFO = [
  { icon: Mail, label: "Email", value: "hello@furly.in" },
  { icon: Instagram, label: "Instagram", value: "@__furly__", href: "https://www.instagram.com/__furly__?igsh=MXJteDZvdGViMWFwNw%3D%3D&utm_source=qr" },
  { icon: Phone, label: "Phone", value: "9650673927" },
  { icon: MapPin, label: "Location", value: "Bangalore, India" },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSent(true);
      setSending(false);
    }, 800);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-12 bg-furly-cream">
        <div className="furly-container max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
              Get in <span className="furly-gradient-text">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-4">We'd love to hear from you. Our team replies within 24 hours.</p>
          </motion.div>
        </div>
      </section>

      <section className="furly-section">
        <div className="furly-container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Contact Information</h2>
                <p className="text-muted-foreground">Reach out to us by any of the channels below or submit a message using the form.</p>
              </div>
              <div className="space-y-4">
                {CONTACT_INFO.map((item) => (
                  <div key={item.label} className="flex items-center gap-4 furly-card p-4">
                    <div className="w-12 h-12 furly-gradient rounded-2xl flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
                      {"href" in item ? (
                        <a href={item.href} target="_blank" rel="noreferrer" className="font-semibold text-foreground hover:underline">
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-semibold text-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="furly-card p-8">
              {sent ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 mx-auto furly-gradient rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground text-sm">Thanks for reaching out. We'll get back to you soon.</p>
                  <Button onClick={() => { setSent(false); setName(""); setEmail(""); setMessage(""); }} variant="outline" className="mt-6 rounded-full">Send another</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-heading font-bold text-foreground">Send a Message</h3>
                  <div className="space-y-2">
                    <Label>Your Name</Label>
                    <Input placeholder="Jane Smith" value={name} onChange={(e) => setName(e.target.value)} className="h-12 rounded-xl" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input type="email" placeholder="jane@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-xl" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Message</Label>
                    <Textarea placeholder="How can we help you?" value={message} onChange={(e) => setMessage(e.target.value)} className="rounded-xl min-h-[120px]" required />
                  </div>
                  <Button type="submit" disabled={sending} className="w-full h-12 furly-gradient text-primary-foreground border-0 rounded-xl font-semibold disabled:opacity-70">
                    {sending ? "Sending…" : <><Send className="h-4 w-4 mr-2" /> Send Message</>}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
