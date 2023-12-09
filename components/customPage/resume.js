import { useEffect, useState, useCallback } from 'react'
import BLOG from '@/blog.config'
import NotionRenderer from '@/components/Post/NotionRenderer'

export default function Resume({ blockMap, authorName }) {
  const checkPassword = useCallback(
    (value) => value === authorName,
    [authorName]
  )
  const [hide, setHide] = useState(true)

  useEffect(() => {
    document.documentElement.classList.add('print')

    try {
      const password = decodeURIComponent(
        escape(window.atob(sessionStorage.getItem('resume_password')))
      )
      setHide(!checkPassword(password))
    } catch (error) {}
  }, [checkPassword])

  return hide ? (
    <div className='h-screen flex justify-center items-center'>
      <input
        type='text'
        placeholder='输入我的姓名拼音查看简历'
        className='mx-auto bg-white dark:bg-gray-600 shadow-md rounded-lg outline-none focus:shadow p-3'
        onKeyPress={(e) => {
          const { value } = e.target
          if (e.charCode === 13 && checkPassword(value)) {
            sessionStorage.setItem(
              'resume_password',
              window.btoa(unescape(encodeURIComponent(value)))
            )
            setHide(false)
          }
        }}
      />
    </div>
  ) : (
    <div className='container mx-auto max-w-screen-lg print-content'>
      <NotionRenderer blockMap={blockMap} />
    </div>
  )
}
