require("dotenv").config({
  path: `.env.development`,
})

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: ["Price"],
        secretKey: process.env.STRIPE_SECRET_KEY,
        downloadFiles: false,
      },
    },
  ],

}
