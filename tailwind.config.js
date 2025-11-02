/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 主色调
        primary: {
          50: '#E6F0FF',
          500: '#0057B7',
          700: '#003E80',
        },
        // 中性色
        neutral: {
          0: '#FFFFFF',
          50: '#F8F9FA',
          200: '#E5E7EB',
          500: '#6B7280',
          900: '#111827',
        },
        // 语义色
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        'sans': ['Noto Sans TC', 'ui-sans-serif', 'system-ui'],
      },
      fontSize: {
        'xs': ['12px', '1.5'],
        'sm': ['14px', '1.5'],
        'base': ['16px', '1.6'],
        'lg': ['18px', '1.6'],
        'xl': ['20px', '1.5'],
        '2xl': ['24px', '1.4'],
        '3xl': ['28px', '1.4'],
        '4xl': ['32px', '1.3'],
        '5xl': ['36px', '1.3'],
        '6xl': ['48px', '1.2'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'md': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'lg': '0 10px 24px rgba(0, 0, 0, 0.12)',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
}