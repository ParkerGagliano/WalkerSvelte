<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  /** @type {import('./$types').PageServerData} */
  export let data;
  let dataready = false;
  /** @type {import('./$types').ActionData} */
  export let form;
</script>

<div class="container-fluid">
  <div class="row">
    <div class="col">
      <h1 class="text-center mt-3">Walk Time Calculator</h1>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <p class="text-center">Time to closest public beach access</p>
    </div>
  </div>
  <form class="form-group mt-4 mb-5" method="POST">
    <div class="row justify-content-center">
      <div class="col-auto">
        <input class="form-control" type="text" name="address" />
      </div>
      <div class="col-auto">
        <h5 class="m-0 mt-2 p-0">Carolina Beach, NC</h5>
      </div>
      <div class="col-auto">
        <button class="btn btn-success" type="submit">Calculate</button>
      </div>
    </div>
  </form>
  <div class="container">
    {#if data?.addresses}
      {#each data.addresses as address, i}
        <div
          in:fly={{ duration: 250 * i }}
          class="row mt-3 rounded-pill bg-primary"
        >
          <div class="col">
            <p class="text-center">{address.origin_address}</p>
          </div>
          <div class="col">
            <p class="text-center">{address.destination_address}</p>
          </div>
          <div class="col-3">
            <div class="row">
              <div class="col">
                <p class="text-center">Walk</p>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <p class="text-center">{address.walktime}</p>
              </div>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
  {#if form?.walktime}
    <h1>{form?.walktime} walk</h1>
  {/if}

  {#if form?.error}
    <h1>{form?.error}</h1>
  {/if}
</div>
