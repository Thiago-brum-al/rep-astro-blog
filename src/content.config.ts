import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
    loader: glob({
        base: './src/content/posts',
        pattern: '**/*.{md,mdx}'
    }),
    schema: ({ image }) => z.object({
        title: z.string(),
        date: z.date(),
        description: z.string(),
        image: image(),
        
        //RELAÇÃO
        // author: z.string(),

        author: reference('authors'),

        //RELAÇÃO
        tags: z.array(z.string()),
        isDraft: z.boolean().default(false)
    }),
});

const authors = defineCollection({
    loader: glob({
        base: './src/content/author',
        pattern: '**/*.yml'
    }),
    schema: ({ image }) => z.object({
        name: z.string(),
        avatar: image(),
        twitter: z.string(),
        linkedIn: z.string(),
        github: z.string(),
        bio: z.string(),
        subtitle: z.string()
    })
});

export const collections = {
    posts,
    authors
}; 