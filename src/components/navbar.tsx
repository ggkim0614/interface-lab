function Navbar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4">
      <span className="flex gap-2">
        <div className="group font-jbm text-[16px] font-bold leading-tight tracking-tight text-gray-900">
          I<span className="transition group-hover:text-gray-300">NTER</span>F
          <span className="transition group-hover:text-gray-300">ACE</span>
          <span className="opacity-0 transition group-hover:opacity-100">
            ?
          </span>
          LAB.
        </div>

        <div className="font-jbm text-[14px] font-medium text-gray-500">
          v1.0
        </div>
      </span>

      <div className="font-jbm text-[16px] font-medium leading-normal text-gray-500">
        Shelter for&nbsp;
        <span className="font-semibold text-gray-900">design explorations</span>
        &nbsp;and&nbsp;
        <span className="font-semibold text-gray-900">prototypes</span>
      </div>
      <div className="font-jbm text-[16px] font-medium text-gray-500">
        All work crafted by&nbsp;
        <a
          href="https://georgekim.studio/"
          className="font-semibold text-blue-500 hover:underline"
        >
          @George Kim
        </a>
      </div>
    </div>
  )
}

export default Navbar
