<script>
  import "../../app.scss";
  import { fly } from "svelte/transition";
  import { onMount } from "svelte/internal";
  let ready = false;
  onMount(() => {
    ready = true;
  });
  /** @type {import('./$types').LayoutServerData} */
  export let data;
  if (data.error) {
    flashError();
  }

  function flashError() {
    setTimeout(() => {
      data.error = "";
    }, 3000);
  }
</script>

{#if ready === true}
  <div class="row" style="height: 10vh">
    {#if data.error}
      <h1 transition:fly={{ x: 200 }}>{data.error}</h1>
    {/if}
  </div>
{/if}
<slot />
