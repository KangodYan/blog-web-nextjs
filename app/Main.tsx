import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import Image from 'next/image'
import { countListArticleTag } from 'http/services/api'

const MAX_DISPLAY = 5

export default async function Home({ posts }) {
  // 查询所有标签
  const tags = await countListArticleTag()

  return (
    <>
      <div className="flex items-center justify-between space-y-4 mt-7">
        <div className="space-y-4">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            <span className="wave">👋🏻</span>, <span>我是 </span>
            <span className="text-sky-500 dark:text-teal-400">Kangod Yan</span>
          </h1>
          <p>欢迎来到我的 Blog，在这里我会分享我所热爱的一切</p>
          <Link
            href="/about"
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-2 px-4 rounded mt-4 inline-block"
          >
            关于我
          </Link>
        </div>
        <div className="rounded-full md:hidden shadow-lg ">
          <Image
            src="/static/images/avatar-2.png"
            alt="avatar"
            width={150}
            height={150}
            className="rounded-full shadow-gray-300"
          />
        </div>
        <Image
          src="/static/images/avatar-2.png"
          alt="avatar"
          width={200}
          height={200}
          className="rounded-full hidden md:block shadow-lg shadow-gray-400"
        />
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="flex flex-row space-x-2">
          <div className="space-y-2 pb-6 pt-6 md:space-y-2">
            <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-7xl sm:leading-10 md:text-5xl md:leading-14">
              最新文章
            </h1>
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              {siteMetadata.description}
            </p>
          </div>
          <div className="pt-10 pl-5">
            {tags.length === 0 && 'No tags found.'}
            <div className="flex flex-wrap mb-3">
              {tags.map((tagCountType) => (
                <Tag key={tagCountType.tag} text={tagCountType.tag} />
              ))}
            </div>
          </div>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                  <article className="hover:-translate-y-1 hover:scale-110 duration-300 ...">
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400 pl-5">
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </dd>
                      </dl>
                      <div className="space-y-5 xl:col-span-3 p-3">
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl font-bold leading-8 tracking-tight">{title}</h2>
                            <div className="flex flex-wrap">
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                        <div className="text-base font-medium leading-6">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            aria-label={`Read '${title}'`}
                          >
                            查看更多 &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="全部文章"
          >
            全部文章 &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
