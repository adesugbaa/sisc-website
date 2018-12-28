/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const _ = require(`lodash`);
const path = require(`path`);
const slash = require(`slash`);
const Promise = require(`bluebird`)
const queries = require(`./src/queries/all.js`)
const createPaginatedPages = require('gatsby-paginate')

exports.onCreateNode = ({ node }) => {
  console.log(node.internal.type)
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const pageTemplate = path.resolve(`./src/templates/page.js`)
  const postTemplate = path.resolve(`./src/templates/post.js`)

  return new Promise((resolve, reject) => {
    
    graphql(queries).then(result => {
      console.log(result)
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }

      const pages = result.data.allWordpressPage.edges
      const posts = result.data.allWordpressPost.edges
      
      _.each(pages, page => {
        createPage({
          // will be the url for the page
          path: page.node.slug,
          // specify the component template of your choice
          component: slash(pageTemplate),
          // In the ^template's GraphQL query, 'id' will be available
          // as a GraphQL variable to query for this posts's data.
          context: {
            id: page.node.id,
          },
        })
      })

      _.each(posts, post => {
        createPage({
          path: `blog/${post.node.slug}`,
          component: slash(postTemplate),
          context: {
            id: post.node.id,
          },
        })
      })

      createPaginatedPages({
        edges: posts,
        createPage: createPage,
        pageTemplate: 'src/templates/posts.js',
        pageLength: 10,
        pathPrefix: 'blog/page'
      })

      resolve()
    })
  })
}
