
export type UserRole = "admin" | "player";

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  createdAt: string;
}

export interface WaitlistEntry {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MailingAddress {
  id: string;
  userId: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlayerDetails {
  id: string;
  userId: string;
  waitlistId: string;
  shippingStatus: 'pending' | 'processing' | 'shipped' | 'delivered';
  trackingNumber?: string;
  trackingUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlayerConversation {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: PlayerMessage[];
}

export interface PlayerMessage {
  id: string;
  conversationId: string;
  role: "human" | "ai";
  content: string;
  timestamp: string;
}
