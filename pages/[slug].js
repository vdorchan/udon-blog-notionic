import Layout from '@/layouts/layout'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import BLOG from '@/blog.config'
import { useRouter } from 'next/router'
import Loading from '@/components/Loading'
import NotFound from '@/components/NotFound'
import CustomPageLayout from '@/components/customPage'

const Post = ({ post, blockMap, slug, authorName, customPages }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <Loading />
  }
  if (!post) {
    return <NotFound statusCode={404} />
  }

  if (customPages.includes(slug)) {
    return (
      <CustomPageLayout
        blockMap={blockMap}
        frontMatter={post}
        slug={slug}
        authorName={authorName}
      />
    )
  }

  return (
    <Layout blockMap={blockMap} frontMatter={post} fullWidth={post.fullWidth} />
  )
}

export async function getStaticPaths() {
  const posts = await getAllPosts({ onlyNewsletter: false })
  return {
    paths: posts.map((row) => `${BLOG.path}/${row.slug}`),
    fallback: true
  }
}

export async function getStaticProps({ params: { slug } }) {
  const posts = await getAllPosts({ onlyNewsletter: false })
  const post = posts.find((t) => t.slug === slug || t.id === slug)

  try {
    const blockMap = await getPostBlocks(post.id)
    return {
      props: {
        post,
        blockMap,
        slug,
        authorName: BLOG.authorName,
        customPages: BLOG.customPages
      },
      revalidate: 1
    }
  } catch (err) {
    console.error(err)
    return {
      props: {
        post: null,
        blockMap: null
      }
    }
  }
}

export default Post
