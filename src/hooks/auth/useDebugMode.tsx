
import { useState, useEffect } from "react";
import { toast } from "sonner";

/**
 * Hook to manage auth debug mode with keyboard shortcut activation
 */
export function useDebugMode() {
  const [debugMode, setDebugMode] = useState(false);

  // Toggle debug mode with key sequence 'auth-debug'
  useEffect(() => {
    const keys: string[] = [];
    const authDebug = 'auth-debug';
    
    const keyHandler = (e: KeyboardEvent) => {
      keys.push(e.key.toLowerCase());
      if (keys.length > authDebug.length) {
        keys.shift();
      }
      
      if (keys.join('') === authDebug) {
        setDebugMode(prev => !prev);
        console.log("Auth debug mode:", !debugMode);
        toast(debugMode ? "Auth Debug Disabled" : "Auth Debug Enabled", {
          description: "Check console for auth state information"
        });
      }
    };
    
    window.addEventListener('keydown', keyHandler);
    return () => window.removeEventListener('keydown', keyHandler);
  }, [debugMode]);

  return {
    debugMode,
    toggleDebugMode: () => setDebugMode(!debugMode)
  };
}
