import { getBlogPosts } from "@/lib/notion";
import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog — Dionix Softworks",
  description: "Articole despre web development, SaaS, AI și tehnologie din perspectiva Dionix Softworks.",
};

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return <BlogContent posts={posts} />;
}
