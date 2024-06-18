export default interface ProductContract {
    productId : number;
    name: string;
    description : string;
    inStock :number;
    price : number;
    imageUrl : string;
    productCategoryId: number;
    productCategoryName : string;
}