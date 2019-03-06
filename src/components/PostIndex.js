import React from 'react'
import style from '../style/PostList.module.scss'
import Post from './Post'
import Message from './Message'
import { get } from 'lodash'
import { graphql } from 'gatsby'

const ARTICLE_TEMPLATE = 'article'
const MESSAGE_TEMPLATE = 'message'

class PostIndex extends React.Component {
  render() {
    const {
      posts,
      highlightFirst = false,
      highlightPinned = false,
    } = this.props
    let sortedPosts = posts.slice()

    let pinnedArticleIndex = highlightFirst
      ? sortedPosts.findIndex(
          ({ node }) => node.frontmatter.template === 'article'
        )
      : -1

    let pinnedMessageIndex = -1

    if (highlightPinned) {
      let pinnedArticle = []
      let pinnedMessage = []

      const firstPinnedArticleIndex = sortedPosts.findIndex(
        ({
          node: {
            frontmatter: { template, pinned },
          },
        }) => template === 'article' && pinned !== 0
      )

      pinnedArticleIndex =
        firstPinnedArticleIndex !== -1
          ? firstPinnedArticleIndex
          : pinnedArticleIndex

      if (pinnedArticleIndex !== -1) {
        pinnedArticle = sortedPosts.splice(pinnedArticleIndex, 1)
      }

      pinnedMessageIndex = sortedPosts.findIndex(
        ({
          node: {
            frontmatter: { template, pinned },
          },
        }) => template === 'message' && pinned !== 0
      )

      if (pinnedMessageIndex !== -1) {
        pinnedMessage = sortedPosts.splice(pinnedMessageIndex, 1)
      }

      sortedPosts = [...pinnedMessage, ...pinnedArticle, ...sortedPosts]
    }

    const didHighlight = []

    return (
      <section className={style.PostsList}>
        {sortedPosts.map(({ node: post }) => {
          const template = get(post, 'frontmatter.template', ARTICLE_TEMPLATE)
          const pinned = get(post, 'frontmatter.pinned', 0) || 0
          let shouldHighlight = false

          if (highlightPinned && !didHighlight.includes(template)) {
            if (template === ARTICLE_TEMPLATE && highlightFirst) {
              shouldHighlight = true
              didHighlight.push(template)
            } else if (
              (!highlightFirst || template === MESSAGE_TEMPLATE) &&
              pinned
            ) {
              shouldHighlight = true
              didHighlight.push(template)
            }
          }

          let ListItem

          switch (template) {
            case MESSAGE_TEMPLATE:
              ListItem = Message
              break
            default:
            case ARTICLE_TEMPLATE:
              ListItem = Post
              break
          }

          return (
            <ListItem
              post={post}
              key={post.id}
              isListing={true}
              highlight={shouldHighlight}
            />
          )
        })}
      </section>
    )
  }
}

export default PostIndex

export const postIndexQuery = graphql`
  fragment PostIndexFragment on MarkdownRemarkEdge {
    node {
      excerpt(pruneLength: 400)
      html
      id
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
        title
        template
        date(formatString: "MMMM DD, YYYY")
        tags
        author
        pinned
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
