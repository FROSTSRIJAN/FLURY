import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useReviews } from "@/hooks/use-data";
import { mockCaretakers } from "@/data/caretakers";
import { Caretaker, ServiceType } from "@/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Search, MapPin, BadgeCheck, Filter, X, SlidersHorizontal } from "lucide-react";

const SERVICE_FILTERS: (ServiceType | "All")[] = ["All", "Pet Sitting", "Grooming", "Pet Walking", "Training", "Vet Consultation"];

export default function Marketplace() {
  const { user } = useAuth();
  const { getCaretakerReviews } = useReviews();

  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState<ServiceType | "All">("All");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCaretaker, setSelectedCaretaker] = useState<Caretaker | null>(null);

  const filtered = mockCaretakers.filter((ct) => {
    const matchSearch = ct.name.toLowerCase().includes(search.toLowerCase()) ||
      ct.city.toLowerCase().includes(search.toLowerCase()) ||
      ct.services.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchService = serviceFilter === "All" || ct.services.includes(serviceFilter);
    const matchPrice = ct.price <= maxPrice;
    const matchRating = ct.rating >= minRating;
    return matchSearch && matchService && matchPrice && matchRating;
  });

  function ratingStars(rating: number) {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(rating) ? "fill-furly-orange text-furly-orange" : "text-muted-foreground"}`} />
    ));
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-8 bg-furly-cream">
        <div className="furly-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
              Find Your <span className="furly-gradient-text">Perfect Caretaker</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-4">Browse verified professionals in your city</p>
            <div className="flex gap-3 mt-8 max-w-lg mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by name, city, or service…" value={search} onChange={(e) => setSearch(e.target.value)} className="h-12 rounded-xl pl-10" />
              </div>
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className={`h-12 rounded-xl px-4 gap-2 ${showFilters ? "border-primary text-primary" : ""}`}>
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Bar */}
      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-card border-b border-border overflow-hidden">
            <div className="furly-container py-5 space-y-4">
              <div className="flex flex-wrap gap-2">
                {SERVICE_FILTERS.map((s) => (
                  <button key={s} onClick={() => setServiceFilter(s)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${serviceFilter === s ? "furly-gradient text-primary-foreground border-transparent" : "border-border hover:border-primary text-foreground"}`}>
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-6 items-center">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Max Price: ₹{maxPrice}</label>
                  <input type="range" min={300} max={2000} step={100} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-40 accent-primary" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Min Rating: {minRating > 0 ? `⭐ ${minRating}+` : "Any"}</label>
                  <input type="range" min={0} max={4.5} step={0.5} value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} className="w-40 accent-primary" />
                </div>
                <button onClick={() => { setServiceFilter("All"); setMaxPrice(2000); setMinRating(0); }} className="text-sm text-destructive flex items-center gap-1 hover:underline">
                  <X className="h-3.5 w-3.5" /> Reset
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <section className="furly-section">
        <div className="furly-container">
          <p className="text-sm text-muted-foreground mb-6">{filtered.length} caretaker{filtered.length !== 1 ? "s" : ""} found</p>
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">No results found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((ct, i) => {
                const ctReviews = getCaretakerReviews(ct.id);
                const displayRating = ctReviews.length > 0
                  ? (ctReviews.reduce((s, r) => s + r.rating, 0) / ctReviews.length).toFixed(1)
                  : ct.rating.toFixed(1);
                const reviewCount = ct.reviewCount + ctReviews.length;

                return (
                  <motion.div key={ct.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                    className="furly-card p-6 flex flex-col gap-4">
                    {/* Avatar + name */}
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-2xl furly-gradient flex items-center justify-center text-xl font-bold text-primary-foreground shrink-0">
                        {ct.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-heading font-bold text-lg text-foreground">{ct.name}</h3>
                          {ct.verified && <BadgeCheck className="h-4 w-4 text-primary shrink-0" />}
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          {ratingStars(parseFloat(displayRating))}
                          <span className="text-sm font-semibold text-foreground ml-1">{displayRating}</span>
                          <span className="text-xs text-muted-foreground">({reviewCount})</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" /> {ct.city} · {ct.experience} exp
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-muted-foreground leading-relaxed">{ct.bio}</p>

                    {/* Services chips */}
                    <div className="flex flex-wrap gap-2">
                      {ct.services.map((s) => (
                        <span key={s} className="text-xs bg-furly-peach text-primary px-3 py-1 rounded-full font-medium">{s}</span>
                      ))}
                    </div>

                    {/* Recent user reviews */}
                    {ctReviews.length > 0 && (
                      <div className="bg-muted rounded-xl p-3 space-y-2">
                        {ctReviews.slice(-2).map((r) => (
                          <div key={r.id} className="text-xs">
                            <div className="flex items-center gap-1 mb-0.5">
                              {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-2.5 w-2.5 fill-furly-orange text-furly-orange" />)}
                              <span className="text-muted-foreground ml-1 font-medium">{r.ownerName}</span>
                            </div>
                            <p className="text-muted-foreground italic">"{r.comment}"</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Price + Book */}
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground">Starting at</p>
                        <p className="text-xl font-bold text-foreground">{ct.priceLabel}</p>
                      </div>
                      {user ? (
                        <Button onClick={() => setSelectedCaretaker(ct)} className="furly-gradient text-primary-foreground border-0 rounded-full px-6 h-10 font-semibold text-sm">
                          Book Now
                        </Button>
                      ) : (
                        <a href="/login">
                          <Button variant="outline" className="rounded-full px-6 h-10 text-sm border-primary text-primary">Sign in to Book</Button>
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedCaretaker && (
          <BookingModal caretaker={selectedCaretaker} onClose={() => setSelectedCaretaker(null)} />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
