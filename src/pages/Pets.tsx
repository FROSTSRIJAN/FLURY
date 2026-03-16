import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { usePets } from "@/hooks/use-data";
import { Pet } from "@/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2, X, PawPrint } from "lucide-react";

const SPECIES_OPTIONS = ["Dog", "Cat", "Bird", "Rabbit", "Fish", "Hamster", "Other"];
const SPECIES_EMOJI: Record<string, string> = {
  Dog: "🐕", Cat: "🐈", Bird: "🦜", Rabbit: "🐇", Fish: "🐟", Hamster: "🐹", Other: "🐾",
};

const EMPTY_FORM = { name: "", species: "Dog", breed: "", age: "", notes: "" };

export default function Pets() {
  const { user } = useAuth();
  const { pets, addPet, removePet } = usePets(user!.id);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      addPet({
        name: form.name,
        species: form.species,
        breed: form.breed,
        age: parseInt(form.age) || 0,
        notes: form.notes,
        emoji: SPECIES_EMOJI[form.species] || "🐾",
      });
      setForm(EMPTY_FORM);
      setShowForm(false);
      setSaving(false);
    }, 400);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="furly-container pt-28 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">My Pets 🐾</h1>
              <p className="text-muted-foreground mt-1">Manage your furry family members</p>
            </div>
            <Button onClick={() => setShowForm(true)} className="furly-gradient text-primary-foreground border-0 rounded-full px-6">
              <PlusCircle className="h-4 w-4 mr-2" /> Add Pet
            </Button>
          </div>
        </motion.div>

        {/* Add Pet Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card rounded-3xl p-8 w-full max-w-lg shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-bold">Add a Pet</h2>
                  <button onClick={() => setShowForm(false)} className="p-2 hover:bg-muted rounded-xl transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Pet Name *</Label>
                    <Input placeholder="e.g., Max" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-12 rounded-xl" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Species *</Label>
                      <select
                        value={form.species}
                        onChange={(e) => setForm({ ...form, species: e.target.value })}
                        className="w-full h-12 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        {SPECIES_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Age (years)</Label>
                      <Input type="number" min="0" max="30" placeholder="2" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className="h-12 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Breed</Label>
                    <Input placeholder="e.g., Golden Retriever" value={form.breed} onChange={(e) => setForm({ ...form, breed: e.target.value })} className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Notes (medications, allergies, etc.)</Label>
                    <Textarea placeholder="Any special care instructions…" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="rounded-xl min-h-[80px]" />
                  </div>
                  <Button type="submit" disabled={saving} className="w-full h-12 furly-gradient text-primary-foreground border-0 rounded-xl text-base font-semibold">
                    {saving ? "Saving…" : `Add ${SPECIES_EMOJI[form.species] || "🐾"} ${form.name || "Pet"}`}
                  </Button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pet Cards */}
        {pets.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <div className="text-7xl mb-6">🐾</div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-2">No pets yet</h2>
            <p className="text-muted-foreground mb-6">Add your first furry friend to get started!</p>
            <Button onClick={() => setShowForm(true)} className="furly-gradient text-primary-foreground border-0 rounded-full px-8 h-12">
              <PlusCircle className="h-4 w-4 mr-2" /> Add Your First Pet
            </Button>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pets.map((pet, i) => (
              <motion.div
                key={pet.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="furly-card p-6 relative group"
              >
                <button
                  onClick={() => removePet(pet.id)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg bg-destructive/10 text-destructive opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
                <div className="text-5xl mb-4">{pet.emoji || SPECIES_EMOJI[pet.species] || "🐾"}</div>
                <h3 className="text-xl font-heading font-bold text-foreground">{pet.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{pet.species}{pet.breed ? ` · ${pet.breed}` : ""}</p>
                {pet.age > 0 && (
                  <span className="inline-block mt-2 text-xs bg-furly-peach text-primary px-3 py-1 rounded-full font-medium">
                    {pet.age} year{pet.age !== 1 ? "s" : ""} old
                  </span>
                )}
                {pet.notes && (
                  <p className="mt-3 text-xs text-muted-foreground bg-muted rounded-xl p-2 leading-relaxed">{pet.notes}</p>
                )}
              </motion.div>
            ))}

            {/* Add more card */}
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: pets.length * 0.08 }}
              onClick={() => setShowForm(true)}
              className="furly-card p-6 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border hover:border-primary transition-colors min-h-[160px] group"
            >
              <PlusCircle className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Add another pet</span>
            </motion.button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
