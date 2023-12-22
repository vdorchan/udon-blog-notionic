import { useEffect, useState, useCallback } from 'react'
import BLOG from '@/blog.config'
import NotionRenderer from '@/components/Post/NotionRenderer'

const screetText = (blockMap, blockIds) => {
  if (location.hostname === 'localhost') return
  try {
    blockIds.forEach((blockId) => {
      const key = Object.keys(blockMap.block).find(
        (key) => key.replaceAll('-', '') === blockId
      )
      const block = blockMap.block[key]
      block.value.properties.title[0] = ['***']
    })
  } catch (error) {}
}

export default function Resume({ blockMap, authorName }) {
  const checkPassword = useCallback(
    (value) => value === authorName,
    [authorName]
  )
  const [hide, setHide] = useState(true)

  useEffect(() => {
    screetText(blockMap, [
      '9b4647f8a10f429b8bbba10de1ef2924',
      'e0fe2289bdf245319a2c3589e986cd9a'
    ])
  }, [blockMap])

  useEffect(() => {
    document.documentElement.classList.add('print')

    try {
      const password = decodeURIComponent(
        escape(window.atob(sessionStorage.getItem('resume_password')))
      )
      setHide(!checkPassword(password))
    } catch (error) {}
  }, [checkPassword])

  const onSubmit = (value) => {
    if (checkPassword(value)) {
      sessionStorage.setItem(
        'resume_password',
        window.btoa(unescape(encodeURIComponent(value)))
      )
      setHide(false)
    }
  }

  return hide ? (
    <div className='h-screen flex justify-center items-center'>
      <input
        type='text'
        placeholder='输入我的姓名拼音查看简历'
        className='mx-auto bg-white dark:bg-gray-600 shadow-md rounded-lg outline-none focus:shadow p-3 w-80'
        onKeyPress={(e) => {
          const { value } = e.target
          if (e.charCode === 13) {
            onSubmit()
          }
        }}
        onChange={(e) => {
          onSubmit(e.target.value)
        }}
      />
    </div>
  ) : (
    <div className='container mx-auto max-w-screen-lg print-content'>
      <NotionRenderer blockMap={blockMap} />
    </div>
  )
}
