import React, { Component } from 'react'
import styles from '../style/Article.module.scss'
import get from 'lodash/get'

class PostMediaImage extends Component {
  render() {
    const { mediaImage, description = '' } = this.props

    if (typeof mediaImage === 'string') {
      return <img alt={description} src={mediaImage} />
    }

    const fluid = get(mediaImage, 'childImageSharp.fluid', null)

    if (!fluid) {
      return null
    }

    return (
      <picture className={styles.MediaImage}>
        <source srcSet={fluid.srcSet} sizes={fluid.sizes} />
        <img alt={description} src={fluid.src} />
      </picture>
    )
  }
}

export default PostMediaImage
