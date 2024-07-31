export interface BaseProps {
    title: string
    description: string
    ogType?: string
    ogImage?: string
    ogUrl?: string
}

export interface Navigation {
    title: string
    order: number
}

export interface Frontmatter<T> extends BaseProps {
    navigation: T
}

export interface BlogFrontmatter<T> extends Frontmatter<undefined> {
    date: T
    image?: string
    imageAlt?: string
}
