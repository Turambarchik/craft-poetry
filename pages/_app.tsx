import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { AppProps } from "next/app";
import Head from "next/head";

import { AppProvider } from "@/context/appContext";
import theme from "@/theme/theme";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AppCacheProvider {...pageProps}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AppProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </AppProvider>
    </AppCacheProvider>
  );
};

export default App;
