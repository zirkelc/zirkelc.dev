/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class',
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
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.black'),
            '--tw-prose-headings': theme('colors.black'),
            '--tw-prose-pre-bg': theme('colors.gray.100'),

            a: {
              color: theme('colors.gray.500'),
              textDecoration: 'underline',
              textDecorationStyle: 'dotted',
              textDecorationThickness: '1px',
              textUnderlineOffset: '4px',
              fontWeight: 'inherit',
              transition: 'color 150ms ease',
              '&:hover': {
                color: theme('colors.black'),
                textDecorationStyle: 'solid',
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

            pre: {
              marginLeft: '-1rem',
              marginRight: '-1rem',
              paddingLeft: '1rem',
              paddingRight: '1rem',
              borderRadius: '0.375rem',
              scrollbarWidth: 'thin',
              scrollbarColor: `${theme('colors.gray.500')} transparent`,
              '&::-webkit-scrollbar': {
                height: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: theme('colors.gray.500'),
                borderRadius: '9999px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: theme('colors.gray.400'),
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
        invert: {
          css: {
            '--tw-prose-body': theme('colors.white'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-pre-bg': theme('colors.gray.800'),

            a: {
              color: theme('colors.gray.500'),
              textDecoration: 'underline',
              textDecorationStyle: 'dotted',
              textDecorationThickness: '1px',
              textUnderlineOffset: '4px',
              fontWeight: 'inherit',
              transition: 'color 150ms ease',
              '&:hover': {
                color: theme('colors.white'),
                textDecorationStyle: 'solid',
              },
            },

            code: {
              backgroundColor: theme('colors.gray.800'),
              color: theme('colors.white'),
              padding: '0.125rem 0.125rem',
              borderRadius: '0.25rem',
              fontFamily: theme('fontFamily.mono'),
              fontSize: '0.875em',
              fontWeight: '500',
            },

            pre: {
              marginLeft: '-1rem',
              marginRight: '-1rem',
              paddingLeft: '1rem',
              paddingRight: '1rem',
              borderRadius: '0.375rem',
              scrollbarWidth: 'thin',
              scrollbarColor: `${theme('colors.gray.600')} transparent`,
              '&::-webkit-scrollbar': {
                height: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: theme('colors.gray.600'),
                borderRadius: '9999px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: theme('colors.gray.500'),
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
