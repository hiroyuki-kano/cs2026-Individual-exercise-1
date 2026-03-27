<script lang="ts">
	const { children } = $props();
</script>

<div class="app">
	<header></header>
	<main>
		{@render children()}
	</main>
</div>

<style>
	/* :global()で、アプリ全体（すべてのコンポーネント）に適用 */
	/* 今後、値の指定で、var(--primary-color)と書くと、#000が指定されたことになる */
	:global(:root) {
		--primary-color: #000;
		--secondary-color: #6c757d;
		--error-color: #ed5848;
		--background-color: #f8f9fac5;
		--text-color: #333;
	}

	/* アプリ全体のbodyタグに対する指定：余白をゼロに、基本フォントをサンセリフに */
	:global(body) {
		margin: 0;
		font-family: sans-serif;
	}

	/* アプリの大枠（.app）の高さが、最低でもブラウザ画面100%になるようにする */
	.app {
		min-height: 100vh;
	}

	/* ヘッダーのスタイル（Flexboxを使って中身を右方向に寄せて配置） */
	header {
		padding: 1rem;
		border-bottom: 1px solid #777;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}

	/* メインコンテンツ領域の周りに内側余白（1rem）を持たせる */
	main {
		padding: 1rem;
	}

	/* アプリ全体のすべてのボタンに対して、マウスが乗った時（hover）に少しだけ透明にする */
	:global(button:hover) {
		opacity: 0.9;
	}
</style>
