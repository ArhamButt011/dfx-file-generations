interface BreadcrumbProps {
  pageName: string
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-3xl font-semibold text-black dark:text-white">
          {pageName}
        </h2>
        <p className="text-primary mt-3 font-medium">Total Users: 230</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          // Ensure this matches the state property name
          //   value={loginForm.email}
          //   onChange={handleLoginChange}
          className="w-full px-4 py-2 mt-1 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-lg"
          required
        />
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
