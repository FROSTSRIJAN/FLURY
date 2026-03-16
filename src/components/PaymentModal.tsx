import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, CreditCard, Smartphone, Wallet, CheckCircle, Shield } from "lucide-react";
import { useBookings } from "@/hooks/use-data";
import { useAuth } from "@/context/AuthContext";

interface Props {
  amount: number;
  caretakerName: string;
  bookingId: string;
  onSuccess: () => void;
  onClose: () => void;
}

type Method = "upi" | "card" | "wallet";

export default function PaymentModal({ amount, caretakerName, bookingId, onSuccess, onClose }: Props) {
  const { user } = useAuth();
  const { markPaid } = useBookings(user!.id, "owner");
  const [method, setMethod] = useState<Method>("upi");
  const [paying, setPaying] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const methods: { id: Method; icon: React.ElementType; label: string; desc: string }[] = [
    { id: "upi", icon: Smartphone, label: "UPI", desc: "PhonePe, GPay, Paytm" },
    { id: "card", icon: CreditCard, label: "Card", desc: "Debit / Credit" },
    { id: "wallet", icon: Wallet, label: "Wallet", desc: "Furly Wallet" },
  ];

  function handlePay(e: React.FormEvent) {
    e.preventDefault();
    setPaying(true);
    setTimeout(() => {
      markPaid(bookingId);
      setPaying(false);
      onSuccess();
    }, 1800);
  }

  return (
    <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-card rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-heading font-bold text-lg text-foreground">Secure Payment</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-xl transition-colors"><X className="h-4 w-4" /></button>
        </div>

        <div className="p-6 space-y-5">
          {/* Amount */}
          <div className="bg-furly-peach rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Booking with</p>
              <p className="font-semibold text-foreground">{caretakerName}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-2xl font-bold text-primary">₹{amount}</p>
            </div>
          </div>

          {/* Method toggle */}
          <div className="grid grid-cols-3 gap-2">
            {methods.map((m) => (
              <button key={m.id} type="button" onClick={() => setMethod(m.id)}
                className={`p-3 rounded-xl border text-center transition-all ${method === m.id ? "border-primary bg-furly-peach" : "border-border hover:border-primary/50"}`}>
                <m.icon className={`h-5 w-5 mx-auto mb-1 ${method === m.id ? "text-primary" : "text-muted-foreground"}`} />
                <p className={`text-xs font-semibold ${method === m.id ? "text-primary" : "text-foreground"}`}>{m.label}</p>
                <p className="text-[10px] text-muted-foreground">{m.desc}</p>
              </button>
            ))}
          </div>

          {/* Method-specific inputs */}
          <form onSubmit={handlePay} className="space-y-4">
            {method === "upi" && (
              <div className="space-y-2">
                <Label>UPI ID</Label>
                <Input placeholder="yourname@upi" value={upiId} onChange={(e) => setUpiId(e.target.value)} className="h-12 rounded-xl" required />
              </div>
            )}
            {method === "card" && (
              <>
                <div className="space-y-2">
                  <Label>Card Number</Label>
                  <Input placeholder="1234 5678 9012 3456" value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim())}
                    className="h-12 rounded-xl font-mono" maxLength={19} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Expiry</Label>
                    <Input placeholder="MM/YY" value={expiry}
                      onChange={(e) => { let v = e.target.value.replace(/\D/g, "").slice(0, 4); if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2); setExpiry(v); }}
                      className="h-12 rounded-xl" maxLength={5} required />
                  </div>
                  <div className="space-y-2">
                    <Label>CVV</Label>
                    <Input placeholder="•••" type="password" value={cvv} onChange={(e) => setCvv(e.target.value.slice(0, 3))} className="h-12 rounded-xl" maxLength={3} required />
                  </div>
                </div>
              </>
            )}
            {method === "wallet" && (
              <div className="bg-muted rounded-2xl p-4 text-center">
                <Wallet className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-foreground font-medium">Furly Wallet Balance: <span className="text-primary font-bold">₹5,000</span></p>
                <p className="text-xs text-muted-foreground mt-1">Sufficient balance available</p>
              </div>
            )}

            <Button type="submit" disabled={paying}
              className="w-full h-12 furly-gradient text-primary-foreground border-0 rounded-xl text-base font-semibold disabled:opacity-70">
              {paying ? (
                <span className="flex items-center gap-2"><div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing…</span>
              ) : (
                `Pay ₹${amount} Securely`
              )}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
            <Shield className="h-3 w-3" /> 256-bit SSL encrypted · Demo mode
          </p>
        </div>
      </motion.div>
    </div>
  );
}
