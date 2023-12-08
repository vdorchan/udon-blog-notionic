import React, { lazy, Suspense } from 'react'

export default function CustomPageLayout({
  blockMap,
  frontMatter,
  slug,
  authorName
}) {
  const Page = lazy(() => import(`./${slug}`))

  return (
    <Suspense fallback='loading'>
      <Page
        blockMap={blockMap}
        frontMatter={frontMatter}
        authorName={authorName}
      />
    </Suspense>
  )
}
