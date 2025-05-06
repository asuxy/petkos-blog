import "./globals.css";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 max-w-3xl">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
