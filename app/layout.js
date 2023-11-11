import { AppContext } from "./context/context";
import { UserContext } from "./context/user";
import "../css/globals.css";
import React from "react";
import { Roboto } from "next/font/google";
import { Poppins } from "next/font/google";
// import { ThemeProvider } from '@mui/material';
// import {theme} from './styles/materialThemeForm'

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Beer Club",
  description:
    "En Beer Club vas a encontrar a los gururs que te guiarán para tener la mejores experiencia degutando cervezas de todo el mundo.",
};

export default function RootLayout({ children }) {

  return (
    <html lang="es" className={`${roboto.className} ${poppins.className}`}>
      {/* <ThemeProvider theme={theme}> */}
      <body>
        <UserContext>
          <AppContext>
            {children}
          </AppContext>
        </UserContext>
        
      </body>
      {/* </ThemeProvider> */}
    </html>
  );
}
