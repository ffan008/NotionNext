// 样式导入
import '@/styles/globals.css'
import '@/styles/utility-patterns.css'
import '@/styles/notion.css'
import 'react-notion-x/src/styles.css'

// 必要组件 & 配置
import BLOG from '@/blog.config'
import useAdjustStyle from '@/hooks/useAdjustStyle'
import { GlobalContextProvider } from '@/lib/global'
import { getBaseLayoutByTheme } from '@/themes/theme'
import ExternalPlugins from '@/components/ExternalPlugins'
import SEO from '@/components/SEO'

import { useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import { getQueryParam } from '../lib/utils'

import dynamic from 'next/dynamic'
import { zhCN } from '@clerk/localizations'
const ClerkProvider = dynamic(() =>
  import('@clerk/nextjs').then(m => m.ClerkProvider)
)

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter()

  // 为 message 页面添加 className
  useEffect(() => {
    if (router.pathname === '/message') {
      document.body.classList.add('page-message')
    } else {
      document.body.classList.remove('page-message')
    }
  }, [router.pathname])

  useAdjustStyle()

  const theme = useMemo(() => {
    return (
      getQueryParam(router.asPath, 'theme') ||
      pageProps?.NOTION_CONFIG?.THEME ||
      BLOG.THEME
    )
  }, [router])

  const GLayout = useCallback(
    props => {
      const Layout = getBaseLayoutByTheme(theme)
      return <Layout {...props} />
    },
    [theme]
  )

  const enableClerk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  const content = (
    <GlobalContextProvider {...pageProps}>
      <GLayout {...pageProps}>
        <SEO {...pageProps} />
        <Component {...pageProps} />
      </GLayout>
      <ExternalPlugins {...pageProps} />
    </GlobalContextProvider>
  )

  return enableClerk ? (
    <ClerkProvider localization={zhCN}>{content}</ClerkProvider>
  ) : (
    content
  )
}

export default MyApp
