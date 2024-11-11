// next.config.js
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(glsl|vs|fs)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'raw-loader',
                },
            ],
        });
        return config;
    },
};

module.exports = nextConfig;
