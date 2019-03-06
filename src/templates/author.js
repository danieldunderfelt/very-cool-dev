import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import postsListStyle from '../style/PostList.module.scss'
import get from 'lodash/get'
import PostIndex from '../components/PostIndex'
import config from '../../seoConfig'

class AuthorRoute extends React.Component {
  render() {
    const { data } = this.props
    const posts = get(data, 'allMarkdownRemark.edges', [])
    const author = get(data, 'author', {})
    const { name } = author

    return (
      <Layout>
        <Helmet>
          <title>{`Posts by ${name} | ${config.siteTitle}`}</title>
        </Helmet>
        <div>
          <h3 className={postsListStyle.ListHeading}>
            Posts by{' '}
            <strong className={postsListStyle.HeadingTag}>{name}</strong>
          </h3>
          <PostIndex posts={posts} />
        </div>
      </Layout>
    )
  }
}

export default AuthorRoute

export const authorPageQuery = graphql`
  query AuthorPage($email: String) {
    author(email: { eq: $email }) {
      avatar
      bio
      email
      name
      nickname
      role
      twitter_handle
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
          author: { eq: $email }
          template: { in: ["article", "message"] }
        }
      }
    ) {
      edges {
        ...PostIndexFragment
      }
    }
  }
`
