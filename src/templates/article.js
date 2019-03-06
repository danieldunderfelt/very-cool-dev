import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import styles from '../style/Article.module.scss'
import layoutStyles from '../style/Layout.module.scss'
import Author from '../components/Author'
import TimeDisplay from '../components/TimeDisplay'
import PostMediaImage from '../components/PostMediaImage'
import PostTags from '../components/PostTags'
import get from 'lodash/get'
import SEO from '../components/SEO'
import config from '../../seoConfig'

export const ArticleTemplate = ({
  contentComponent,
  helmet,
  post,
  authors,
  isPreview,
}) => {
  const PostContent = contentComponent || Content
  const {
    fields: { author },
    frontmatter: { tags = [], date, title, media_image, ingress = '' },
    html,
  } = post

  return (
    <div className={layoutStyles.Page}>
      <section className={styles.ArticlePage}>
        {helmet || ''}
        <PostTags tags={tags} renderLink={!isPreview} />
        <h1 className={styles.ArticleHeading}>{title}</h1>
        <div className={styles.PostMeta}>
          <Author author={author} />
          <TimeDisplay date={date} />
        </div>
        <PostMediaImage mediaImage={media_image} description={title} />
        <PostContent ingress content={ingress} />
        <PostContent content={html} />
      </section>
    </div>
  )
}

ArticleTemplate.propTypes = {
  contentComponent: PropTypes.func,
  post: PropTypes.object,
  helmet: PropTypes.object,
}

const Article = ({ data }) => {
  const { markdownRemark: post } = data
  const {
    fields,
    longExcerpt,
    frontmatter: { title, tags, media_image, normalDate, ingress = '' },
  } = post

  const article = {
    title: title,
    slug: get(fields, 'slug', ''),
    imgUrl: get(media_image, 'childImageSharp.fluid.src', ''),
    date: normalDate,
    tags: tags,
    description: ingress || longExcerpt,
    authorName: fields.author.name,
  }

  return (
    <Layout>
      <ArticleTemplate
        post={post}
        contentComponent={HTMLContent}
        helmet={
          <>
            <Helmet>
              <title>{`${title} | ${config.siteTitle}`}</title>
            </Helmet>
            <SEO post={article} postSEO={true} />
          </>
        }
      />
    </Layout>
  )
}

Article.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Article

export const pageQuery = graphql`
  query ArticleByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 256)
      longExcerpt: excerpt(pruneLength: 400)
      html
      fields {
        slug
        author {
          avatar
          email
          name
          nickname
          role
          twitter_handle
        }
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        normalDate: date(formatString: "YYYY-MM-DDTHH:mm:ssZZ")
        title
        tags
        author
        ingress
        media_image {
          childImageSharp {
            fixed {
              width
              height
            }
            fluid {
              src
              aspectRatio
              srcSet
              sizes
            }
          }
        }
      }
    }
  }
`
