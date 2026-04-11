import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0b0f17',
          900: '#0f1623',
          800: '#162235'
        },
        sand: {
          50: '#faf7f2',
          100: '#f5efe6',
          200: '#eadfce'
        }
      },
      boxShadow: {
        soft: '0 12px 40px rgba(15, 22, 35, 0.10)'
      }
    }
  },
  plugins: []
};

export default config;
