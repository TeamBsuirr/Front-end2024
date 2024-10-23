import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "build", // Указываем папку для сборки
    },
    define: {
        "process.env": {
            VITE_API_BASE_URL:
                process.env.VITE_API_BASE_URL || "http://localhost:8080/api",
        },
    },
});
