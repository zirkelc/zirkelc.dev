/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.black'),
            '--tw-prose-headings': theme('colors.black'),
            '--tw-prose-pre-bg': theme('colors.black'),

            a: {
              color: theme('colors.black'),
              '&:hover': {
                color: theme('colors.white'),
                backgroundColor: theme('colors.black'),
              },
            },

            figcaption: {
              'text-align': 'center',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
