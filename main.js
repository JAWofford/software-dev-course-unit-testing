
//calculate a discount given the price and discount rate.  Discount rate expects a decimal.
function calculateDiscount(price, discountRate) {
    if (typeof price !== 'number' || typeof discountRate !== 'number') {
        throw new TypeError ('Price and discount must be numbers.'); //The original code returned null here.  But going back and thinking about it, I thought this might be better.
    };
    if (price <0){
        throw new TypeError ('Price cannot be a negative number.');
    };
    if (discountRate < 0 || discountRate > 1){
        throw new TypeError ('discount must be between 0 and 1.')
    };
    return price - (price * discountRate); 
}


function filterProducts(products, callback) {
    if (!Array.isArray(products) || typeof callback !== 'function') return []; //decided to leave this an as empty array and not thow an error.  Not sure that's the right way or not.
    return products.filter(callback);
}
function sortInventory(inventory, key) {
    if (!Array.isArray(inventory) || typeof key !== 'string') return []; //reminder just checking if NAME of key is a string, not value.

    const keyExists = inventory.some(item => key in item); //checking to see if the key exists for any object in the array
    if (!keyExists) return [];

    return [...inventory].sort((a, b) => { //making a shallow copy so original array isn't mutated.
        if (typeof a[key] === "string") {  // checking if key VALUE in object is a string so I can sort properly
            return a[key].localeCompare(b[key]); 
        }
        return a[key] - b[key]; //handling a number.
    });
}
module.exports = { calculateDiscount, filterProducts, sortInventory };