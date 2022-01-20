function FullPageError({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-red-300 p-16 shadow-sharp mt-16 mx-14">
      <h1 className="text-6xl font-bold mb-2">Error :/</h1>
      <p className="text-sm" role="alert">
        {error.message}
      </p>
    </div>
  )
}

export { FullPageError }
