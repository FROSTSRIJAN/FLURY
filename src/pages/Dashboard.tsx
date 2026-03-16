import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useBookings } from "@/hooks/use-data";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Pet, Booking } from "@/types";
import { mockCaretakers } from "@/data/caretakers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  PawPrint, CalendarDays, Clock, Heart, ArrowRight,
  Star, TrendingUp, PlusCircle, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const STATUS_COLORS: Record<Booking["status"], string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-green-100 text-green-700",
  completed: "bg-blue-100 text-blue-700",
  rejected: "bg-red-100 text-red-700",
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [pets] = useLocalStorage<Pet[]>("pets", []);
  const myPets = pets.filter((p) => p.ownerId === user!.id);
  const { bookings } = useBookings(user!.id, "owner");

  const upcoming = bookings.filter((b) => b.status === "pending" || b.status === "confirmed");
  const past = bookings.filter((b) => b.status === "completed" || b.status === "rejected");

  const getCaretaker = (id: string) => mockCaretakers.find((c) => c.id === id);
  const getPet = (id: string) => myPets.find((p) => p.id === id);

  const stats = [
    { icon: PawPrint, label: "My Pets", value: myPets.length, color: "text-primary", bg: "bg-furly-peach" },
    { icon: CalendarDays, label: "Total Bookings", value: bookings.length, color: "text-blue-500", bg: "bg-blue-50" },
    { icon: Clock, label: "Upcoming", value: upcoming.length, color: "text-amber-600", bg: "bg-amber-50" },
    { icon: TrendingUp, label: "Completed", value: past.filter((b) => b.status === "completed").length, color: "text-furly-green", bg: "bg-green-50" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="furly-container pt-28 pb-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">
              Welcome back, {user!.name.split(" ")[0]} 👋
            </h1>
            <p className="text-muted-foreground mt-1">Here's what's happening with your pets today.</p>
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
          {/* My Pets */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-heading font-bold text-foreground">My Pets</h2>
              <Link to="/pets">
                <Button size="sm" variant="ghost" className="text-primary gap-1">
                  <PlusCircle className="h-4 w-4" /> Add
                </Button>
              </Link>
            </div>
            {myPets.length === 0 ? (
              <div className="furly-card p-8 text-center">
                <div className="text-4xl mb-3">🐾</div>
                <p className="text-muted-foreground text-sm mb-4">No pets added yet.</p>
                <Link to="/pets">
                  <Button size="sm" className="furly-gradient text-primary-foreground border-0 rounded-full">Add your first pet</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {myPets.map((pet) => (
                  <motion.div key={pet.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    className="furly-card p-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl furly-gradient flex items-center justify-center text-2xl shrink-0">
                      {pet.emoji || (pet.species === "Dog" ? "🐕" : pet.species === "Cat" ? "🐈" : "🐾")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">{pet.name}</p>
                      <p className="text-xs text-muted-foreground">{pet.breed} · {pet.age} yr{pet.age !== 1 ? "s" : ""}</p>
                    </div>
                  </motion.div>
                ))}
                <Link to="/pets" className="block text-center text-sm text-primary font-medium hover:underline pt-1">
                  Manage all pets <ChevronRight className="inline h-3 w-3" />
                </Link>
              </div>
            )}
          </div>

          {/* Bookings */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-heading font-bold text-foreground">Upcoming Bookings</h2>
                <Link to="/marketplace"><Button size="sm" variant="ghost" className="text-primary gap-1"><PlusCircle className="h-4 w-4" /> Book</Button></Link>
              </div>
              {upcoming.length === 0 ? (
                <div className="furly-card p-8 text-center">
                  <div className="text-4xl mb-3">📅</div>
                  <p className="text-muted-foreground text-sm mb-4">No upcoming bookings.</p>
                  <Link to="/marketplace"><Button size="sm" className="furly-gradient text-primary-foreground border-0 rounded-full">Browse Caretakers</Button></Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcoming.map((b) => {
                    const ct = getCaretaker(b.caretakerId);
                    const pet = getPet(b.petId);
                    return (
                      <motion.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="furly-card p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full furly-gradient flex items-center justify-center text-sm font-bold text-primary-foreground shrink-0">
                          {ct?.initials || "??"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold text-foreground">{ct?.name || "Caretaker"}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[b.status]}`}>{b.status}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{b.service} · {pet?.name} · {b.date} at {b.time}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Recommended */}
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground mb-4">Recommended Caretakers</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {mockCaretakers.slice(0, 4).map((ct) => (
                  <motion.div key={ct.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="furly-card p-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full furly-gradient flex items-center justify-center text-sm font-bold text-primary-foreground shrink-0">
                      {ct.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm truncate">{ct.name}</p>
                      <p className="text-xs text-muted-foreground">{ct.services[0]} · {ct.priceLabel}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="h-3 w-3 fill-furly-orange text-furly-orange" />
                        <span className="text-xs font-medium">{ct.rating}</span>
                      </div>
                    </div>
                    <Link to="/marketplace">
                      <Button size="sm" variant="outline" className="rounded-full text-xs h-8">Book</Button>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-4">
                <Link to="/marketplace">
                  <Button variant="outline" className="rounded-full px-8 border-primary text-primary hover:bg-primary/5">
                    View All Caretakers <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
