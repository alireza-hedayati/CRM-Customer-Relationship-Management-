import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "همیار | سیستم مدیریت ارتباط با مشتریان (CRM)",
  description: "سامانه مینیمال، هوشمند و راست‌چین مدیریت مشتریان و قیف فروش همیار",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-[#F8FAF9] text-slate-800 antialiased selection:bg-[#B7D894] selection:text-[#71951E]">
        {children}
      </body>
    </html>
  );
}
