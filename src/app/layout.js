import { Toaster } from 'sonner';

export const metadata = {
  title: "Nyaya Connect - Legal AI Assistant",
  description: "Your trusted legal information guide powered by AI",
  icons: {
    icon: "/logo.webp",
    shortcut: "/logo.webp",
    apple: "/logo.webp",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
