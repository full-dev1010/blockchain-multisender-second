npm install --save react-apexcharts apexcharts

Use TailWindcss

1.
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
2.
make postcss.config.js file
    // postcss.config.js
    module.exports = {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        }
    }
3.
npx tailwindcss init
4.
App.scss
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

