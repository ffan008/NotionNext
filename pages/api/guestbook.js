import { Client } from '@notionhq/client'

export default async function handler(req, res) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })
  
  try {
    if (req.method === 'POST') {
      const { content, author, parentId } = req.body
      
      await notion.pages.create({
        parent: { database_id: process.env.NEXT_PUBLIC_GUESTBOOK_DATABASE_ID },
        properties: {
          '内容': {
            rich_text: [{
              text: { content: content }
            }]
          },
          '作者': {
            rich_text: [{
              text: { content: author }
            }]
          },
          '时间': {
            date: { start: new Date().toISOString() }
          },
          '父级': {
            relation: parentId ? [{ id: parentId }] : []
          }
        }
      })
      
      return res.status(200).json({ success: true })
    }
    
    return res.status(405).json({ message: 'Method not allowed' })
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ error: error.message })
  }
}
