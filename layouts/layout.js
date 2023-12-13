import { useEffect, useState, useMemo } from 'react'
import { getPageTitle } from 'notion-utils'
import { motion } from 'framer-motion'

import Container from '@/components/Container'
import Content from '@/components/Post/Content'
import Aside from '@/components/Post/Aside'
import Comments from '@/components/Post/Comments'
import PostFooter from '@/components/Post/PostFooter'
import { useRouter } from 'next/router'
import { pagesShow } from '@/blog.config'
import Image from 'next/image'
import { PostHeader } from '@/components/PostHeader'

const pageHideComment = Object.keys(pagesShow).concat(['about'])

const Layout = ({
  blockMap,
  frontMatter,
  fullWidth = false,
  subPage = false,
  slug
}) => {
  const router = useRouter()
  const hideComment = useMemo(
    () => pageHideComment.some((path) => router.asPath === `/${path}`),
    [router]
  )

  console.log('==>slug', router)
  const [showSubPageTitle, setShowSubPageTitle] = useState(false)

  const pageTitle = getPageTitle(blockMap)
  useEffect(() => {
    if (frontMatter.title !== pageTitle) {
      setShowSubPageTitle(true)
    }
  }, [frontMatter, pageTitle, subPage])

  return (
    <>
      <PostHeader frontMatter={frontMatter} />
      <Container
        title={`${frontMatter.title}${
          frontMatter.title === pageTitle ? '' : ' | ' + pageTitle
        }`}
        description={frontMatter.summary}
        // date={new Date(frontMatter.publishedAt).toISOString()}
        type='article'
        fullWidth={fullWidth}
      >
        <motion.div className='flex flex-row'>
          <Content
            frontMatter={frontMatter}
            blockMap={blockMap}
            pageTitle={showSubPageTitle ? pageTitle : null}
          />
          <Aside
            frontMatter={frontMatter}
            blockMap={blockMap}
            pageTitle={showSubPageTitle ? pageTitle : null}
          />
        </motion.div>
        {!hideComment && (
          <>
            <PostFooter />
            <Comments frontMatter={frontMatter} />
          </>
        )}
      </Container>
    </>
  )
}

export default Layout
