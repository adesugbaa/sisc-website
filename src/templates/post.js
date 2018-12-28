import React, { Component } from "react"
import { graphql, Link } from "gatsby"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import Layout from '../components/layout'
import PostIcons from "../components/PostIcons"

import { rhythm } from "../utils/typography"


class PostTemplate extends Component {
  render() {
    const post = this.props.data.wordpressPost

    console.log(post)

    const commentsBlock = (
      <div>
        <hr />
        <h2>Comments</h2>
        <p>No comments yet.</p>
      </div>
    );

    return (
      <Layout>
        <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
        <PostIcons node={post} css={{ marginBottom: rhythm(1 / 2) }} />
        <div style={{ paddingTop: 48 }} dangerouslySetInnerHTML={{ __html: post.content }} />
        {
          post.acf &&
          (
            <div>
              { post.acf.facebook &&
              <div>
                <h4>Facebook</h4>
                <span>{post.acf.facebook}</span>
              </div>
              }

              { post.acf.twitter &&
              <div>
                <h4>Twitter</h4>
                <span>{post.acf.twitter}</span>
              </div>
              }
            </div>
          )
        }
        <div style={{ marginBottom: 32 }} />
        {commentsBlock}
        <div style={{ marginBottom: 75 }} />
      </Layout>
    )
  }
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export default PostTemplate

export const pageQuery = graphql`
  query($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      content
      tags {
        name
        slug
      }
      categories {
        count
        name
        slug
      }
      acf {
        twitter
        facebook
      }
      date(formatString: "MMMM DD, YYYY")
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`