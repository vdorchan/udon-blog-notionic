import filterPublishedPosts from './filterPublishedPosts'
import { getAllPosts } from './getAllPosts'

export function getAllcategories(posts) {
  const postsWithCategory = posts.filter((post) => post?.category)
  const categories = [...postsWithCategory.map((p) => p.category).flat()]
  const categoryobj = {}
  let sumCount = 0
  categories.forEach((category) => {
    if (category in categoryobj) {
      categoryobj[category]++
    } else {
      categoryobj[category] = 1
    }
    sumCount++
  })

  const categoriesConfig = posts
    .filter((p) => p.type && p.type.includes('Category'))
    .sort((a, b) => a.slug - b.slug)
    .map((post) => ({
      title: post.title,
      icon: post.summary,
      count: post.slug === '0' ? sumCount : categoryobj[post.title] || 0,
      showAll: post.slug === '0'
    }))

  return categoriesConfig
}
