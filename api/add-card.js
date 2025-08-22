import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, desc, due } = req.body;
    
    const cardData = {
      name,
      desc: desc || '',
      idList: process.env.TRELLO_TODAY_LIST_ID,
      key: process.env.TRELLO_API_KEY,
      token: process.env.TRELLO_TOKEN
    };
    
    if (due) {
      cardData.due = new Date(due).toISOString();
    }
    
    const response = await axios.post(
      `https://api.trello.com/1/cards`,
      cardData
    );
    
    res.json({
      success: true,
      message: 'TrelloのTodayリストにカードを追加しました',
      cardId: response.data.id,
      url: response.data.url
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      details: error.response?.data
    });
  }
}
