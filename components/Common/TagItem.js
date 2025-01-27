import Link from 'next/link'

const TagItem = ({ tag }) => (
  <Link href={`/tag/${encodeURIComponent(tag)}`} scroll={false}>
    <p className='border-gray-50 border mr-2 rounded-full px-2 py-1 text-gray-50 hover:bg-gray-600 dark:hover:bg-gray-600 leading-none text-sm'>
      {tag}
    </p>
  </Link>
)

export default TagItem
