import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import PostIndex from '../components/PostIndex'
import SEO from '../components/SEO'
import config from '../../seoConfig'
import { hasPinnedMessage, hasPinnedArticle } from '../util/hasPinnedMessage'
import { get } from 'lodash'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    let posts = get(data, 'allMarkdownRemark.edges', [])

    const messagePinned = hasPinnedMessage(posts)
    const articlePinned = hasPinnedArticle(posts)

    return (
      <Layout topSpace={messagePinned}>
        <Helmet title={config.siteTitle} />
        <SEO />
        <PostIndex
          posts={posts}
          highlightFirst={!articlePinned}
          highlightPinned={true}
        />
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: {
        order: [DESC, DESC]
        fields: [frontmatter___date, frontmatter___pinned]
      }
      filter: { frontmatter: { template: { in: ["article", "message"] } } }
    ) {
      edges {
        ...PostIndexFragment
      }
    }
  }
`
