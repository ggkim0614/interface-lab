'use client'

import React, { useEffect, useState } from 'react'

interface DesktopOnlyWrapperProps {
  children: React.ReactNode
}

const DesktopOnlyWrapper: React.FC<DesktopOnlyWrapperProps> = ({
  children,
}) => {
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024) // Considers 1024px and above as desktop
    }

    checkScreenSize() // Check on initial render
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  if (!isDesktop) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-100 p-4 text-center">
        <div>
          <h1 className="mb-4 font-jbm text-2xl font-bold tracking-tighter">
            DESKTOP VIEW ONLY
          </h1>
          <p className="font-jbm text-gray-600">
            Please view this project on a larger screen for the best experience.
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default DesktopOnlyWrapper
