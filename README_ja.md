# Deep Research Web UI

[English](README.md) | 日本語

## 概要

リサーチトピック入力 → AIがクエリ生成 → Web検索・スクレイピング → マインドマップ・レポート作成

このプロジェクトは [dzhng/deep-research](https://github.com/dzhng/deep-research) のWeb UIで、多言語対応（英語、日本語、フランス語）とDocker デプロイに焦点を当てています。

## 特徴

- 🔍 **AI駆動リサーチ**: 自動化された研究プロセスと視覚的フロー追跡
- 🌐 **多言語対応**: 英語、日本語、フランス語インターフェース
- 🔒 **プライバシー重視**: すべてのAPIリクエストはブラウザから、リモートデータ保存なし
- ⚡ **リアルタイム**: ストリーミング応答とライブ更新
- 🌳 **視覚的研究フロー**: 研究プロセスのツリー構造可視化
- 📄 **エクスポートオプション**: MarkdownとPDFエクスポート機能
- 🤖 **複数AIプロバイダー**: OpenAI、SiliconFlow、DeepSeek、OpenRouter、Ollama
- 🔍 **Web検索プロバイダー**: Tavily、Firecrawl、Google PSE

## Dockerクイックスタート

### オプション1: クライアントモード（ユーザーが自分でAPIキーを設定）

```bash
# リポジトリをクローン
git clone https://github.com/tsubotan1985/deep-research-web-ui-jp
cd deep-research-web-ui-jp

# Dockerでビルドして実行
docker build -t deep-research-web .
docker run -d --name deep-research-web -p 3000:3000 deep-research-web
```

アクセス先: http://localhost:3000

### オプション2: サーバーモード（事前設定されたAPIキー）

1. **環境ファイルの作成:**
```bash
# .envファイルを作成
cat > .env << EOF
NUXT_PUBLIC_SERVER_MODE=true
NUXT_AI_API_KEY=あなたのAI-APIキー
NUXT_WEB_SEARCH_API_KEY=あなたの検索APIキー
NUXT_PUBLIC_AI_PROVIDER=openai-compatible
NUXT_PUBLIC_AI_MODEL=gpt-4o-mini
NUXT_PUBLIC_WEB_SEARCH_PROVIDER=tavily
EOF
```

2. **環境変数で実行:**
```bash
# オプションA: .envファイルを使用
docker run -d --name deep-research-web -p 3000:3000 --env-file .env deep-research-web

# オプションB: 直接環境変数を指定
docker run -d --name deep-research-web -p 3000:3000 \
  -e NUXT_PUBLIC_SERVER_MODE=true \
  -e NUXT_AI_API_KEY=あなたのAI-APIキー \
  -e NUXT_WEB_SEARCH_API_KEY=あなたの検索APIキー \
  -e NUXT_PUBLIC_AI_PROVIDER=openai-compatible \
  -e NUXT_PUBLIC_AI_MODEL=gpt-4o-mini \
  -e NUXT_PUBLIC_WEB_SEARCH_PROVIDER=tavily \
  deep-research-web
```

## ステップバイステップDockerデプロイガイド

### 前提条件
- システムにDockerがインストールされていること
- AIプロバイダー（OpenAI等）とWeb検索プロバイダー（Tavily等）のAPIキー

### ステップ1: クローンとビルド

```bash
# 1. リポジトリをクローン
git clone https://github.com/tsubotan1985/deep-research-web-ui-jp
cd deep-research-web-ui-jp

# 2. Dockerイメージをビルド
docker build -t deep-research-web .
```

### ステップ2: デプロイモードの選択

**個人使用の場合（クライアントモード）:**
```bash
# ユーザーがWebインターフェースでAPIキーを設定
docker run -d --name deep-research-web -p 3000:3000 deep-research-web
```

**チーム/組織での使用（サーバーモード）:**
```bash
# 設定ファイルを作成
cat > .env << EOF
# サーバーモード設定
NUXT_PUBLIC_SERVER_MODE=true

# AIプロバイダー設定
NUXT_AI_API_KEY=sk-your-openai-api-key
NUXT_PUBLIC_AI_PROVIDER=openai-compatible
NUXT_PUBLIC_AI_MODEL=gpt-4o-mini
NUXT_PUBLIC_AI_CONTEXT_SIZE=128000

# Web検索設定
NUXT_WEB_SEARCH_API_KEY=your-tavily-api-key
NUXT_PUBLIC_WEB_SEARCH_PROVIDER=tavily
NUXT_PUBLIC_WEB_SEARCH_CONCURRENCY_LIMIT=2
NUXT_PUBLIC_WEB_SEARCH_SEARCH_LANGUAGE=ja
EOF

# 設定で実行
docker run -d --name deep-research-web -p 3000:3000 --env-file .env deep-research-web
```

### ステップ3: アクセスと確認

1. ブラウザで http://localhost:3000 を開く
2. 言語選択に「English」「日本語」「Français」が表示されることを確認
3. 簡潔な説明が表示されることを確認
4. リサーチ機能をテスト

### ステップ4: コンテナ管理

```bash
# コンテナステータス確認
docker ps

# ログを表示
docker logs deep-research-web

# コンテナ停止
docker stop deep-research-web

# コンテナ開始
docker start deep-research-web

# コンテナ削除
docker rm deep-research-web

# イメージ削除
docker rmi deep-research-web
```

## 環境変数リファレンス

### サーバーモードで必須
| 変数名 | 説明 | 例 |
|--------|------|-----|
| `NUXT_PUBLIC_SERVER_MODE` | サーバーモードを有効化 | `true` |
| `NUXT_AI_API_KEY` | AIプロバイダーAPIキー | `sk-...` |
| `NUXT_WEB_SEARCH_API_KEY` | 検索プロバイダーAPIキー | `tvly-...` |

### オプション設定
| 変数名 | 説明 | デフォルト | オプション |
|--------|------|------------|------------|
| `NUXT_PUBLIC_AI_PROVIDER` | AIプロバイダー | `openai-compatible` | `openai-compatible`, `siliconflow`, `deepseek` |
| `NUXT_PUBLIC_AI_MODEL` | AIモデル | `gpt-4o-mini` | サポートされているモデル |
| `NUXT_PUBLIC_WEB_SEARCH_PROVIDER` | 検索プロバイダー | `tavily` | `tavily`, `firecrawl`, `google-pse` |
| `NUXT_PUBLIC_WEB_SEARCH_SEARCH_LANGUAGE` | 検索言語 | `en` | `en`, `ja`, `fr` |

## トラブルシューティング

### よくある問題

**コンテナが起動しない:**
```bash
# Dockerログを確認
docker logs deep-research-web

# ポートが使用されていないか確認
netstat -an | grep 3000
```

**APIエラー:**
- APIキーが正しいか確認
- APIキーの権限と使用量制限を確認
- 環境変数が正しく設定されているか確認

**言語の問題:**
- ブラウザキャッシュをクリア
- 再ビルドしたDockerイメージに言語修正が含まれているか確認

### ヘルプの取得

1. コンテナログを確認: `docker logs deep-research-web`
2. 環境変数を確認: `docker exec deep-research-web env | grep NUXT`
3. コンテナ内からのAPI接続をテスト

## 開発

Docker以外での開発:

```bash
# 依存関係をインストール
pnpm install

# 開発サーバー起動
pnpm dev

# 本番用ビルド
pnpm build
```

## 最新アップデート

25/07/24
- 追加: 研究履歴管理 - 個別履歴のエクスポート/インポート、全履歴一括削除

25/07/23
- 追加: サーバーモード - 環境変数でのデプロイ、ユーザーはAPIキー設定不要

25/02/22
- 更新: 言語サポートを英語、日本語、フランス語に変更
- 更新: より使いやすくするためプロジェクト説明を簡潔化

## ライセンス

MIT License
