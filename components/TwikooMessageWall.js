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
          comment.style.backgroundColor  = '#fff'
          comment.style.borderRadius  = '8px'
          comment.style.padding  = '1em'
          comment.style.boxShadow  = '0 1px 3px rgba(0,0,0,0.1)'
        })
    
    // 响应式调整 
    const handleResize = () => {
      if (window.innerWidth  < 768) {
        container.style.columnCount  = '2'
      } else if (window.innerWidth  < 480) {
        container.style.columnCount  = '1'
      } else {
        container.style.columnCount  = '3'
      }
    }
    
    window.addEventListener('resize',  handleResize)
    handleResize()
    
    // 清理事件监听器 
    return () => {
      window.removeEventListener('resize',  handleResize)
    }
  }
}
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
