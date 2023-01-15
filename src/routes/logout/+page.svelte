<script>
  /** @type {import('./$types').PageServerLoad} */
  export let data;
</script>

{#if data.error != undefined}
  <h1>
    {data.error}
  </h1>
{:else}
  <h1>
    {data.message}
  </h1>
{/if}
