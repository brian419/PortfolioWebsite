// /** @type {import('next').NextConfig} */
// // const nextConfig = {};

// const nextConfig = {
//     webpack: (config) => {
//         config.module.rules.push({
//             test: /\.(glsl|vs|fs)$/,
//             exclude: /node_modules/,
//             use: [
//                 {
//                     loader: 'raw-loader',
//                 },
//             ],
//         });
//         return config;
//     },
// };

// export default nextConfig;




/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack: (config) => {
        config.module.rules.push(
            {
                test: /\.(glsl|vs|fs)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'raw-loader',
                    },
                ],
            },
            {
                test: /\.(mov|mp4|webm|ogg|swf|ogv)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        publicPath: '/_next/static/videos/',
                        outputPath: 'static/videos/',
                        name: '[name].[ext]',
                        esModule: false,
                    },
                },
            }
        );
        return config;
    },
};

export default nextConfig;
