<script>
  /** @type {import('./$types').LayoutServerData} */
  export let data;
  console.log(data);
</script>

{#if data.error}
  <h1>{data.error}</h1>
{/if}
<h1>{data.username}</h1>
