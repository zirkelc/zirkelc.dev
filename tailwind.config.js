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
      // a: ({ theme }) => ({
      //   color: theme('colors.black'),
      //   '&:hover': {
      //     color: theme('colors.white'),
      //     backgroundColor: theme('colors.black'),
      //   },
      // }),
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

              a: {
                color: 'inherit',
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
