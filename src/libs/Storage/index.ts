export interface IStorage {
    setItem: (key: string, value: string) => void;
    getItem: (key: string) => string | null;
    deleteItem: (key: string) => void;
}

export const Storage: IStorage = {
    setItem: window.localStorage.setItem,
    getItem: window.localStorage.getItem,
    deleteItem: window.localStorage.removeItem,
};
