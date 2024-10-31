interface TitleObject {
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
    uuid: string;
    title: string;
}

export type TitlesArray = TitleObject[];
export interface TokenObject {
    token: string;
}