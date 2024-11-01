export interface TitleObject {
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

export interface Options {
    endpoint: string,
    method: string,
    body?: string,
    authorization?: string
}
export interface deletedTitleObject {
    uuid: string;
}
export interface OptionsAndTitles {
    options: Options;
    titles: TitlesArray;
}