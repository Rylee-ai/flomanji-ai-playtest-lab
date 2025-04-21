
import { Loader2 } from "lucide-react";

export const ErrorFallback = () => (
  <div className="flex items-center justify-center h-screen flex-col p-4">
    <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
    <p className="mb-4">We're sorry, but there was an error loading the application.</p>
    <button 
      onClick={() => window.location.href = '/'}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Return to Home
    </button>
  </div>
);

export const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <Loader2 className="h-8 w-8 animate-spin mr-2" />
    <span>Loading application...</span>
  </div>
);

