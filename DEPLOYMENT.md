# Sakuraサーバーへのデプロイ手順

## 📁 アップロード対象ファイル
`dist/` フォルダ内のファイルをすべてサーバーの公開ディレクトリにアップロード：

```
dist/
├── index.html     （メインHTML）
├── main.js        （コンパイル済みJavaScript）
├── style.css      （スタイルシート）
└── problems.json  （問題データ）
```

## 🚀 Sakuraサーバーアップロード方法

### 方法1: ファイルマネージャー（推奨）
1. Sakuraサーバーのコントロールパネルにログイン
2. 「ファイルマネージャー」を開く
3. `www` または `public_html` フォルダに移動
4. 新しいフォルダ `kanji-study` を作成
5. `dist/` 内の4つのファイルをすべてアップロード

### 方法2: FTP/SFTP
```bash
# FTP接続例（情報は適宜変更）
ftp your-domain.sakura.ne.jp
# ログイン後
cd www/kanji-study
# または
cd public_html/kanji-study

# ファイルをput
put index.html
put main.js  
put style.css
put problems.json
```

### 方法3: rsync（対応プランのみ）
```bash
rsync -av dist/ username@your-domain.sakura.ne.jp:www/kanji-study/
```

## 🌐 アクセスURL
アップロード完了後、以下のURLでアクセス可能：
```
https://your-domain.sakura.ne.jp/kanji-study/
```

## ✅ 動作確認
- 4つのモードボタンが表示される
- 問題が正しく表示される
- 画面タッチで正解表示される
- 正解/不正解ボタンで次の問題に進む
- 49問の実際の学習データが出題される

## 📱 特徴
- 完全にクライアントサイドで動作
- サーバーサイドの処理不要
- 静的ファイルのみで構成
- スマートフォン・タブレット対応

## 🔄 更新方法
1. ローカルで修正
2. `npm run build` 実行
3. `dist/` 内のファイルを再アップロード

---
*Generated: 2025/8/30 - Kanji Learning App v1.0*
