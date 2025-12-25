"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import logger from "../../src/utils/logger";
import Filters from "./../../src/components/shop_components/Filters";
import ShopHeader from "./../../src/components/shop_components/ShopHeader";
import ShopMain from "./../../src/components/shop_components/ShopMain";

const ClientShopPage = ({ initialShopData, serverSideWindowSize }) => {
  const [openFilter, setOpenFilter] = useState(false);
	const {currentSize} = useSelector((state)=>state.screenSize)
	const showFilter = openFilter !== undefined ? openFilter : !serverSideWindowSize;
	const isMobile = currentSize ? currentSize < 768 : serverSideWindowSize
  return (
    <>
      {logger.info("Shop client filter state", { showFilter, isMobile })}
      <div className="block relative md:grid md:grid-cols-[25%_75%]">
        {!isMobile && (
          <aside>
            <Filters closeFilterFn={() =>{
				  logger.log("Closing filters on desktop")
              setOpenFilter(false)
            }} />
          </aside>
        )}
        {isMobile && showFilter && (
          <aside>
            <Filters closeFilterFn={() =>{
				  logger.log("Closing filters on mobile")
              setOpenFilter(false)
            }} />
          </aside>
        )}
        <main className="px-3 py-5">
          {!showFilter && isMobile && (
            <ShopHeader openFilterFn={() =>{
			  logger.log("Opening filters on mobile")
              setOpenFilter(true)
            }} />
          )}
          <ShopMain initialShopData={initialShopData} />
        </main>
      </div>
    </>
  );
};

export default ClientShopPage;
