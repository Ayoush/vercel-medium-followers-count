// scrapeFollowersCount.js
import axios from 'axios';
import cheerio from 'cheerio';

export async function scrapeFollowersCount() {
    try {
        const response = await axios.get('https://medium.com/@ayoushchourasia');
        
        const $ = cheerio.load(response.data);
        
        const followersElement = $('span.pw-follower-count.be.b.fx.ga.dn');
        
        const followersText = followersElement.text().trim();
        
        const followersCount = parseInt(followersText.match(/\d+/)[0]);

        return followersCount;
    } catch (error) {
        console.error('An error occurred:', error.message);
        throw new Error('Failed to scrape followers count');
    }
}
