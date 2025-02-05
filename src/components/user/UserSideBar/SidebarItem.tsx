import { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image, { StaticImageData } from 'next/image'

interface SidebarChildItem {
  route: string
  label: string
  children?: SidebarChildItem[]
  Grayicon: StaticImageData
  Whiteicon: StaticImageData
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
      pageName !== item.label.toLowerCase() ? item.label.toLowerCase() : ''
    setPageName(updatedPageName)
  }

  const pathname = usePathname()

  const isActive = (item: SidebarChildItem): boolean => {
    if (item.route === pathname) return true
    if (item.children) {
      return item.children.some(isActive)
    }
    return false
  }

  const isItemActive = isActive(item)

  return (
    <li>
      <Link
        href={item.route}
        onClick={handleClick}
        className={`${isItemActive ? 'bg-secondary text-white rounded-xl' : ''
          } group relative flex items-center gap-2.5 px-4 py-2 font-medium text-primary duration-300 ease-in-out dark:hover:bg-meta-4`}
      >
        {/* {isItemActive ? */}
        <Image
          src={isItemActive ? item.Whiteicon : item.Grayicon}
          alt="icon"
          height={20}
          width={20}
        />

        {item.label}
      </Link>
    </li>
  )
}

export default SidebarItem
