export type Channel = "LINKEDIN" | "INSTAGRAM" | "X"
export type Locale = "ar" | "en"
export interface EditorialSlide { slideNumber: number; title: string; bodyText: string; visualCue: string }
export interface EditorialVersion { platform: Channel; language: Locale; content: string; hashtags: string[]; scheduledFor: string; slides?: EditorialSlide[]; assets: string[] }
export interface EditorialArticle {
  key: string; slug: string; title: Record<Locale,string>; excerpt: Record<Locale,string>; content: Record<Locale,string>;
  category: string; tags: string[]; scheduledFor: string; cover: string; sources: { title: string; url: string }[]
}
export interface EditorialTopic {
  key: string; title: string; theme: string; pillar: string; date: string;
  sourceType: "STANDALONE" | "PROJECT" | "ARTICLE"; sourceUrl?: string; sourceLabel?: string; articleKey?: string;
  notes: string; versions: EditorialVersion[]
}
export interface EditorialPack {
  key: string; name: string; objective: string; timezone: string; startsAt: string; endsAt: string;
  strategy: { voice: string[]; visuals: string[]; cadence: string[]; rules: string[]; measurement: string[] };
  articles: EditorialArticle[]; topics: EditorialTopic[]
}
