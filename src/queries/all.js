'use strict'

module.exports = `
{
  allWordpressPage {
    edges {
      node {
        id
        slug
        status
        template
      }
    }
  }

  allWordpressPost {
    edges {
      node {
        id
        date(formatString: "MMMM DD, YYYY")
        title
        excerpt
        slug
        status
        template
        format
      }
    }
  }
}
`

