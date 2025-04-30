
// Re-export auth functionality from the refactored modules
import { useAuth, AuthProvider } from './auth';
import type { AuthContextType } from './auth/types';

export { useAuth, AuthProvider };
export type { AuthContextType };

// Export the default for backward compatibility
export default useAuth;
