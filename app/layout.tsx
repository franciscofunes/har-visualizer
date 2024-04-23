import type { Metadata } from "next";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
import { EdgeStoreProvider } from '@/lib/edgestore';


export const metadata: Metadata = {
  title: "Har Visualizer",
  description: "Upload you exported har files and visualize them",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-gray-900">
        <Navbar />
        <EdgeStoreProvider>
          <div className="min-h-screen">{children}</div>
        </EdgeStoreProvider>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
