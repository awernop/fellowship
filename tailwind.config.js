import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Manrope', ...defaultTheme.fontFamily.sans],
                //manrope: ['Manrope', ...defaultTheme.fontFamily.sans],
                /*montserrat: ['Montserrat'],
                ntsomic: ['NTSomic'],*/
              },
              colors: {
                elephant: '#f5f6f9',
                night: '#2a303e',
                flower: '#4e43e5',
                bloom: '#564be9',
              },
        },
    },

    plugins: [forms],
};
