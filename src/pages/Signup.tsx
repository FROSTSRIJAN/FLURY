import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PawPrint, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"owner" | "caretaker">("owner");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    setTimeout(() => {
      const result = signup({ name: `${firstName} ${lastName}`.trim(), email, password, role, city: city || undefined });
      if (result.success) {
        navigate(role === "caretaker" ? "/caretaker-dashboard" : "/dashboard", { replace: true });
      } else {
        setError(result.error || "Signup failed.");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div>
            <Link to="/" className="flex items-center gap-2 mb-8">
              <div className="furly-gradient rounded-xl p-2">
                <PawPrint className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-heading font-bold text-foreground">Furly</span>
            </Link>
            <h1 className="text-3xl font-heading font-bold text-foreground">Create your account</h1>
            <p className="text-muted-foreground mt-2">Join the Furly family today</p>
          </div>

          {/* Role Toggle */}
          <div className="flex bg-muted rounded-xl p-1">
            <button
              type="button"
              onClick={() => setRole("owner")}
              className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${role === "owner" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
            >🐕 Pet Owner</button>
            <button
              type="button"
              onClick={() => setRole("caretaker")}
              className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${role === "caretaker" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
            >💼 Caretaker</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 bg-destructive/10 text-destructive rounded-xl px-4 py-3 text-sm">
                <AlertCircle className="h-4 w-4 shrink-0" />{error}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="h-12 rounded-xl" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} className="h-12 rounded-xl" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-xl" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-12 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Min 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 rounded-xl pr-10" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="e.g., Bangalore" value={city} onChange={(e) => setCity(e.target.value)} className="h-12 rounded-xl" />
            </div>
            <div className="flex items-start gap-2 pt-1">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground">By signing up you agree to Furly's Terms of Service and Privacy Policy.</p>
            </div>
            <Button type="submit" disabled={loading} className="w-full h-12 furly-gradient text-primary-foreground border-0 rounded-xl text-base font-semibold disabled:opacity-70">
              {loading ? "Creating account…" : "Create Account"}
              {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>

      {/* Right - Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center furly-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-foreground/10" />
        <div className="relative z-10 text-center text-primary-foreground p-12 max-w-md">
          <div className="text-6xl mb-6">{role === "owner" ? "🐾" : "🤝"}</div>
          <h2 className="text-3xl font-heading font-bold mb-4">
            {role === "owner" ? "Your Pet Deserves the Best" : "Earn Doing What You Love"}
          </h2>
          <p className="text-lg opacity-80">
            {role === "owner"
              ? "Connect with verified, loving caretakers in your area."
              : "Join 1,000+ caretakers earning on Furly."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
