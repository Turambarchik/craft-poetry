import "../utils/i18n";

import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { AppProps } from "next/app";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import createEmotionCache from "utils/createEmotionCache";

import { AppProvider } from "@/context/appContext";
import theme from "@/theme/theme";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: typeof clientSideEmotionCache;
}

const App = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) => {
  return (
    <AppCacheProvider {...pageProps}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <AppProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </AppProvider>
      </CacheProvider>
    </AppCacheProvider>
  );
};

export default appWithTranslation(App);
