import Search from "../page_layouts/Search"


const ExploreHeader = ({displayName = "Wellington Reye"}) => {
  return (
    <>
    <header className="flex flex-col items-start gap-2.5">
        <h2 className="text-lg text-[var(--main-secondary)] font-normal">Welcome Aboard!</h2>
        <h2 className="text-2xl text-[var(--text-primary)] font-normal">{displayName}</h2>
        <Search />
    </header>
    </>
  )
}

export default ExploreHeader