import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import postsListStyle from '../style/PostList.module.scss'
import get from 'lodash/get'
import PostIndex from '../components/PostIndex'
import config from '../../seoConfig'

class TagRoute extends React.Component {
  render() {
    const { data } = this.props
    const posts = get(data, 'allMarkdownRemark.edges', [])
    const tag = this.props.pageContext.tag

    return (
      <Layout>
        <Helmet>
          <title>{`Tagged with ${tag} | ${config.siteTitle}`}</title>
        </Helmet>
        <div>
          <h3 className={postsListStyle.ListHeading}>
            Posts with tag{' '}
            <strong className={postsListStyle.HeadingTag}>{tag}</strong>
          </h3>
          <PostIndex posts={posts} />
        </div>
      </Layout>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
          tags: { in: [$tag] }
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
