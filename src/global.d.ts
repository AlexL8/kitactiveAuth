declare module '*.module.scss' {
    const styles: Record<string, string>;
    export default styles;
}

declare module '*.svg' {
    const content: any;
    export default content;
}

declare module '*.png' {
    const value: any;
    export = value;
}

interface Window {
    [key: string]: any;
}