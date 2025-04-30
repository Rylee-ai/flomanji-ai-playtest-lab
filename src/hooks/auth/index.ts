
export { useAuth, AuthProvider } from './AuthContext';
export type { AuthContextType } from './types';

// For backward compatibility
import { useAuth as defaultAuth } from './AuthContext';
export default defaultAuth;
