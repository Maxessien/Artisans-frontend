import "../src/assets/scss_reusable/variables.scss";
import AppFooter from "../src/components/page_layouts/AppFooter";
import "../src/index.css";
import logger from "../src/utils/logger";
import AppClientWrapper from "./appClientWrapper";
import Providers from "./providers";

export const dynamic = "force-dynamic";

const RootLayout = async ({ children }) => {
  logger.log("Loaded backend url", process.env.NEXT_PUBLIC_BACKEND_URL);
  return (
    <>
      <html lang="en">
        <body>
          <Providers>
            {/* <AppHeader /> */}
            <AppClientWrapper>{children}</AppClientWrapper>
            {/* <AppFooter /> */}
          </Providers>
        </body>
      </html>
    </>
  );
};

export default RootLayout;
