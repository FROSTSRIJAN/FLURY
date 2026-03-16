import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PawPrint, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        const stored = JSON.parse(localStorage.getItem("currentUser") || "{}");
        const dest = from || (stored.role === "caretaker" ? "/caretaker-dashboard" : "/dashboard");
        navigate(dest, { replace: true });
      } else {
        setError(result.error || "Login failed.");
      }
      setLoading(false);
    }, 500);
  };

  // Demo quick-login helpers
  const demoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("demo");
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
            <h1 className="text-3xl font-heading font-bold text-foreground">Welcome back</h1>
            <p className="text-muted-foreground mt-2">Sign in to manage your bookings</p>
          </div>

          {/* Demo shortcuts */}
          <div className="bg-furly-peach rounded-xl p-3 space-y-2">
            <p className="text-xs font-semibold text-primary">🎬 Demo quick-login</p>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => demoLogin("owner@demo.com")} className="text-xs bg-white border border-border rounded-lg px-3 py-1.5 hover:bg-primary/5 transition-colors">Pet Owner</button>
              <button onClick={() => demoLogin("caretaker@demo.com")} className="text-xs bg-white border border-border rounded-lg px-3 py-1.5 hover:bg-primary/5 transition-colors">Caretaker</button>
            </div>
            <p className="text-xs text-muted-foreground">First use <Link to="/signup" className="text-primary underline">Signup</Link> to create these accounts, then login.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 bg-destructive/10 text-destructive rounded-xl px-4 py-3 text-sm">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <span className="text-sm text-primary cursor-pointer hover:underline">Forgot password?</span>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 furly-gradient text-primary-foreground border-0 rounded-xl text-base font-semibold disabled:opacity-70"
            >
              {loading ? "Signing in…" : "Sign In"}
              {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-semibold hover:underline">Sign up</Link>
          </p>
        </motion.div>
      </div>

      {/* Right - Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center furly-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-foreground/10" />
        <div className="relative z-10 text-center text-primary-foreground p-12 max-w-md">
          <div className="text-6xl mb-6">🐾</div>
          <h2 className="text-3xl font-heading font-bold mb-4">Fur The Love of Paws</h2>
          <p className="text-lg opacity-80">Care you can trust. Love they deserve.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
