const { expect } = require('@playwright/test');

class CartPage {
    constructor(page, products) {
        this.page = page;
        this.products = products;
        this.productNameElement = page.locator('//div[@data-qa="articleName"]/a');
        this.productPriceElement = page.locator('//div[contains(@class,"currentPrice")]');
    }

    verifyProductDetails = async () => {
        const expectedFirstProduct = this.products.at(0);
        const expectedProductName = expectedFirstProduct.name;
        const expectedProductPrice = expectedFirstProduct.price;

        // const actualProductName = await this.productNameElement.textContent().trim();
        // const actualProductPrice = await this.productPriceElement.textContent().trim();
        const actualProductName = await this.productNameElement.textContent();
        const actualProductPrice = await this.productPriceElement.textContent();

        const result = this.areAllWordsPresentInString(expectedProductName, actualProductName);
        expect(result).toBe(true);

        const result2 = this.areAllWordsPresentInString(actualProductPrice.trim(), expectedProductPrice);
        expect(result2).toBe(true);

        // expect(actualProductName.trim()).toBe(expectedProductName);
        // expect(actualProductPrice.trim()).toBe(expectedProductPrice);
    }

    areAllWordsPresentInString = (sourceString, targetString) => {
        const normalizedString1 = sourceString.toLowerCase();
        const normalizedString2 = targetString.toLowerCase();

        const words = normalizedString1.split(/\s+/);

        return words.every(word => normalizedString2.includes(word));
    }
}

module.exports = CartPage;
