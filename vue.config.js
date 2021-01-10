module.exports = {
  transpileDependencies: ["vuetify"],
  lintOnSave: process.env.NODE_ENV !== "production",
  devServer: {
    proxy: {
      "/source": {
        target: "http://localhost:3000",
        ws: true,
        changeOrigin: true,
        pathRewrite: { "^/source": "" }
      }
    }
  }
};
