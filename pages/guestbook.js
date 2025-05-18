import Guestbook from '../components/Guestbook'
import { useGlobal } from '../lib/global'

export default function GuestbookPage() {
  const { locale } = useGlobal()

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {locale.GUESTBOOK.TITLE}
        </h1>
        <Guestbook />
      </main>
    </div>
  )
}
