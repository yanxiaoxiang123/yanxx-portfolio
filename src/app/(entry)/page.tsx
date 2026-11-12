import type { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = { title: '晏晓翔 Yan Xiaoxiang — yanxx', description: '个人经历、项目与探索。Projects, experience and ongoing experiments.' };
export default function Entry() {
  return <main className="entry-main">
    <span className="wordmark" style={{ fontSize: 18 }}>yanxx.</span>
    <h1>晏晓翔</h1>
    <p lang="en">Yan Xiaoxiang</p>
    <nav aria-label="选择语言 / Choose a language">
      <Link className="contact-link dark" href="/zh/" lang="zh-CN">中文</Link>
      <Link className="contact-link dark" href="/en/" lang="en">English</Link>
    </nav>
  </main>;
}
