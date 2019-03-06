import React from 'react'
import articleStyles from '../style/Article.module.scss'
import TimeDisplay from './TimeDisplay'
import Author from './Author'
import PostMediaImage from './PostMediaImage'
import PostTags from './PostTags'
import classnames from 'classnames'
import { Link } from 'gatsby'
import { HTMLContent } from './Content'

const Message = ({
  post,
  isLink = true,
  isListing = false,
  highlight = false,
  isPreview = false,
  contentComponent,
}) => {
  const PostContent = contentComponent || HTMLContent

  const {
    frontmatter,
    fields: { slug, author },
    html,
  } = post
  const { tags = [], date, media_image } = frontmatter

  const LinkComponent = !isPreview && isLink ? Link : 'div'

  return (
    <div
      className={classnames(
        articleStyles.Message,
        !isLink ? articleStyles.NoEffectMessage : '',
        isListing ? articleStyles.InPostListing : '',
        highlight ? articleStyles.HighlightedMessage : ''
      )}>
      {highlight && <PostTags tags={tags} />}
      <Author author={author} />
      <PostContent content={html} />
      {media_image && <PostMediaImage mediaImage={media_image} />}
      <div
        className={classnames(
          articleStyles.PostMeta,
          articleStyles.MessageMeta
        )}>
        {!highlight && <PostTags tags={tags} renderLink={!isPreview} />}
        <LinkComponent to={slug}>
          <TimeDisplay date={date} />
        </LinkComponent>
      </div>
    </div>
  )
}

export default Message
