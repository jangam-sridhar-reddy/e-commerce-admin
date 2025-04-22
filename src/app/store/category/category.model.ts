export interface Category {
    cName: string,
    is_active: boolean,
    ID: number,
    created_at: string,
    updated_at: string,
    category_id: string
}

export interface CreateCategory {
    cName: string,
    is_active: boolean,
}