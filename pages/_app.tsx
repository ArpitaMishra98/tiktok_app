import Wrapper from "@/layout/Wrapper/Wrapper";
import { ThemeContextProvider } from "@/muitheme/ThemeContextProvider";
import theme from "@/muitheme/palette";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <ThemeContextProvider>
      <ThemeProvider theme={theme}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
      </ThemeProvider>
      </ThemeContextProvider>
    </>
  )
}
