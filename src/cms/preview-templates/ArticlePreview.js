import React from 'react'
import PropTypes from 'prop-types'
import { ArticleTemplate } from '../../templates/article'
import { format } from 'date-fns'

const ArticlePreview = ({ entry, widgetFor }) => {
  const post = {
    frontmatter: {
      tags: entry.getIn(['data', 'tags']),
      date: format(entry.getIn(['data', 'date']), 'MMMM DD, YYYY'),
      title: entry.getIn(['data', 'title']),
      media_image: entry.getIn(['data', 'media_image']),
      author: entry.getIn(['data', 'author']),
    },
    html: widgetFor('body'),
  }

  return <ArticleTemplate post={post} isPreview={true} />
}

ArticlePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default ArticlePreview
