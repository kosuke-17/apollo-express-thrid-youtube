"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product = {
    category: ({ categoryId }, _args, { categories }) => {
        return categories.find((category) => category.id === categoryId);
    },
    reviews: ({ id }, _args, { reviews }) => {
        return reviews.filter((review) => review.productId === id);
    },
};
exports.default = Product;
