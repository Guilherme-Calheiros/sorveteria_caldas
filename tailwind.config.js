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
            colors: {
                'primary-color': {
                    '100': '#FFEBEF',
                    '300': '#FEC2D0',
                    '500': '#FE96AF',
                    '700': '#FE7292',
                    '900': '#F94670',
                },
                'secondary-color': {
                    '100': '#CFF2EE',
                    '300': '#93E1D8',
                    '500': '#4FCFC0',
                    '700': '#30B0A1',
                    '900': '#1A6058',
                },
                'text-color': {
                    'primary': '#140005',
                    'secondary': '#444444',
                },
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                'roboto': ['Roboto', 'sans-serif'],
            },
        },
    },

    plugins: [forms],
};
