
const { calculateDiscount, filterProducts, sortInventory } = require('./main.js'); //require and function constants using destructured syntax.

describe("calculateDiscount", () => {
    test("calculates discount correctly for valid inputs", () => {
         expect(calculateDiscount(100, 0.1)).toBe(90);
    });
    test("handles an invalid discount rate gracefully", () => {
        // expect(calculateDiscount(100, -0.1)).toBe(null);  This was what we had in our group, but I changed it to handle the error I'm throwing.
        expect(() => calculateDiscount(100, -0.1)).toThrow(TypeError);
    });
    test("handles an invalid price", () => {
        expect(() => calculateDiscount(-30, 0.4)).toThrow(TypeError);
    });
     test("handles edge case with price of 0", () => {
        expect(calculateDiscount(0, 0.2)).toBe(0);
    });
});

describe("filterProducts", () => {
        const products = [
            { id: 1, name: "Laptop", price: 1000 },
            { id: 2, name: "Mouse", price: 25 },
            { id: 3, name: "Keyboard", price: 75 }
        ];
        test("Positive: filters products based on price", () => {
        const filtered = filterProducts(products, (product) => product.price > 50);
        expect(filtered).toEqual([
            { id: 1, name: "Laptop", price: 1000 },
            { id: 3, name: "Keyboard", price: 75 }
        ]);
    });
//individual work from here down.
    test("Negative: returns empty array when product is not in array", () => {
        const notArray = "products";
        const filtered = filterProducts(notArray, (product) => product.id === 1);
        expect(filtered).toEqual([]);
    });

    test("Negative: returns empty array when callback is not a function", () => {
        const filtered = filterProducts(products, products.id === 1);
        expect(filtered).toEqual([]);
    });

    test("Edge Case: handles an array with only one object", () => {
        const product = [
            { id: 1, name: "Laptop", price: 1000 },
        ];
        const filtered = filterProducts(product, (product) => product.id === 1);
        expect(filtered).toEqual([{ id: 1, name: "Laptop", price: 1000 }]);
    });
});

describe("sortInventory", () => {
    const products = [
            { id: 1, name: "Laptop", price: 1000 },
            { id: 3, name: "Mouse", price: 25 },
            { id: 2, name: "Keyboard", price: 75 }
        ];
    test("Positive: sorts inventory by id - NUMBER ", () => {
       const sorted = sortInventory(products,"id");
       expect(sorted).toEqual([
        { id: 1, name: "Laptop", price: 1000 },
        { id: 2, name: "Keyboard", price: 75 },
        { id: 3, name: "Mouse", price: 25 }
       ]);
    });  
    test("Positive: sorts inventory by price - NUMBER", () =>{
        const sorted = sortInventory(products,"price");
        expect(sorted).toEqual([
            { id: 3, name: "Mouse", price: 25 },
            { id: 2, name: "Keyboard", price: 75 },
            { id: 1, name: "Laptop", price: 1000 },
        ]);
    });  
    test("Positive: sorts inventory by name - STRING", () =>{
        const sorted = sortInventory(products,"name");
        expect(sorted).toEqual([
            { id: 2, name: "Keyboard", price: 75 },
            { id: 1, name: "Laptop", price: 1000 },
            { id: 3, name: "Mouse", price: 25 },
        ]);
    });  
    test("Negative: key is not a string", () =>{
        const sorted = sortInventory(products, 4);
        expect(sorted).toEqual([]);
    });
    test("Negative: key does not exist in object", () =>{
        const sorted = sortInventory(products, "quantity");
        expect(sorted).toEqual([]);
    });
    test("Negative: inventory is not an array", () =>{
        const sorted = sortInventory("products", "name");
        expect(sorted).toEqual([]);
    });
    test("Edge Case: inventory array is empty", () =>{
        const emptyArray = [];
        const sorted = sortInventory(emptyArray, "name");
        expect(sorted).toEqual([]);
    });
});