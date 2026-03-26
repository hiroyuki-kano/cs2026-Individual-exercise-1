<script lang="ts">
  //デフォルト表示ページのコンポーネント
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  onMount(() => {
      goto('/todos');
  });
</script>
