import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";

export const metadata = {
  title: "Promtopia",
  description: "Discover & Share best AI prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" 
    suppressHydrationWarning={true}
    >
      <body suppressHydrationWarning={true}
      >
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}</main>
        </Provider>
        </body>
    </html>
  );
};

export default RootLayout;
