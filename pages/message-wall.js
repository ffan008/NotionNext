import { useGlobal } from '@/lib/global'
import React from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import TwikooMessageWall from '@/components/TwikooMessageWall'
 
export default function MessageWall() {
  const { locale } = useGlobal()
 
  return (
    <Layout>
      <Head>
        <title>留言墙 - {BLOG.TITLE}</title>
        <meta name="description" content="欢迎留下你的足迹" />
      </Head>
      <div className="w-full">
        <div className="px-4 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold my-8">留言墙</h1>
          <div className="mb-8">
            <p>欢迎在这里留下你的想法、建议或任何想说的话~</p>
          </div>
          
          {/* Twikoo留言容器 */}
          <div id="twikoo-message-wall" className="mt-8"></div>
        </div>
      </div>
    </Layout>
  )
}
