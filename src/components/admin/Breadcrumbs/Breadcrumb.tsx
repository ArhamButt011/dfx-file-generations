interface BreadcrumbProps {
  pageName: string;
  leftContent: string | React.ReactNode;
  totalContent: string | React.ReactNode;
  rightContent: string | React.ReactNode;
  buttonContent: string | React.ReactNode;
}
// const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
const Breadcrumb: React.FC<BreadcrumbProps> = ({ pageName, rightContent, totalContent }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-medium text-white">
          {pageName}
        </h1>
        <p className="mt-2 font-medium text-white text-lg">Total Users: {totalContent}</p>
      </div>
      <div>
        {rightContent}
      </div>

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
