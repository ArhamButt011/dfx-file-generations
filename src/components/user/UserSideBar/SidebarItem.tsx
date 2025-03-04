import { Dispatch, SetStateAction, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image, { StaticImageData } from 'next/image'
import Head from 'next/head'

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
  // pageName,
  setPageName,
}) => {
  const pathname = usePathname()

  const isActive = (item: SidebarChildItem): boolean => {
    if (item.route === pathname) return true
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
  function clearStorage()
  {
    sessionStorage.clear()
  }
  return (
    <>
      <Head>
        <title>
          {isItemActive ? `${item.label} | Lumashape` : 'Lumashape'}
        </title>
        <meta
          name="description"
          content={`You are viewing ${item.label} page`}
        />
      </Head>

      <li>
        <Link
          href={item.route}
          onClick={() => {setPageName(item.label);clearStorage()}}
          className={`${
            isItemActive ? 'bg-secondary text-white rounded-xl' : ''
          } group relative flex items-center gap-2.5 px-4 py-2 font-medium text-primary duration-300 ease-in-out dark:hover:bg-meta-4`}
        >
          <Image
            src={isItemActive ? item.Whiteicon : item.Grayicon}
            alt="icon"
            height={20}
            width={20}
          />
          {item.label}
        </Link>
      </li>
    </>
  )
}

export default SidebarItem
