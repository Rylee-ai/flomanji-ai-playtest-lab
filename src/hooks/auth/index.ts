
// Export auth functionality directly from AuthContext
export { useAuth, AuthProvider } from './AuthContext';
export type { AuthContextType } from './types';

// For backward compatibility
import { useAuth } from './AuthContext';
export default useAuth;
