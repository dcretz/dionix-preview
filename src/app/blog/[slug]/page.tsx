import { getBlogPostBySlug, getBlogPosts, formatDate } from "@/lib/notion";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleContent from "./ArticleContent";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Articol negăsit" };
  return {
    title: `${post.title} — Dionix Blog`,
    description: post.excerpt,
  };
}

function mapTagToCategory(tags: string[]): string {
  const tagStr = tags.join(" ").toLowerCase();
  if (tagStr.includes("ai") || tagStr.includes("llm") || tagStr.includes("automatizare") || tagStr.includes("chatbot")) return "AI & Automatizare";
  if (tagStr.includes("saas") || tagStr.includes("multi-tenant") || tagStr.includes("roadmap")) return "SaaS & Produse";
  if (tagStr.includes("business") || tagStr.includes("proces") || tagStr.includes("discovery")) return "Business";
  return "Development";
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const category = mapTagToCategory(post.tags);
  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2)
    .map((p) => ({
      title: p.title,
      slug: p.slug,
      tags: p.tags,
      date: p.date,
    }));

  return (
    <>
    
      <ArticleContent
        post={{
          title: post.title,
          slug: post.slug,
          date: post.date,
          excerpt: post.excerpt,
          tags: post.tags,
          blocks: post.blocks,
          category,
        }}
        relatedPosts={relatedPosts}
      />
    </>
  );
}
