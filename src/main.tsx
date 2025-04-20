
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Error handler for uncaught errors
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  
  // Attempt to render a minimal error page if the app hasn't loaded yet
  const rootElement = document.getElementById('root');
  if (rootElement && !rootElement.innerHTML) {
    rootElement.innerHTML = `
      <div style="text-align: center; padding: 2rem; font-family: system-ui, sans-serif;">
        <h1 style="color: #f43f5e;">Unable to Load Application</h1>
        <p>We encountered an error while loading the application.</p>
        <button 
          style="margin-top: 1rem; padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 0.25rem; cursor: pointer;"
          onclick="window.location.reload()">
          Reload Page
        </button>
      </div>
    `;
  }
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

try {
  const container = document.getElementById('root');
  
  if (!container) {
    throw new Error('Root element not found');
  }
  
  const root = createRoot(container);
  root.render(<App />);
  
  console.log('Application successfully mounted');
} catch (error) {
  console.error('Critical error during application initialization:', error);
  
  // Try to render a minimal error page
  const fallbackContainer = document.getElementById('root');
  if (fallbackContainer) {
    fallbackContainer.innerHTML = `
      <div style="text-align: center; padding: 2rem; font-family: system-ui, sans-serif;">
        <h1 style="color: #f43f5e;">Application Failed to Load</h1>
        <p>An unexpected error occurred while starting the application.</p>
        <button 
          style="margin-top: 1rem; padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 0.25rem; cursor: pointer;"
          onclick="window.location.reload()">
          Try Again
        </button>
      </div>
    `;
  }
}
