import Providers from "./providers";
import "../src/index.css";
import "../src/assets/scss_reusable/variables.scss";
import AppFooter from "../src/components/page_layouts/AppFooter";
import AppClientWrapper from "./appClientWrapper";
import AppHeader from "../src/components/page_layouts/AppHeader";

export const dynamic = "force-dynamic";

const RootLayout = async ({ children }) => {
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
  return (
    <>
      <html lang="en">
        <body>
          <Providers>
            <AppHeader />
          </Providers>
          <Providers>
            <AppClientWrapper>{children}</AppClientWrapper>
          </Providers>
          <Providers>
            <AppFooter />
          </Providers>
        </body>
      </html>
    </>
  );
};

export default RootLayout;
