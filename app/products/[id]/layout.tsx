// app/layout.tsx

import { ReactNode } from 'react';

export const metadata = {
  title: 'My Shop',
  description: 'E-commerce Product Page',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
