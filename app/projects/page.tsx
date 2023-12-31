import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'
import { getAllProject } from 'http/services/api'

export const metadata = genPageMetadata({ title: '项目' })

export default async function Projects() {
  // 查询所有项目
  const projectsData = await getAllProject()

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            我的项目
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            我非常享受创意落地的过程，这是我做的一些项目。
          </p>
        </div>
        <div className="py-5">
          <div className="flex flex-wrap justify-center gap-8">
            {projectsData.map((project) => (
              <Card
                key={project.title}
                title={project.title}
                description={project.description}
                imgSrc={project.imgSrc}
                href={project.href}
                techStack={project.techStack}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
