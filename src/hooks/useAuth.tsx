
// Re-export auth functionality from the refactored modules
export { useAuth, AuthProvider } from './auth';
export type { AuthContextType } from './auth/types';

// Export the default for backward compatibility
import { useAuth as authHook } from './auth';
export default authHook;
