const { expect } = require('@playwright/test');

class LandingPage {
    constructor(page) {
        this.page = page;
        this.landingPageUrl = "https://www.otto.de";
        this.searchFieldElement = page.locator('[data-qa-id="search-field"]');
        this.searchButtonElement = page.locator('[data-qa-id="search-field-submit"]');
    }

    gotoLandingPage = async () => {
        await this.page.goto(this.landingPageUrl);
        await expect(this.page).toHaveTitle(/OTTO/);
    }

    doSearch = async (searchText) => {
        await this.searchFieldElement.fill(searchText);
        await this.searchButtonElement.click();
        await this.page.waitForURL(`${this.landingPageUrl}/suche/${searchText}/`);
        await expect(this.page).toHaveTitle(/Suchergebnis/);
    }
}

module.exports = LandingPage;
