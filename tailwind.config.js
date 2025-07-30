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
      fontFamily: {
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
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
              textDecoration: 'none',
              borderBottom: '2px dotted',
              borderColor: theme('colors.gray.400'),
              paddingBottom: '2px',
              '&:hover': {
                color: theme('colors.white'),
                backgroundColor: theme('colors.black'),
                borderColor: theme('colors.white'),

                code: {
                  color: theme('colors.white'),
                  backgroundColor: theme('colors.black'),
                },
              },
            },

            code: {
              backgroundColor: theme('colors.gray.100'),
              color: theme('colors.black'),
              padding: '0.125rem 0.125rem',
              borderRadius: '0.25rem',
              fontFamily: theme('fontFamily.mono'),
              fontSize: '0.875em',
              fontWeight: '500',
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
