const seoConfig = require('./seoConfig')

module.exports = {
  siteMetadata: {
    siteUrl: seoConfig.siteUrl,
    siteUrlShort: seoConfig.siteUrlShort,
    siteTitle: seoConfig.siteTitle,
    siteTitleAlt: seoConfig.siteTitleAlt,
    siteDescription: seoConfig.siteDescription,
    siteLogo: seoConfig.siteLogo,
    siteKeyWords: seoConfig.siteKeyWords,
    favicon: seoConfig.favicon,
    title: seoConfig.siteTitle,
    description: seoConfig.siteDescription,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-catch-links',
    `gatsby-plugin-twitter`,
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Barlow`,
            variants: [`300`, `300i`, `400`, `400i`, `700`, `700i`],
          },
          {
            family: `IBM Plex Mono`,
            variants: [`300`, `400`, `700`],
          },
        ],
      },
    },
    'gatsby-plugin-sass',
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/content`,
        name: 'content',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.5rem`,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-transformer-json',
      options: {
        typeName: ({ node }) => {
          if (node.relativePath.match(/^author/g)) {
            return 'Author'
          }

          return 'Json'
        },
      },
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        include: /icons/,
        svgo: false,
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `#4b72ff`,
        // Disable the loading spinner.
        showSpinner: false,
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
  mapping: {
    'MarkdownRemark.fields.author': 'Author',
  },
}
