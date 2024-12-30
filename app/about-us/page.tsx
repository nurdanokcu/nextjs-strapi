import { fetchStrapiData } from '@/lib/api';
import sanitizeHtml from 'sanitize-html';
import type { Metadata } from 'next'

async function getContent() {
  const url = 'aboutpage'
  const home = await fetchStrapiData(url);
  const clean = sanitizeHtml(home.data?.tiny_editor,{
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src']
    }
  });
  return clean;
}
 
export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our company and our mission.',
}
export default async function Page() {
  const content = await getContent()

  return (
    <div className="prose max-w-none">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
