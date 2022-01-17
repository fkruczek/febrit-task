function FullPageError() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-red-300 p-16 shadow-sharp mt-16">
      <h1 className="text-6xl font-bold mb-2">Error :/</h1>
      <p className="text-xl">
        Something went wrong. <br className="sm:hidden" />
        Please try again later.
      </p>
    </div>
  )
}

export { FullPageError }
