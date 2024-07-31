export interface Navigation {
    title: string
    order: number
}

export interface Frontmatter<T> {
    title: string
    navigation: T
}

export interface BlogFrontmatter<T> extends Frontmatter<undefined> {
    description: string
    date: T
}
