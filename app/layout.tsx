import type { Metadata } from "next";
import { Inter } from "next/font/google";
import  Header from "@/components/header/header";
import { AdsProvider } from "@/context/ads.context"; 
import { SearchProvider } from "@/context/search.context";
import "./globals.css";

const inter = Inter ({ subsets : ["latin"]});

export const metadata : Metadata = {
  title : "ImmoPro - Annonces immobilières",
  description : "Trouvez votre bien immobilier idéal"
}

export default function RootLayout ({ children} : {children: React.ReactNode}){

  return (
    <html lang="fr">
      <body className={inter.className}>
        <SearchProvider>
          <AdsProvider>
            <Header></Header>
            <main className="main-content">
              { children }
            </main>
          </AdsProvider>
        </SearchProvider>
      </body>
    </html>
  )

}