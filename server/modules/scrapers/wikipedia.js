const wiki = require('wikijs').default
const util = require('util')

/* global WIKI */

// ------------------------------------
// Wikipedia Scraper
// ------------------------------------

module.exports = {
  /**
   * Scrape Data
   */
  async scrapeData() {
    try {
      const pageTitle = 'Wikipedia:WikiProject Medicine/Lists of pages/Top-, High-importance medicine articles'
      const delayBetweenRequests = 1000 // Delay between requests in milliseconds
      console.log('SCRAPERS/WIKIPEDIA Scraping data for title: ', pageTitle)
      const page = await wiki().page(pageTitle)
      const internalLinks = await page.links()
      console.log(util.inspect(internalLinks, { depth: null, maxArrayLength: null }))

      for (let link of internalLinks) {
        const linkedPage = await wiki().page(link)
        const linkedContent = await linkedPage.content()
        // Transform the data as needed
        // ...
        // Write the data to the database
        // await WIKI.models.yourModel.query().insert(transformedData)
        // Delay to prevent overuse of the Wikipedia API
        await new Promise(resolve => setTimeout(resolve, delayBetweenRequests))
      }
    } catch (error) {
      console.error('SCRAPERS/WIKIPEDIA Error: ', error)
    }
  }
  // Other methods...
}
