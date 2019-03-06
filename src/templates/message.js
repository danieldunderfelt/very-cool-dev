import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import MessageItem from '../components/Message'
import get from 'lodash/get'
import SEO from '../components/SEO'
import Helmet from 'react-helmet'
import config from '../../seoConfig'

export const MessageTemplate = ({
  contentComponent,
  helmet,
  post,
  isPreview = false,
}) => {
  return (
    <div>
      {helmet || ''}
      <MessageItem
        contentComponent={contentComponent}
        isLink={false}
        post={post}
        isPreview={isPreview}
      />
    </div>
  )
}

MessageTemplate.propTypes = {
  post: PropTypes.object,
  helmet: PropTypes.object,
}

const Message = ({ data }) => {
  const { markdownRemark: post } = data
  const {
    fields,
    longExcerpt,
    titleExcerpt: title,
    frontmatter: { tags, media_image, normalDate },
  } = post

  const article = {
    title: title,
    slug: get(fields, 'slug', ''),
    imgUrl: get(media_image, 'childImageSharp.fluid.src', ''),
    date: normalDate,
    tags: tags,
    description: longExcerpt,
    authorName: fields.author.name,
  }

  return (
    <Layout>
      <MessageTemplate
        post={post}
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

Message.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Message

export const pageQuery = graphql`
  query MessageByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 256)
      titleExcerpt: excerpt(pruneLength: 30)
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
