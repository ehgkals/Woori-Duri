import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-blue-300">
        {children}
      </body>
    </html>
  );
}
