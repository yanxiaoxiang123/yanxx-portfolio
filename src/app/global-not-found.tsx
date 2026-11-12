/* eslint-disable @next/next/no-html-link-for-pages -- Standalone global 404 has no router layout; document links intentionally restart routing. */
import '../styles/global.css';
export default function NotFound() { return <html lang="en"><head><title>Page not found | yanxx</title></head><body><main className="entry-main"><p className="wordmark">yanxx.</p><h1>Lost the page?</h1><p>这一页暂时找不到了。<br />The page you are looking for is not here.</p><nav><a className="button" href="/zh/" lang="zh-CN">回到首页</a><a className="text-link" href="/en/">Home in English</a></nav></main></body></html>; }
