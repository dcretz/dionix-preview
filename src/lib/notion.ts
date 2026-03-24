import { Client } from "@notionhq/client";
import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const DATABASE_ID = process.env.NOTION_LEADS_DATABASE_ID!;
const DB_BLOGS = process.env.NOTION_BLOG_DATABASE_ID!;

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  tags: string[];
  cover: string | null;
  status: string;
}

export interface BlogPostFull extends BlogPost {
  blocks: BlogBlock[];
}

export interface BlogBlock {
  id: string;
  type: string;
  content: string;
  items?: string[];
  language?: string;
  url?: string;
  caption?: string;
  level?: number;
}

// Extract plain text from rich text array
function richTextToString(richText: RichTextItemResponse[]): string {
  return richText.map((t) => t.plain_text).join("");
}

// Parse a page object to BlogPost
function parsePage(page: PageObjectResponse): BlogPost {
  const props = page.properties;

  const titleProp = props["Title"] ?? props["Name"];
  const title =
    titleProp?.type === "title"
      ? richTextToString(titleProp.title)
      : "Fără titlu";

  const slugProp = props["Slug"];
  const slug =
    slugProp?.type === "rich_text"
      ? richTextToString(slugProp.rich_text)
      : page.id;

  const dateProp = props["Date"];
  const date =
    dateProp?.type === "date" && dateProp.date?.start
      ? dateProp.date.start
      : new Date().toISOString().split("T")[0];

  const excerptProp = props["Excerpt"];
  const excerpt =
    excerptProp?.type === "rich_text"
      ? richTextToString(excerptProp.rich_text)
      : "";

  const tagsProp = props["Tags"];
  const tags =
    tagsProp?.type === "multi_select"
      ? tagsProp.multi_select.map((t) => t.name)
      : [];

  const statusProp = props["Status"];
  const status =
    statusProp?.type === "select" ? statusProp.select?.name ?? "Draft" : "Draft";

  const coverProp = props["Cover"];
  const cover =
    coverProp?.type === "url" ? coverProp.url :
    page.cover?.type === "external" ? page.cover.external.url :
    page.cover?.type === "file" ? page.cover.file.url :
    null;

  return { id: page.id, title, slug, date, excerpt, tags, cover, status };
}

// Parse blocks to simplified format
function parseBlock(block: BlockObjectResponse): BlogBlock | null {
  const b = block as any;

  switch (block.type) {
    case "paragraph":
      return {
        id: block.id,
        type: "paragraph",
        content: richTextToString(b.paragraph.rich_text),
      };
    case "heading_1":
      return { id: block.id, type: "heading", level: 1, content: richTextToString(b.heading_1.rich_text) };
    case "heading_2":
      return { id: block.id, type: "heading", level: 2, content: richTextToString(b.heading_2.rich_text) };
    case "heading_3":
      return { id: block.id, type: "heading", level: 3, content: richTextToString(b.heading_3.rich_text) };
    case "bulleted_list_item":
      return { id: block.id, type: "bullet", content: richTextToString(b.bulleted_list_item.rich_text) };
    case "numbered_list_item":
      return { id: block.id, type: "numbered", content: richTextToString(b.numbered_list_item.rich_text) };
    case "code":
      return {
        id: block.id,
        type: "code",
        content: richTextToString(b.code.rich_text),
        language: b.code.language,
      };
    case "quote":
      return { id: block.id, type: "quote", content: richTextToString(b.quote.rich_text) };
    case "divider":
      return { id: block.id, type: "divider", content: "" };
    case "image":
      const imgUrl = b.image?.type === "external" ? b.image.external.url : b.image?.file?.url ?? "";
      const caption = b.image?.caption ? richTextToString(b.image.caption) : "";
      return { id: block.id, type: "image", content: imgUrl, caption };
    case "callout":
      return { id: block.id, type: "callout", content: richTextToString(b.callout.rich_text) };
    default:
      return null;
  }
}

// Get all published posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await notion.databases.query({
      database_id: DB_BLOGS,
      filter: {
        property: "Status",
        select: { equals: "Published" },
      },
      sorts: [{ property: "Date", direction: "descending" }],
    });

    return response.results
      .filter((p): p is PageObjectResponse => p.object === "page")
      .map(parsePage);
  } catch (error) {
    console.error("Notion getBlogPosts error:", error);
    return [];
  }
}

// Get single post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPostFull | null> {
  try {
    const response = await notion.databases.query({
      database_id: DB_BLOGS,
      filter: {
        property: "Slug",
        rich_text: { equals: slug },
      },
    });

    const page = response.results.find(
      (p): p is PageObjectResponse => p.object === "page"
    );
    if (!page) return null;

    const post = parsePage(page);

    // Fetch blocks
    const blocksResponse = await notion.blocks.children.list({
      block_id: page.id,
      page_size: 100,
    });

    const blocks = blocksResponse.results
      .filter((b): b is BlockObjectResponse => b.object === "block")
      .map(parseBlock)
      .filter((b): b is BlogBlock => b !== null);

    return { ...post, blocks };
  } catch (error) {
    console.error("Notion getBlogPostBySlug error:", error);
    return null;
  }
}

// Get all slugs for static generation
export async function getBlogSlugs(): Promise<string[]> {
  try {
    const posts = await getBlogPosts();
    return posts.map((p) => p.slug);
  } catch {
    return [];
  }
}

// Format date Romanian
export function formatDate(dateStr: string): string {
  const months = [
    "ianuarie", "februarie", "martie", "aprilie", "mai", "iunie",
    "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie",
  ];
  const d = new Date(dateStr);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

// ─── ANTI-ABUSE: Check duplicate lead ────────────────────────────────────────

interface DuplicateCheck {
  email: string;
  company: string;
  ip: string;
  website?: string;
}

export async function checkDuplicate({
  email,
  company,
  ip,
  website,
}: DuplicateCheck): Promise<boolean> {
  try {
    // Check by email
    const byEmail = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: "Email",
        email: { equals: email },
      },
      page_size: 1,
    });
    if (byEmail.results.length > 0) return true;

    // Check by company name (case-insensitive via starts_with)
    const byCompany = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: "Name",
        title: { equals: company },
      },
      page_size: 1,
    });
    if (byCompany.results.length > 0) return true;

    // Check by IP — stored in Source field as "Website in 1 ora | IP: x.x.x.x"
    if (ip && ip !== "unknown") {
      const byIp = await notion.databases.query({
        database_id: DATABASE_ID,
        filter: {
          property: "Source",
          rich_text: { contains: `IP: ${ip}` },
        },
        page_size: 1,
      });
      if (byIp.results.length > 0) return true;
    }

    if (website && website.trim() !== "") {
      const byWebsite = await notion.databases.query({
        database_id: DATABASE_ID,
        filter: {
          property: "Website",
          url: { equals: website.trim() },
        },
        page_size: 1,
      });
      if (byWebsite.results.length > 0) return true;
    }

    return false;
  } catch (error) {
    console.error("checkDuplicate error:", error);
    return false; // În caz de eroare, nu bloca
  }
}

// ─── CREATE LEAD (updated with IP) ───────────────────────────────────────────

export async function createLead(data: {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  description: string;
  website?: string;
  pages: string[];
  extra?: string;
  color: string;
  style: string;
  package?: string;
  ip?: string;
}) {
  return notion.pages.create({
    parent: { database_id: DATABASE_ID },
    properties: {
      "Name": {
        title: [{ text: { content: data.name } }],
      },
      "Company": {
        rich_text: [{ text: { content: data.company } }],
      },
      "Industry": {
        rich_text: [{ text: { content: data.industry } }],
      },
      "Email": {
        email: data.email,
      },
      "Phone": {
        phone_number: data.phone,
      },
      "Website": {
        url: data.website || null,
      },
      "Color": {
        rich_text: [{ text: { content: data.color } }],
      },
      "Style": {
        rich_text: [{ text: { content: data.style } }],
      },
      "Pages": {
        rich_text: [{ text: { content: data.pages.join(", ") } }],
      },
      "Package": {
        rich_text: [{ text: { content: data.package || "" } }],
      },
      "Description": {
        rich_text: [{ text: { content: data.description } }],
      },
      "Notes": {
        rich_text: [{
          text: {
            content: `${data.extra ? `Extra: ${data.extra}` : ""}`,
          },
        }],
      },
      "Source": {
        rich_text: [{
          text: {
            content: `Website in 1 ora${data.ip ? ` | IP: ${data.ip}` : ""}`,
          },
        }],
      },
      "Status": {
        select: { name: "Prospect" },
      },
      "Date Added": {
        date: { start: new Date().toISOString().split("T")[0] },
      },
    },
  });
}



// Create a contact from subscription modal
export async function createContact(data: {
  email: string;
  message: string;
  source?: string;
}) {
  const databaseId = process.env.NOTION_CONTACTS_DATABASE_ID;
  if (!databaseId) {
    throw new Error("NOTION_CONTACTS_DATABASE_ID not configured");
  }

  return await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      Email: { email: data.email },
      Message: { rich_text: [{ text: { content: data.message } }] },
      Source: { select: { name: data.source || "Contact Modal" } },
      Status: { select: { name: "New" } },
      Date: { date: { start: new Date().toISOString() } },
    },
  });
}

// Check if email already exists
export async function subscriberExists(email: string): Promise<boolean> {
  const databaseId = process.env.NOTION_SUBSCRIBERS_DATABASE_ID;
  if (!databaseId) return false;

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Email",
        email: { equals: email },
      },
    });
    return response.results.length > 0;
  } catch {
    return false;
  }
}

export async function createSubscriber({ email, source, date }: { email: string; source: string; date: string }) {
  const databaseId = process.env.NOTION_SUBSCRIBERS_DATABASE_ID;
  if (!databaseId) return;

  await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      Email: {
        email: email,
      },
      Source: {
        rich_text: [{ text: { content: source } }],
      },
      Data: {
        date: { start: date },
      },
    },
  });
}

export async function updateUnsubscribeByToken({ token }: { token: string }) {
  const databaseId = process.env.NOTION_SUBSCRIBERS_DATABASE_ID;
  if (!databaseId) return;

    const search = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Token",
        formula: {
          string: {
            equals: token
          }
        }
      }
    })

    if (!search.results.length) return false

    const pageId = search.results[0].id

    await notion.pages.update({
      page_id: pageId,
      properties: {
        Status: { select: { name: "Stop" } },
      },
    })

    return true
}