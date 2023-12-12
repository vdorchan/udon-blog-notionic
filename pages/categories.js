import {
  getAllPosts,
  getAllTagsFromPosts,
  getAllcategories
} from '@/lib/notion'
import { CategoriesBar } from '@/components/CategoriesBar'

export default function categories({ categories, posts }) {
  return <CategoriesBar categories={categories} posts={posts} />
}
export async function getStaticProps() {
  const posts = await getAllPosts({ onlyNewsletter: false })
  const tags = getAllTagsFromPosts(posts)
  const categories = await getAllcategories(posts)
  return {
    props: {
      categories,
      posts
    },
    revalidate: 1
  }
}
