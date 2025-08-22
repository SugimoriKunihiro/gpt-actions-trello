# Trello GPT Actions (Vercel版)

## セットアップ

1. **Trello API設定**:
   - https://trello.com/power-ups/admin でPower-Upを作成
   - API KeyとTokenを取得
   - TodayリストのIDを取得

2. **Vercelデプロイ**:
   ```bash
   npm i -g vercel
   vercel
   ```

3. **環境変数設定**:
   Vercelダッシュボードで以下を設定:
   - `TRELLO_API_KEY`
   - `TRELLO_TOKEN`
   - `TRELLO_TODAY_LIST_ID`

## GPT Actions設定

`openapi.yaml`をChatGPTのGPT Actionsにインポート

## API

- `POST /api/add-card` - Todayリストにカード追加