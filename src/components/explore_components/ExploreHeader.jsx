import Search from "../page_layouts/Search"
import { MenuIcon, NotificationIcon } from "../svg_components/ExploreSvg"


const ExploreHeader = ({displayName = "Wellington Reye"}) => {
  return (
    <>
    <header className="flex flex-col w-full pt-3 items-start gap-2.5">
      <div className="flex justify-between items-center w-full"><span><MenuIcon /></span> <span className="p-3 shadow-[0px_0px_10px_-6px_black] rounded-full"><NotificationIcon /></span></div>
        <h2 className="text-lg text-[var(--main-secondary)] font-normal">Welcome Aboard!</h2>
        <h1 className="text-2xl text-[var(--text-primary)] font-normal">{displayName}</h1>
        <Search />
    </header>
    </>
  )
}

export default ExploreHeader