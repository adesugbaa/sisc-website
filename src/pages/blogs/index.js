import React, { Component } from "react"
import { graphql, Link } from "gatsby"
import PropTypes from "prop-types"
//import Img from "gatsby-image"
import Layout from '../../components/layout'
//import PostIcons from "../../components/PostIcons"

//import { rhythm } from "../../utils/typography"


class PostsTemplate extends Component {
  render() {
    const data = this.props.data
    const posts = data.allWordpressPost.edges
    console.log(posts)

    return (
      <Layout>
        <h1 style={{ marginBottom: 50 }}>Posts</h1>
        {
          posts.map(({node}) => (
            <div key={node.id} className={"post"} style={{ marginBottom: 50 }}>
              
              <h3>{node.title}</h3>
              
              <div 
                className={"post-content"}
                dangerouslySetInnerHTML={{ __html: node.excerpt }} 
              />

              <span style={{ color: "red", fontSize: 12 }}>{node.date}</span>
              <br/>
              <Link to={`blog/${node.slug}`} style={{color: 'black', fontSize: 13 }}>Read More...</Link>
            </div>
          ))
        }
      </Layout>
    )
  }
}

PostsTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export default PostsTemplate

export const postsQuery = graphql`
  query postsQuery{
    allWordpressPost{
      edges{
        node{
          id
          title
          excerpt
          slug
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`