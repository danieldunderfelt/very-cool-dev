import React, { Component } from 'react'
import styles from '../style/Article.module.scss'
import { Link } from 'gatsby'
import { kebabCase } from 'lodash'

class PostTags extends Component {
  render() {
    const { tags = [], renderLink = true } = this.props

    const LinkComponent = renderLink ? Link : 'span'

    return (
      <>
        {tags && tags.length !== 0 && (
          <div className={styles.PostTags}>
            <ul>
              {tags.map(tag => (
                <li key={`tag_${tag}`}>
                  <LinkComponent to={`/tags/${kebabCase(tag)}/`}>
                    {tag}
                  </LinkComponent>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }
}

export default PostTags
