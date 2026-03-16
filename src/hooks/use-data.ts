import { useLocalStorage } from "@/hooks/use-local-storage";
import { Pet, Booking, Review } from "@/types";

export function usePets(ownerId: string) {
  const [pets, setPets] = useLocalStorage<Pet[]>("pets", []);
  const myPets = pets.filter((p) => p.ownerId === ownerId);

  function addPet(data: Omit<Pet, "id" | "ownerId">) {
    const pet: Pet = { ...data, id: `pet_${Date.now()}`, ownerId };
    setPets([...pets, pet]);
    return pet;
  }

  function removePet(id: string) {
    setPets(pets.filter((p) => p.id !== id));
  }

  return { pets: myPets, addPet, removePet };
}

export function useBookings(userId: string, role: "owner" | "caretaker") {
  const [bookings, setBookings] = useLocalStorage<Booking[]>("bookings", []);

  const myBookings =
    role === "owner"
      ? bookings.filter((b) => b.ownerId === userId)
      : bookings.filter((b) => b.caretakerId === userId);

  function createBooking(data: Omit<Booking, "id" | "createdAt" | "status" | "paid">) {
    const booking: Booking = {
      ...data,
      id: `bk_${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
      paid: false,
    };
    setBookings([...bookings, booking]);
    return booking;
  }

  function updateStatus(id: string, status: Booking["status"]) {
    setBookings(bookings.map((b) => (b.id === id ? { ...b, status } : b)));
  }

  function markPaid(id: string) {
    setBookings(bookings.map((b) => (b.id === id ? { ...b, paid: true, status: "confirmed" } : b)));
  }

  return { bookings: myBookings, allBookings: bookings, createBooking, updateStatus, markPaid };
}

export function useReviews() {
  const [reviews, setReviews] = useLocalStorage<Review[]>("reviews", []);

  function addReview(data: Omit<Review, "id" | "createdAt">) {
    const review: Review = { ...data, id: `rv_${Date.now()}`, createdAt: new Date().toISOString() };
    setReviews([...reviews, review]);
    return review;
  }

  function getCaretakerReviews(caretakerId: string) {
    return reviews.filter((r) => r.caretakerId === caretakerId);
  }

  return { reviews, addReview, getCaretakerReviews };
}
