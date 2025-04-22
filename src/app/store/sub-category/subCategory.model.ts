export interface SubCategory {
    subCname: string,
    is_active: boolean,
    ID: number,
    created_at: string,
    sub_category_id:string,
    updated_at: string
}

export interface CreateSubCategory {
    subCname: string,
    is_active: boolean,
}