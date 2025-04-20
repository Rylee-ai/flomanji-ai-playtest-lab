
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Ensure we have a valid root element before rendering
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found! Cannot mount React application.");
} else {
  const root = createRoot(rootElement);
  root.render(<App />);
}
