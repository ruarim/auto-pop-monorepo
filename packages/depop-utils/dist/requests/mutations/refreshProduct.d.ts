export type RefreshData = {
    slug: string;
    accessToken: string;
};
export declare const refresh: (data: RefreshData) => Promise<import("axios").AxiosResponse<any, any>>;
