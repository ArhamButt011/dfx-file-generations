import { Dispatch, SetStateAction, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarChildItem {
  route: string
  label: string
  children?: SidebarChildItem[]
  icon?: React.ReactNode
  iconNotActive?: React.ReactNode
}

interface SidebarItemProps {
  item: SidebarChildItem
  pageName: string
  setPageName: Dispatch<SetStateAction<string>>
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  pageName,
  setPageName,
}) => {
  const handleClick = () => {
    const updatedPageName =
      pageName !== item.label.toLowerCase() ? item.label : ''
    setPageName(updatedPageName)
  }

  const pathname = usePathname()

  const isActive = (item: SidebarChildItem): boolean => {
    if (pathname.startsWith(item.route)) {
      return true
    }

    if (item.children) {
      return item.children.some(isActive)
    }

    return false
  }

  const isItemActive = isActive(item)
  useEffect(() => {
    if (isItemActive) {
      document.title = `${item.label} | Lumashape`
    }
  }, [isItemActive, item.label])

  return (
    <li>
      <Link
        href={item.route}
        onClick={handleClick}
        className={`${
          isItemActive ? 'text-secondary' : ''
        } group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-primary duration-300 ease-in-out dark:hover:bg-meta-4`}
      >
        {isItemActive ? item.iconNotActive : item.icon}
        {item.label}
      </Link>
    </li>
  )
}

export default SidebarItem
