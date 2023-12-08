import { useEffect } from 'react'
import NotionRenderer from '@/components/Post/NotionRenderer'

export default function Resume({ blockMap }) {
  useEffect(() => {
    document.documentElement.classList.add('print')
  }, [])

  return (
    <div className='container mx-auto max-w-screen-lg print-content'>
      <NotionRenderer blockMap={blockMap} />
    </div>
  )
}
