import type { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = { title: '晏晓翔 Yan Xiaoxiang — yanxx', description: '个人经历、项目与探索。Projects, experience and ongoing experiments.' };
export default function Entry() { return <main className="entry-main"><Link className="wordmark" href="/zh/">yanxx.</Link><h1>晏晓翔</h1><p>Yan Xiaoxiang</p><nav aria-label="选择语言 / Choose a language"><Link className="button" href="/zh/" lang="zh-CN">中文</Link><Link className="text-link" href="/en/" lang="en">English</Link></nav></main>; }
