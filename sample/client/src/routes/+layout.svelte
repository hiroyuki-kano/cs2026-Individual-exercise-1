<script lang="ts">
  //アプリケーション全体のレイアウトを管理するコンポーネント
  //本レイアウトにはめ込まれるページコンポーネントをchildrenとして受け取る
  const { children } = $props();
</script>

<svelte:head>
  <!-- headタグに挿入するコンテンツを設定 -->
  <!-- CSS変数を設定しているCSSファイルを読み込み -->
  <link rel="stylesheet" href="/styles.css" />
</svelte:head>

<div class="app">
  <header></header>

  <main>
    {@render children()}
  </main>
</div>

<style>
  .app {
    min-height: 100vh;
  }

  header {
    padding: 1rem;
    border-bottom: 1px solid #777;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  main {
    padding: 1rem;
  }
</style>
