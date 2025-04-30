
/**
 * Interface representing a shipping entry with all its data
 */
export interface ShippingEntry {
  id: string;
  userId: string;
  waitlistId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  trackingNumber?: string;
  trackingUrl?: string;
  createdAt: string;
  updatedAt: string;
  address?: {
    street: string;
    apartment?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}
