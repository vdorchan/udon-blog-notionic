export function getAllcategories(posts) {
  const postsWithCategory = posts.filter((post) => post?.category)
  const categories = [...postsWithCategory.map((p) => p.category).flat()]
  const categoryobj = {}
  categories.forEach((category) => {
    if (category in categoryobj) {
      categoryobj[category]++
    } else {
      categoryobj[category] = 1
    }
  })

  return categoryobj
}
