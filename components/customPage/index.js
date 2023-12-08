import React, { lazy, Suspense } from 'react'
import BLOG from '@/blog.config'

export default function CustomPageLayout({ blockMap, frontMatter, slug }) {
  const Page = lazy(() => import(`./${slug}`))

  return (
    <Suspense fallback='loading'>
      <Page blockMap={blockMap} frontMatter={frontMatter} />
    </Suspense>
  )
}
