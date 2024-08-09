'use client'

import { Thumbnail } from './thumbnail'

type MasonryProps = {
  components: {
    title: string
    description: string
    thumbnailSrc: string
    component: React.ReactNode
  }[]
}

const Masonry = ({ components }: MasonryProps) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3">
      {components.map((component, index) => (
        <div key={index} className="mb-4">
          <Thumbnail
            title={component.title}
            description={component.description}
            thumbnailSrc={component.thumbnailSrc}
            fullComponent={component.component}
          />
        </div>
      ))}
    </div>
  )
}

export default Masonry
