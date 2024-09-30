import { defineConfig } from "vite";
import dotenv from "dotenv";
import react from "@vitejs/plugin-react";

const environment = process.env.NODE_ENV || "development";

if (environment === "development") {
  dotenv.config({ path: `../.env.development` });
  console.log("Loaded STRIPE_PUBLIC_KEY:", process.env.VITE_STRIPE_PUBLIC_KEY);
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
