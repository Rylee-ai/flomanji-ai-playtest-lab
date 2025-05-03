
// This file is a simple re-export to maintain backward compatibility

// Import directly from the auth context file to avoid circular dependencies
import { useAuth, AuthProvider } from './auth/AuthContext';
import type { AuthContextType } from './auth/types';

export { useAuth, AuthProvider };
export type { AuthContextType };

// Export default for backward compatibility
export default useAuth;
