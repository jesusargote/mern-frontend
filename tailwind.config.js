/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"  // Escanea todos los archivos JSX y JS en src
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Tipografía profesional
      },
      colors: {
        sena: {
          verde: '#39a900',     // Verde institucional
          oscuro: '#007832',    // Verde oscuro (hover)
          gris: '#6b7280',      // Gris general (textos, iconos)
        }
      }
    },
  },
  plugins: [],
}
