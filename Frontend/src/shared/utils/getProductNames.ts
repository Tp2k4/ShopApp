export const getProductNames = (products: any): string[] => {
    return products.map((product: any) => product.name);
};