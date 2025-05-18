import React, { useEffect } from 'react'
import BLOG from '@/blog.config' 
 
export default function TwikooMessageWall() {
  useEffect(() => {
    // 动态加载Twikoo脚本 
    const loadTwikoo = () => {
      const script = document.createElement('script') 
      script.src  = 'https://cdn.staticfile.org/twikoo/1.6.7/twikoo.all.min.js' 
      script.async  = true
      script.onload  = () => {
        // 初始化Twikoo留言墙
        twikoo.init({ 
          envId: BLOG.COMMENT_TWIKOO_ENV_ID,
          el: '#twikoo-message-wall',
          region: BLOG.COMMENT_TWIKOO_REGION,
          path: '/message-wall',
          onCommentLoaded: () => {
            // 留言加载完成后转换为瀑布流布局
            applyMasonryLayout()
          }
        })
      }
      document.body.appendChild(script) 
    }
 
    // 应用瀑布流布局
    const applyMasonryLayout = () => {
      const container = document.querySelector('#twikoo-message-wall  .tk-comments')
      if (container) {
        container.style.columnCount  = '3'
        container.style.columnGap  = '1em'
        const comments = container.querySelectorAll('.tk-comment') 
        comments.forEach(comment  => {
          comment.style.breakInside  = 'avoid'
          comment.style.marginBottom  = '1em'
        })
      }
    }
 
    loadTwikoo()
 
    return () => {
      // 清理
      const script = document.querySelector('script[src*="twikoo"]') 
      if (script) {
        document.body.removeChild(script) 
      }
    }
  }, [])
 
  return null
}
