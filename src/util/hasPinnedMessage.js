export function hasPinnedMessage(posts) {
  return posts.some(
    ({ node: { frontmatter: { template = 'article', pinned = 0 } = {} } }) =>
      template === 'message' && pinned
  )
}

export function hasPinnedArticle(posts) {
  return posts.some(
    ({ node: { frontmatter: { template = 'article', pinned = 0 } = {} } }) =>
      template === 'article' && pinned
  )
}
