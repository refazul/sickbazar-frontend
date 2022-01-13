module.exports = {
    purge: [
        // Use *.tsx if using TypeScript
        './pages/**/*.js',
        './components/**/*.js'
    ],
    // ...
    variants: {
        extend: {
            display: ['group-hover'],
        }
    },
}