import * as React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const rootEl = document.getElementById("root");
console.log('[main] root element:', rootEl);

if (rootEl) {
  createRoot(rootEl).render(<App />);
} else {
  console.error('[main] #root not found!');
  document.body.innerHTML = '<div style="padding:32px;font-family:monospace;color:red">#root element not found</div>';
}
