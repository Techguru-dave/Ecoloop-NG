module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1b5e20',
        primaryDark: '#00450d',
        lightGreen: '#e8f5e9',
        accent: '#ff6b35',
        mutedText: '#717a6d',
        text: '#191d17'
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px' }],
        sm: ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg: ['20px', { lineHeight: '28px' }],
        xl: ['24px', { lineHeight: '32px' }],
        '2xl': ['32px', { lineHeight: '40px' }]
      }
    }
  },
  plugins: []
}
