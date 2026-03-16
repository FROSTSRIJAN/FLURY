import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useBookings, useReviews } from "@/hooks/use-data";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Booking, Pet, User } from "@/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle, XCircle, Clock, Star, CalendarDays,
  TrendingUp, Banknote, X, ThumbsUp,
} from "lucide-react";

const STATUS_COLORS: Record<Booking["status"], string> = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  confirmed: "bg-green-100 text-green-700 border-green-200",
  completed: "bg-blue-100 text-blue-700 border-blue-200",
  rejected: "bg-red-100 text-red-700 border-red-200",
};

export default function CaretakerDashboard() {
  const { user, logout } = useAuth();
  const { bookings, allBookings, updateStatus } = useBookings(user!.id, "caretaker");
  const { addReview, getCaretakerReviews } = useReviews();
  const [pets] = useLocalStorage<Pet[]>("pets", []);
  const [users] = useLocalStorage<User[]>("users", []);

  const [reviewModal, setReviewModal] = useState<{ booking: Booking; ownerName: string } | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const myReviews = getCaretakerReviews(user!.id);
  const avgRating = myReviews.length
    ? (myReviews.reduce((s, r) => s + r.rating, 0) / myReviews.length).toFixed(1)
    : "—";

  const earned = bookings
    .filter((b) => b.status === "confirmed" || b.status === "completed")
    .length * 1200; // demo flat rate

  const stats = [
    { icon: CalendarDays, label: "Total Bookings", value: bookings.length, bg: "bg-blue-50", color: "text-blue-500" },
    { icon: Clock, label: "Pending", value: bookings.filter((b) => b.status === "pending").length, bg: "bg-amber-50", color: "text-amber-600" },
    { icon: TrendingUp, label: "Confirmed", value: bookings.filter((b) => b.status === "confirmed").length, bg: "bg-green-50", color: "text-furly-green" },
    { icon: Banknote, label: "Est. Earnings", value: `₹${earned.toLocaleString()}`, bg: "bg-furly-peach", color: "text-primary" },
  ];

  function getOwnerName(ownerId: string) {
    const u = users.find((u) => u.id === ownerId);
    return u?.name || "Pet Owner";
  }

  function getPetName(petId: string) {
    const p = pets.find((p) => p.id === petId);
    return p ? `${p.name} (${p.species})` : "Unknown pet";
  }

  function handleComplete(b: Booking) {
    updateStatus(b.id, "completed");
    const ownerName = getOwnerName(b.ownerId);
    setReviewModal({ booking: b, ownerName });
  }

  function submitReview() {
    if (!reviewModal) return;
    addReview({
      bookingId: reviewModal.booking.id,
      ownerId: reviewModal.booking.ownerId,
      caretakerId: user!.id,
      rating,
      comment,
      ownerName: reviewModal.ownerName,
    });
    setReviewModal(null);
    setRating(5);
    setComment("");
  }

  const pending = bookings.filter((b) => b.status === "pending");
  const active = bookings.filter((b) => b.status === "confirmed");
  const history = bookings.filter((b) => b.status === "completed" || b.status === "rejected");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="furly-container pt-28 pb-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Caretaker Dashboard 💼</h1>
            <p className="text-muted-foreground mt-1">Welcome back, {user!.name.split(" ")[0]}! Manage your bookings here.</p>
          </div>
          <Button onClick={logout} variant="outline" className="rounded-full px-6">Log out</Button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="furly-card p-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center shrink-0`}>
                <s.icon className={`h-6 w-6 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pending requests */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pending */}
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground mb-4">New Requests {pending.length > 0 && <span className="ml-2 text-sm bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">{pending.length}</span>}</h2>
              {pending.length === 0 ? (
                <div className="furly-card p-8 text-center">
                  <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground text-sm">No new booking requests.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pending.map((b) => (
                    <motion.div key={b.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                      className="furly-card p-5 border-l-4 border-amber-400">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <p className="font-semibold text-foreground">{getOwnerName(b.ownerId)}</p>
                          <p className="text-sm text-muted-foreground mt-0.5">{b.service} · {getPetName(b.petId)}</p>
                          <p className="text-sm text-muted-foreground">{b.date} at {b.time}</p>
                          {b.paid && <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">✓ Paid</span>}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => updateStatus(b.id, "confirmed")}
                            className="bg-green-500 hover:bg-green-600 text-white border-0 rounded-full gap-1">
                            <CheckCircle className="h-3.5 w-3.5" /> Accept
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => updateStatus(b.id, "rejected")}
                            className="border-red-300 text-red-600 hover:bg-red-50 rounded-full gap-1">
                            <XCircle className="h-3.5 w-3.5" /> Reject
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Active */}
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground mb-4">Active Bookings</h2>
              {active.length === 0 ? (
                <div className="furly-card p-6 text-center">
                  <p className="text-muted-foreground text-sm">No active bookings.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {active.map((b) => (
                    <motion.div key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="furly-card p-5 border-l-4 border-green-400">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-foreground">{getOwnerName(b.ownerId)}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_COLORS[b.status]}`}>{b.status}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">{b.service} · {getPetName(b.petId)}</p>
                          <p className="text-sm text-muted-foreground">{b.date} at {b.time}</p>
                        </div>
                        <Button size="sm" onClick={() => handleComplete(b)}
                          className="furly-gradient text-primary-foreground border-0 rounded-full gap-1">
                          <ThumbsUp className="h-3.5 w-3.5" /> Mark Complete
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* History */}
            {history.length > 0 && (
              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-4">History</h2>
                <div className="space-y-2">
                  {history.map((b) => (
                    <div key={b.id} className="furly-card p-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{getOwnerName(b.ownerId)}</p>
                        <p className="text-xs text-muted-foreground">{b.service} · {b.date}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_COLORS[b.status]}`}>{b.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reviews sidebar */}
          <div>
            <div className="furly-card p-6 space-y-4 sticky top-24">
              <div className="text-center pb-4 border-b border-border">
                <div className="w-16 h-16 mx-auto furly-gradient rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground mb-3">
                  {user!.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <h3 className="font-heading font-bold text-foreground">{user!.name}</h3>
                <p className="text-sm text-muted-foreground">{user!.city || "Caretaker"}</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Star className="h-4 w-4 fill-furly-orange text-furly-orange" />
                  <span className="font-bold text-foreground">{avgRating}</span>
                  <span className="text-muted-foreground text-sm">({myReviews.length} reviews)</span>
                </div>
              </div>

              <h4 className="font-heading font-semibold text-foreground">Recent Reviews</h4>
              {myReviews.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No reviews yet. Complete bookings to receive ratings!</p>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {myReviews.slice().reverse().map((r) => (
                    <div key={r.id} className="bg-muted rounded-xl p-3">
                      <div className="flex items-center gap-1 mb-1">
                        {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-3 w-3 fill-furly-orange text-furly-orange" />)}
                        <span className="text-xs font-medium text-muted-foreground ml-auto">{r.ownerName}</span>
                      </div>
                      <p className="text-xs text-foreground italic">"{r.comment}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review submission modal */}
      <AnimatePresence>
        {reviewModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-card rounded-3xl p-8 w-full max-w-sm shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-bold">Rate {reviewModal.ownerName}</h2>
                <button onClick={() => setReviewModal(null)} className="p-2 hover:bg-muted rounded-xl"><X className="h-4 w-4" /></button>
              </div>
              <p className="text-sm text-muted-foreground mb-4">How was this booking? Leave a note for your profile.</p>
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} onClick={() => setRating(n)}>
                    <Star className={`h-8 w-8 transition-all ${n <= rating ? "fill-furly-orange text-furly-orange scale-110" : "text-muted-foreground"}`} />
                  </button>
                ))}
              </div>
              <Textarea placeholder="Write a short comment…" value={comment} onChange={(e) => setComment(e.target.value)} className="rounded-xl mb-4" />
              <Button onClick={submitReview} className="w-full furly-gradient text-primary-foreground border-0 rounded-xl font-semibold h-11">
                Submit Review
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
