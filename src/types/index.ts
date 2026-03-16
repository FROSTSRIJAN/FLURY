export interface User {
  id: string;
  name: string;
  email: string;
  role: "owner" | "caretaker";
  createdAt: string;
  city?: string;
}

export interface Pet {
  id: string;
  ownerId: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  notes?: string;
  emoji?: string;
}

export interface Caretaker {
  id: string;
  name: string;
  avatar: string;
  initials: string;
  services: ServiceType[];
  rating: number;
  reviewCount: number;
  price: number;
  priceLabel: string;
  city: string;
  experience: string;
  bio: string;
  verified: boolean;
}

export interface Booking {
  id: string;
  ownerId: string;
  caretakerId: string;
  petId: string;
  service: ServiceType;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "rejected";
  createdAt: string;
  paid?: boolean;
}

export interface Review {
  id: string;
  bookingId: string;
  ownerId: string;
  caretakerId: string;
  rating: number;
  comment: string;
  ownerName: string;
  createdAt: string;
}

export type ServiceType =
  | "Pet Sitting"
  | "Grooming"
  | "Pet Walking"
  | "Training"
  | "Vet Consultation";
