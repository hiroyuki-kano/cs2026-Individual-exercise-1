# 演習１用のWebAPI（完成済み）

## 利用方法

```
npm install     (依存パッケージのインストール：※最初の一回だけ)
npm run build
```

### 結果

上記のコマンドで、Webpackによるバンドルが行われます。  
そしてsampleフォルダ、sourceフォルダの両方に、wwwというファイル名でExpressアプリケーションが出力されます。

### Expressアプリケーションの実行

sampleフォルダもしくはsourceフォルダ内で、下記のコマンドを実行してください。  
演習１用のWebAPIがポート3000番で起動します。

```
npm install   （依存パッケージのインストール：※最初の一回だけ）
npm run reset （DBの準備：※最初の一回だけ）
npm start
```