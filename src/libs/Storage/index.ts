export interface IStorage {
    setItem: (key: string, value: string) => void;
    getItem: (key: string) => string | null;
}

export const Storage: IStorage = {
    setItem: window.localStorage.setItem,
    getItem: window.localStorage.getItem,
};
