<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  let dataready = false;
  /** @type {import('./$types').ActionData} */
  export let form;
  console.log(form);
</script>

<form method="POST">
  <input type="text" name="address" />
  <button type="submit">Calculate</button>
</form>

{#if form?.rows}
  <h1>{form?.rows[0].elements[0].duration.text} walk</h1>
{/if}

{#if form?.error}
  <h1>{form?.error}</h1>
{/if}
