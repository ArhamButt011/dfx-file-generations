import Text from '@/components/UI/Text'

interface BreadcrumbProps {
  pageName: string
  totalContent: string | React.ReactNode
  rightContent: string | React.ReactNode
  totalText: string | React.ReactNode
  buttonContent: string | React.ReactNode
}
// const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
const Breadcrumb: React.FC<BreadcrumbProps> = ({
  pageName,
  rightContent,
  totalContent,
  totalText,
}) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Text as="h3" className="font-semibold">
          {pageName}
        </Text>
        <Text className="mt-1 font-medium text-primary">
          {totalText}: {totalContent}
        </Text>
      </div>
      <div>{rightContent}</div>

      {/* <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href="/">
              Dashboard /
            </Link>
          </li>
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav> */}
    </div>
  )
}

export default Breadcrumb
