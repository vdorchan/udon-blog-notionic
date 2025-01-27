import BLOG from '@/blog.config'
import BlogPost from '@/components/BlogPost'
import { CategoriesBar } from '@/components/CategoriesBar'
import Container from '@/components/Container'
import Hero from '@/components/Hero/Home'
import Pagination from '@/components/Pagination'
import { getAllPosts, getAllcategories, getPostBlocks } from '@/lib/notion'
import filterPublishedPosts from '@/lib/notion/filterPublishedPosts'
import { useMemo, useState } from 'react'

export async function getStaticProps() {
  // 全量 post
  const posts = await getAllPosts()

  const heros = filterPublishedPosts({ posts, onlyHidden: true })
  const hero = heros.find((t) => t.slug === 'index')

  let blockMap
  try {
    blockMap = await getPostBlocks(hero.id)
  } catch (err) {
    console.error(err)
    // return { props: { post: null, blockMap: null } }
  }

  const categories = await getAllcategories(posts)

  const postsToShow = filterPublishedPosts({ posts, onlyPost: true })
    .slice(0, BLOG.postsPerPage)
    // 如果没有设置 slug，使用 title 代替
    .map((post) => ({
      ...post,
      slug: post.slug || post.id,
      summary:
        post.summary || `该篇文章讲了关于${post.title}的内容，点击查看更多吧～`
    }))

  const totalPosts = posts.length
  const showNext = totalPosts > BLOG.postsPerPage
  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      showNext,
      blockMap,
      categories
    },
    revalidate: 1
  }
}

const Blog = ({ postsToShow, page, showNext, blockMap, categories }) => {
  const [category, setCategory] = useState(null)
  const filteredPosts = useMemo(
    () =>
      category === null
        ? postsToShow
        : postsToShow.filter((blog) => blog.category?.includes(category)),
    [postsToShow, category]
  )

  return (
    <Container title={BLOG.title} description={BLOG.description}>
      <Hero blockMap={blockMap} />
      <CategoriesBar
        categories={categories}
        onChange={setCategory}
        className='mb-5'
      />
      {filteredPosts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
      {showNext && <Pagination page={page} showNext={showNext} />}
    </Container>
  )
}

export default Blog
