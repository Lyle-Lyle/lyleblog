const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    flowbite.content(),
  ],
  theme: {
    extend: {},
    plugins: [
      require('flowbite/plugin'),
      flowbite.plugin(),
    ]
  },
  // darkMode: 'media',
  // corePlugins: {
  //   preflight: false,
  // }
}



