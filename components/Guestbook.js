import { useEffect, useState } from 'react'
import Masonry from 'react-masonry-css'
import { getDatabase } from '../lib/notion'
import { useGlobal } from '../lib/global'
import { Post } from '../components/Post'

export default function Guestbook() {
  const { locale } = useGlobal()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    const databaseId = process.env.NEXT_PUBLIC_GUESTBOOK_DATABASE_ID
    const response = await getDatabase(databaseId)
    setMessages(response)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await fetch('/api/guestbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newMessage,
          author: '访客',
          parentId: null
        })
      })
      setNewMessage('')
      loadMessages()
    } catch (error) {
      console.error('提交失败:', error)
    }
  }

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{locale.GUESTBOOK.TITLE}</h1>
      
      <form onSubmit={handleSubmit} className="mb-12">
        <textarea
          className="w-full p-4 border rounded-lg mb-4"
          placeholder={locale.GUESTBOOK.PLACEHOLDER}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          rows="4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          {locale.GUESTBOOK.SUBMIT}
        </button>
      </form>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {messages.map((message) => (
          <div key={message.id} className="mb-4 p-4 bg-white rounded-lg shadow">
            <p className="text-gray-800 mb-2">{message.content}</p>
            <div className="text-sm text-gray-500">
              {message.author} - {message.date}
            </div>
            {/* 回复功能实现 */}
          </div>
        ))}
      </Masonry>
    </div>
  )
}
