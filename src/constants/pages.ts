import {Page, PageKey, Pages} from '../types/pages';

export const PAGES_CONFIG: { [key in PageKey]: Page } = {
    login: {
        key: 'login',
        route: '/login',
        type: 'public',
    },
    registration: {
        key: 'registration',
        route: '/registration',
        type: 'public',
    },
    main: {
        key: 'main',
        route: '/main',
        type: 'private',
    }
};

export const PUBLIC_PAGES: Pages = Object.values(PAGES_CONFIG).filter(
    (page) => page.type === 'public'
);

export const PRIVATE_PAGES: Pages = Object.values(PAGES_CONFIG).filter(
    (page) => page.type === 'private'
);
