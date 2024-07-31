import type { MarkdownInstance } from 'astro'
import type { BlogFrontmatter } from './types'

export async function getBlogPosts(
    maxCount: number | undefined = undefined
): Promise<MarkdownInstance<BlogFrontmatter<Date>>[]> {
    const blogPostImports = import.meta.glob<
        MarkdownInstance<BlogFrontmatter<string>>
    >('/src/pages/blog/*.md')

    const blogPosts = await Promise.all(
        Object.values(blogPostImports).map((fn) => fn())
    )

    return blogPosts
        .map((post) => ({
            ...post,
            frontmatter: {
                ...post.frontmatter,
                date: new Date(post.frontmatter.date),
            },
        }))
        .sort(
            (a, b) =>
                b.frontmatter.date.getTime() - a.frontmatter.date.getTime()
        )
        .slice(0, maxCount)
}
