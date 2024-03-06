import React from "react";

export interface IFilePreview {
    type: "image" | "document";
    src?: string;
    name: string;
}

export type AddPreviews = (files: File[]) => void;
export type CreateFilePreview = (file: File) => void;
export type HandleSetFiles = (e: React.ChangeEvent<HTMLInputElement>) => void;