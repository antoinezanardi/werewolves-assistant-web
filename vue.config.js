module.exports = {
    pages: {
        index: {
            entry: "src/main.js",
            template: "public/index.html",
            filename: "index.html",
            title: "Assistant Loups-Garous",
            chunks: ["chunk-vendors", "chunk-common", "index"],
        },
    },
};