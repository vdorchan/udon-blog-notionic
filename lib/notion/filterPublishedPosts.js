export default function filterPublishedPosts({
  posts,
  onlyNewsletter,
  onlyPost,
  onlyHidden
}) {
  if (!posts || !posts.length) return []
  return posts.filter((post) => {
    let matched = onlyNewsletter ? post?.type?.[0] === 'Newsletter' : post

    matched = matched && (onlyPost ? post?.type?.[0] === 'Post' : post)

    matched =
      matched &&
      (onlyHidden ? post?.type?.[0] === 'Hidden' : post?.type?.[0] !== 'Hidden')

    matched =
      matched &&
      post.title &&
      post?.status?.[0] === 'Published' &&
      post.date <= new Date()

    matched = matched && post?.type?.[0] !== 'Category'

    return matched
  })
}
