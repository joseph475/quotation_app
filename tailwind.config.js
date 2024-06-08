/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/components/**/*.{html,js,jsx}',
    './src/pages/**/*.{html,js,jsx}',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ]
}

