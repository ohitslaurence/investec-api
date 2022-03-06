const path = require('path')
const {defineConfig} = require('vite')

module.exports = defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/main.ts'),
            name: 'InvestecOpenApi',
            fileName: (format) => `investec-api.${format}.js`,
        },
        rollupOptions: {},
    },
})
