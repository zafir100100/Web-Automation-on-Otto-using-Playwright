const { expect } = require('@playwright/test');

class SearchResultPage {
    constructor(page) {
        this.page = page;
        this.productLinkElements = page.locator('a[class*="productLink"]');
        this.productNameElements = page.locator('p[class*="find_tile__name"]');
        this.productBrandElements = page.locator('p[class*="find_tile__brand"]');
        this.productPriceElements = page.locator('span[class*="retailPrice"]');
        this.sortingElement = page.locator('#heureka_desktopSorting--select--cloned');
        this.priceFilterElement = page.locator('//div[@id="find_filterSection"]//div[@data-filter-id="preis"]');
        this.priceFilterMinElement = page.locator('#heureka_slider_1__minInput');
        this.priceFilterMaxElement = page.locator('#heureka_slider_1__maxInput');
        this.submitPriceRangeElement = page.locator('//form[@id="find_filter_preis"]//button[@type="submit"][contains(text(),"Auswahl ansehen")]');
        this.rejectAllCookieElement = page.locator('#onetrust-reject-all-handler');
        this.products = [];
    }

    setSortByHighestPrice = async () => {
        await this.sortingElement.selectOption({ value: 'preis-absteigend' });
        const selectedValue = await this.sortingElement.evaluate(el => el.value);
        expect(selectedValue).toBe('preis-absteigend');
    }

    setPriceRangeFilter = async (min, max) => {
        await this.priceFilterElement.click();
        this.priceFilterMinElement.fill(min.toString());
        this.priceFilterMaxElement.fill(max.toString());
        await this.submitPriceRangeElement.click();
    }

    getProducts = async () => {
        const brandNames = await this.productBrandElements.allTextContents();
        const productNames = await this.productNameElements.allTextContents();
        const productPrices = await this.productPriceElements.allTextContents();
        const productLinks = await this.productLinkElements.evaluateAll(elements =>
            elements.map(el => el.href)
        );

        if (productNames.length !== productPrices.length) {
            console.warn('Mismatch between number of product names and prices');
            return [];
        }

        const products = productNames.length > 0 ? productNames.map((name, index) => ({
            name: name.trim(),
            brand: brandNames.at(index).trim(),
            price: productPrices.at(index).trim(),
            link: productLinks.at(index).trim()
        })) : [];

        console.log(products);

        if (products.length > 0) {
            expect(products.length).toBeGreaterThan(0);
        } else {
            expect(products.length).toBe(0);
        }

        this.products = products;
    }

    verifyFirstFiveProductsSortedByPriceDescending = async () => {
        const products = this.products;

        expect(products.length).toBeGreaterThanOrEqual(5);

        const firstFiveProducts = products.slice(0, 5);
        const sortedProducts = [...firstFiveProducts].sort((a, b) => b.price - a.price);

        expect(firstFiveProducts).toEqual(sortedProducts);
    }

    clickOnFirstProduct = async () => {
        const firstProduct = this.productNameElements.first();
        const firstLink = this.products[0].link;
        const firstProductName = this.products[0].name;
        await firstProduct.click();
        await this.rejectAllCookieElement.click();
        // await this.page.waitForURL(firstLink);
        const title = await this.page.title();
        // const result = this.areAllWordsPresentInString(firstProductName, title);
        const result = this.areAllWordsPresentInString(title, firstProductName);
        expect(result).toBe(true);
    }

    areAllWordsPresentInString = (sourceString, targetString) => {
        const normalizedString1 = sourceString.toLowerCase();
        const normalizedString2 = targetString.toLowerCase();

        const words = normalizedString1.split(/\s+/);

        return words.every(word => normalizedString2.includes(word));
    }
}

module.exports = SearchResultPage;
