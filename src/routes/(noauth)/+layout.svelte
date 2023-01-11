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
    }, 2600);
  }
</script>

{#if ready === true}
  <div class="row justify-content-center" style="height: 10vh">
    {#if data.error}
      <div
        transition:fly={{ y: -200 }}
        class="col-6 border rounded border-danger"
      >
        <h5 class="text-center pb-0 mb-0 mt-2">{data.error}</h5>
      </div>
    {/if}
  </div>
{/if}
<slot />
