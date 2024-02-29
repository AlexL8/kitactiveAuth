export type PageKey =
    | 'login'
    | 'registration'
    | 'main'

export interface Page {
    key: PageKey;
    route: string;
    type?: 'private' | 'public';
}

export type Pages = Page[]
