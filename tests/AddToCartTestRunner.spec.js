require('dotenv').config()
const { test } = require('@playwright/test');
const LandingPage = require('../pages/LandingPage');
const SearchResultPage = require('../pages/SearchResultPage');
const ProductDetailsPage = require('../pages/ProductDetailsPage');
const CartPage = require('../pages/CartPage');

test('Search, filter, and add trampoline to cart with price verification', async ({ page }) => {
    await page.setViewportSize({width: 1920, height: 1080});
    const landingPage = new LandingPage(page);
    await landingPage.gotoLandingPage();
    await landingPage.doSearch("trampolin");
    const searchResultPage = new SearchResultPage(page);
    await searchResultPage.setSortByHighestPrice();
    await searchResultPage.setPriceRangeFilter(500, 1000);
    await searchResultPage.getProducts();
    await searchResultPage.verifyFirstFiveProductsSortedByPriceDescending();
    await searchResultPage.clickOnFirstProduct();
    const productDetailsPage = new ProductDetailsPage(page);
    await productDetailsPage.addItemAndGoToCart();
    const cartPage = new CartPage(page, searchResultPage.products);
    await cartPage.verifyProductDetails();
});