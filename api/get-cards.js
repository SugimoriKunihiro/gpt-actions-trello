import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await axios.get(
      `https://api.trello.com/1/lists/${process.env.TRELLO_TODAY_LIST_ID}/cards`,
      {
        params: {
          key: process.env.TRELLO_API_KEY,
          token: process.env.TRELLO_TOKEN,
          fields: 'id,name,desc,due,dateLastActivity,url'
        }
      }
    );
    
    res.json({
      success: true,
      message: 'TrelloのTodayリストからカード一覧を取得しました',
      cards: response.data.map(card => ({
        id: card.id,
        name: card.name,
        description: card.desc,
        due: card.due,
        lastActivity: card.dateLastActivity,
        url: card.url
      }))
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      details: error.response?.data
    });
  }
}