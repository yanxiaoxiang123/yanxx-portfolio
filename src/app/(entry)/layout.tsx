import '../../styles/global.css';
export default function EntryLayout({ children }: { children: React.ReactNode }) {
  return <html lang="zh-CN"><head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    {/* eslint-disable-next-line @next/next/no-page-custom-font -- App Router root layout: this stylesheet applies to the language entry page. */}
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Mynerve&family=Noto+Sans+SC:wght@400;500&display=swap" />
  </head><body>{children}</body></html>;
}
