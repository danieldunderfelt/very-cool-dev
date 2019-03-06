import React, { Component } from 'react'
import { Link } from 'gatsby'
import articleStyles from '../style/Article.module.scss'
import TimeDisplay from './TimeDisplay'
import Author from './Author'
import PostMediaImage from './PostMediaImage'
import { HTMLContent } from './Content'
import PostTags from './PostTags'
import classnames from 'classnames'

class Post extends Component {
  render() {
    const { post, highlight = false } = this.props
    const { frontmatter, fields: {slug, author}, excerpt } = post
    const { tags = [], title, date, media_image, ingress } = frontmatter

    const articleIngress = ingress || excerpt

    return (
      <div
        className={classnames(
          articleStyles.Post,
          highlight ? articleStyles.HighlightedPost : ''
        )}>
        <PostTags tags={tags} />
        <Link className={articleStyles.PostLink} to={slug}>
          <h2 className={articleStyles.ArticleHeading}>{title}</h2>
          <div className={articleStyles.PostMeta}>
            <Author author={author} />
            <TimeDisplay date={date} />
          </div>
          <HTMLContent content={articleIngress} />
          <PostMediaImage mediaImage={media_image} />
        </Link>
      </div>
    )
  }
}

export default Post
