import { fetchStrapiData } from '@/lib/api';
import sanitizeHtml from 'sanitize-html';
import type { Metadata } from 'next'

async function getContent() {
  const url = `homepage`
  const home = await fetchStrapiData(url);
  const clean = sanitizeHtml(home.data?.text_editor,{
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src']
    }
  });
  return clean;
}
export const metadata: Metadata = {
  title: 'Rovo It Solutions',
  description: 'Rovo It Solutions is a software development company that specializes in web and mobile applications.',
}
export default async function Page() {
  const content = await getContent()

  return (
    <div className="prose max-w-none">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
