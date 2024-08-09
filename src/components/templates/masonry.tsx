// components/Masonry.tsx
'use client'

import { Thumbnail } from './thumbnail'

type MasonryProps = {
  components: {
    title: string
    description: string
    thumbnailSrc: string
    component: React.ReactNode
    stack: [string]
  }[]
}

const Masonry = ({ components }: MasonryProps) => {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {components.map((component, index) => (
        <div key={index} className="mb-4">
          <Thumbnail
            title={component.title}
            description={component.description}
            thumbnailSrc={component.thumbnailSrc}
            stack={component.stack}
            fullComponent={component.component}
          />
        </div>
      ))}
    </div>
  )
}

export default Masonry
