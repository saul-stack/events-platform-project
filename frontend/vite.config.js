import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { defineConfig } from "vite";

const environment = process.env.NODE_ENV || "development";
console.log(`Environment: ${environment}`);

if (environment === "development") {
  dotenv.config({ path: `../.env.development` });
} else {
  dotenv.config();
}

export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
  },
  plugins: [react()],
  define: {
    "process.env": {
      ...process.env,
      VITE_STRIPE_PUBLIC_KEY: process.env.VITE_STRIPE_PUBLIC_KEY,
    },
  },
});
