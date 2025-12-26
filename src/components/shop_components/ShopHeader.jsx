import { BackArrowIcon } from "../svg_components/NavigationSvg";
import {
  FilterIcon,
  NotificationIcon,
  SearchIcon,
} from "../svg_components/ExploreSvg";

const ShopHeader = ({ openFilterFn = () => null, headerTitle = "" }) => {
  return (
    <>
      <header className="w-full space-y-2">
        <div className="flex justify-between items-center w-full">
          <button>
            <BackArrowIcon />
          </button>
          <button className="rounded-full p-2 text-sm">
            <NotificationIcon />
          </button>
        </div>
        <div className="w-full rounded-full px-2 bg-(--text-primary-light) flex items-center">
          <button className="w-max p-1 h-full">
            <SearchIcon />
          </button>
          <input
            placeholder="Search"
            className="w-full px-2 py-4 text-base text-(--text-primary) focus:outline-0 placeholder:text-(--main-secondary) font-normal"
            type="text"
          />
          <button className="w-max p-1 h-full" onClick={openFilterFn}>
            <FilterIcon />
          </button>
        </div>
        <h1 className="text-xl text-(--text-primary) text-left font-medium">
          {headerTitle}
        </h1>
      </header>
    </>
  );
};

export default ShopHeader;
