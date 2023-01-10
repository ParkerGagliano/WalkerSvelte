<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  let dataready = false;
  let photos;
  onMount(async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/ditto`);
    photos = await res.json();
  });
  $: console.log(photos);
</script>

<h1>dnsakjadsnkj</h1>
{#if photos}
  <h1>
    {photos}
  </h1>
{:else}
  <h1>Loading</h1>
{/if}
