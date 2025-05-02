
import { toast } from "sonner";

/**
 * Standardized toast notification utilities for Flomanji
 * This ensures consistent toast usage across the application
 */

// Success toast with consistent styling
export const showSuccessToast = (message: string, description?: string) => {
  if (description) {
    return toast.success(message, {
      description,
    });
  }
  return toast.success(message);
};

// Error toast with consistent styling
export const showErrorToast = (message: string, description?: string) => {
  if (description) {
    return toast.error(message, {
      description,
    });
  }
  return toast.error(message);
};

// Info toast with consistent styling
export const showInfoToast = (message: string, description?: string) => {
  if (description) {
    return toast(message, {
      description,
    });
  }
  return toast(message);
};

// Warning toast with consistent styling
export const showWarningToast = (message: string, description?: string) => {
  if (description) {
    return toast.warning(message, {
      description,
    });
  }
  return toast.warning(message);
};

// Export the original toast for advanced use cases
export { toast };
