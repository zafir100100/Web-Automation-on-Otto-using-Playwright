const { expect } = require('@playwright/test');

class ProductDetailsPage {
    constructor(page) {
        this.page = page;
        this.cartPageUrl = "https://www.otto.de/order/basket";
        this.addToCartButtonElement = page.locator('[data-qa="addToBasket"]');
        this.goToCartButtonElement = page.locator('[data-qa="goToBasket"]');
    }

    addItemAndGoToCart = async () => {
        await this.addToCartButtonElement.click();
        await this.goToCartButtonElement.last().click();
        await this.page.waitForURL(this.cartPageUrl);
        await expect(this.page).toHaveTitle(/Warenkorb/);
    }
}

module.exports = ProductDetailsPage;
