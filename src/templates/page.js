import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import layoutStyles from '../style/Layout.module.scss'
import articleStyles from '../style/Article.module.scss'
import Helmet from 'react-helmet'
import config from '../../seoConfig'

export const PageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <div className={layoutStyles.Page}>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <section className={articleStyles.ArticlePage}>
        <h1 className={articleStyles.ArticleHeading}>{title}</h1>
        <PageContent content={content} />
      </section>
    </div>
  )
}

PageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const Page = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <PageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Page

export const aboutPageQuery = graphql`
  query Page($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
