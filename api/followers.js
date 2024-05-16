import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  const { profileUrl } = req.query;

  if (!profileUrl || !profileUrl.includes('medium.com')) {
    return res.status(400).json({ error: 'Invalid Medium profile URL' });
  }

  try {
    const response = await axios.get(profileUrl);
    const $ = cheerio.load(response.data);
    const followersElement = $('span.pw-follower-count.be.b.fx.ga.dn');
    const followersText = followersElement.text().trim();
    const followersCount = parseInt(followersText.match(/\d+/)[0]);

    return res.status(200).json({ followersCount });
  } catch (error) {
    console.error('An error occurred:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}