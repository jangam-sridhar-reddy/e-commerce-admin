export interface Product {
    productName: string,
    imageURL: string,
    product_price: string,
    stock_id: number,
    category_id: number,
    sub_category_id: number,
    ID: number,
    product_id: string,
    created_at: string,
    updated_at: string,
    category_name: string,
    subCategory_name: string,
    stockStatus: string
}

export interface CreateProduct {
    productName: string,
    image: string,
    product_price: string,
    stock_id: number,
    category_id: number,
    sub_category_id: number,
}