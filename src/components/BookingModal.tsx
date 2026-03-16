import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Caretaker, ServiceType } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { useBookings } from "@/hooks/use-data";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Pet } from "@/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { X, Star, CheckCircle } from "lucide-react";
import PaymentModal from "@/components/PaymentModal";

interface Props {
  caretaker: Caretaker;
  onClose: () => void;
}

export default function BookingModal({ caretaker, onClose }: Props) {
  const { user } = useAuth();
  const { createBooking } = useBookings(user!.id, "owner");
  const [pets] = useLocalStorage<Pet[]>("pets", []);
  const myPets = pets.filter((p) => p.ownerId === user!.id);

  const [selectedPet, setSelectedPet] = useState(myPets[0]?.id || "");
  const [selectedService, setSelectedService] = useState<ServiceType>(caretaker.services[0]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [step, setStep] = useState<"form" | "payment" | "success">("form");
  const [bookingId, setBookingId] = useState("");

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

  function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedPet || !date) return;
    const bk = createBooking({
      ownerId: user!.id,
      caretakerId: caretaker.id,
      petId: selectedPet,
      service: selectedService,
      date,
      time,
    });
    setBookingId(bk.id);
    setStep("payment");
  }

  if (step === "success") {
    return (
      <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-card rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl">
          <div className="w-20 h-20 mx-auto mb-6 furly-gradient rounded-full flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Booking Confirmed!</h2>
          <p className="text-muted-foreground mb-2">Your booking with <strong>{caretaker.name}</strong> has been placed.</p>
          <p className="text-sm text-muted-foreground">Date: <strong>{date}</strong> at <strong>{time}</strong></p>
          <Button onClick={onClose} className="mt-6 furly-gradient text-primary-foreground border-0 rounded-full px-8 h-12 w-full font-semibold">
            Done 🐾
          </Button>
        </motion.div>
      </div>
    );
  }

  if (step === "payment") {
    return (
      <PaymentModal
        amount={caretaker.price}
        caretakerName={caretaker.name}
        bookingId={bookingId}
        onSuccess={() => setStep("success")}
        onClose={onClose}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-card rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="furly-gradient p-6 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                {caretaker.initials}
              </div>
              <div>
                <h2 className="text-xl font-heading font-bold">{caretaker.name}</h2>
                <div className="flex items-center gap-1 text-sm opacity-90">
                  <Star className="h-3 w-3 fill-white" />
                  {caretaker.rating} · {caretaker.city}
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleConfirm} className="p-6 space-y-5">
          {/* Service */}
          <div className="space-y-2">
            <Label>Service</Label>
            <div className="flex flex-wrap gap-2">
              {caretaker.services.map((s) => (
                <button key={s} type="button" onClick={() => setSelectedService(s)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${selectedService === s ? "furly-gradient text-primary-foreground border-transparent" : "border-border hover:border-primary text-foreground"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Pet */}
          <div className="space-y-2">
            <Label>Select Pet</Label>
            {myPets.length === 0 ? (
              <p className="text-sm text-muted-foreground bg-furly-peach rounded-xl px-4 py-3">
                No pets added yet. <a href="/pets" className="text-primary font-medium underline">Add a pet first →</a>
              </p>
            ) : (
              <select value={selectedPet} onChange={(e) => setSelectedPet(e.target.value)}
                className="w-full h-12 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" required>
                {myPets.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.species})</option>)}
              </select>
            )}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" min={minDateStr} value={date} onChange={(e) => setDate(e.target.value)} className="h-12 rounded-xl" required />
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="h-12 rounded-xl" required />
            </div>
          </div>

          {/* Price summary */}
          <div className="bg-furly-peach rounded-xl px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-foreground font-medium">{selectedService} with {caretaker.name}</span>
            <span className="text-lg font-bold text-primary">₹{caretaker.price}</span>
          </div>

          <Button type="submit" disabled={myPets.length === 0} className="w-full h-12 furly-gradient text-primary-foreground border-0 rounded-xl text-base font-semibold disabled:opacity-60">
            Continue to Payment →
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
