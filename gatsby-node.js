const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    query createPagesQuery {
      allAuthor {
        edges {
          node {
            id
            nickname
            email
          }
        }
      }
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              template
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(edge => {
      const id = edge.node.id

      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.template)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })

    const authors = result.data.allAuthor.edges

    authors.forEach(({ node }) => {
      const authorPath = `/author/${_.kebabCase(node.nickname)}/`

      createPage({
        path: authorPath,
        component: path.resolve(`src/templates/author.js`),
        context: {
          ...node,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.sourceNodes = ({ actions, getNodes, getNode }) => {
  const { createNodeField } = actions

  const postsOfAuthors = {}
  // iterate thorugh all markdown nodes to link articles to author
  // and build author index
  const markdownNodes = getNodes()
    .filter(node => node.internal.type === 'MarkdownRemark')
    .forEach(node => {
      if (node.frontmatter.author) {
        const authorNode = getNodes().find(
          authorNode =>
            authorNode.internal.type === 'Author' &&
            authorNode.email === node.frontmatter.author
        )

        if (authorNode) {
          createNodeField({
            node,
            name: 'author',
            value: authorNode.id,
          })

          // if it's first time for this author init empty array for his posts
          if (!(authorNode.id in postsOfAuthors)) {
            postsOfAuthors[authorNode.id] = []
          }
          // add article to this author
          postsOfAuthors[authorNode.id].push(node.id)
        }
      }
    })

  Object.entries(postsOfAuthors).forEach(([authorNodeId, postIds]) => {
    createNodeField({
      node: getNode(authorNodeId),
      name: 'posts',
      value: postIds,
    })
  })
}
