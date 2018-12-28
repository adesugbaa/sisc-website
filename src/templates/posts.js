import React, { Component } from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
//import Img from "gatsby-image"
import Layout from '../components/layout'
//import PostIcons from "../components/PostIcons"

//import { rhythm } from "../utils/typography"


const NavLink = props => {
  if (!props.test) {
    return <Link to={props.url} alt={props.alt} title={props.alt}>{props.text}</Link>
  } else {
    return <span>{props.text}</span>
  }
}

class PostsTemplate extends Component {
  render() {
    console.log(this.props)
    const { pageContext } = this.props
    const { group, index, first, last, pageCount, pathPrefix } = pageContext
    const previousUrl = index - 1 === 1 ? "" : (index - 1).toString()
    const nextUrl = (index + 1).toString()

    console.log(previousUrl)
    console.log(nextUrl)

    return (
      <Layout>
        <h1 style={{ marginBottom: 50 }}>Posts</h1>
        {
          group.map(({node}) => (
            <div key={node.id} className="blogListing" style={{ marginBottom: 50 }}>
              <Link to={`blog/${node.slug}`} style={{ color: 'red' }}>{node.title}</Link>
              <div style={{ fontSize: 12, color: 'blue' }}>{node.date}</div>
              <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          ))
        }

        <NavLink test={first} url={`${pathPrefix}/${previousUrl}`} text="Previous" alt="Go to Previous Page" />
        <span>  {index} of {pageCount}  </span>
        <NavLink test={last} url={`${pathPrefix}/${nextUrl}`} text="Next" alt="Go to Next Page" />
        <div style={{ marginBottom: 75 }} />
      </Layout>
    )
  }
}

PostsTemplate.propTypes = {
  pageContext: PropTypes.object.isRequired,
}

export default PostsTemplate