import React from 'react'
import PropTypes from 'prop-types'
import styles from '../style/Article.module.scss'
import classnames from 'classnames'

export const HTMLContent = ({ content, className, ingress = false }) => (
  <div
    className={classnames(
      className,
      styles.ArticleBody,
      ingress ? styles.ArticleIngress : ''
    )}
    dangerouslySetInnerHTML={{ __html: content }}
  />
)

const Content = ({ content, className }) => (
  <div className={classnames(className, styles.ArticleExcerpt)}>{content}</div>
)

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
}

HTMLContent.propTypes = Content.propTypes

export default Content
