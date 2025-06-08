import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const newsArticles = pgTable("news_articles", {
    news_number: integer("news_number").notNull(),
    title: text("title").notNull(),
    imageUrl: text("image_url").notNull(),
    category: text("category").notNull(),
    publisher: text("publisher").notNull(),
    description: text("description").notNull(),
    date: timestamp("date").notNull().defaultNow(),
    readMoreUrl: text("read_more_url").notNull(),
});
export type NewsArticle = typeof newsArticles.$inferSelect;
