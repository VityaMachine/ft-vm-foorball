/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: false
    // webpack: (config) => {
    //     // ignore formidable warnings
    //     config.ignoreWarnings = [
    //       { module: /node_modules\/formidable\/src\/Formidable\.js/ },
    //       { file: /node_modules\/formidable\/src\/index\.js/ },
    //     ];
    
    //     return config;
    //   },

    images: {
        domains: ['media.api-sports.io', 'media-4.api-sports.io']
    }
}

module.exports = nextConfig
