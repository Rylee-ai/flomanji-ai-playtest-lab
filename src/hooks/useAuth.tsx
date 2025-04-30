
// Re-export auth functionality from the refactored modules
export { useAuth, AuthProvider } from './auth/AuthContext';
export type { AuthContextType } from './auth/types';

export default useAuth;
