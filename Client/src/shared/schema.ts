import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const newsArticles = pgTable("news_articles", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageUrl: text("image_url").notNull(),
    category: text("category").notNull(),
    description: text("description").notNull(),
    date: timestamp("date").notNull().defaultNow(),
    readMoreUrl: text("read_more_url").notNull(),
});

export const insertNewsArticleSchema = createInsertSchema(newsArticles).pick({
    title: true,
    imageUrl: true,
    description: true,
    readMoreUrl: true,
});

export type InsertNewsArticle = z.infer<typeof insertNewsArticleSchema>;
export type NewsArticle = typeof newsArticles.$inferSelect;