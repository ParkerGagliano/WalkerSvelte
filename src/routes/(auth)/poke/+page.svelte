<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  /** @type {import('./$types').PageServerData} */
  export let data;
  let dataready = false;
  console.log(data.rows[0].elements);
</script>

<h1>{data.rows[0].elements[0].duration.text}</h1>
