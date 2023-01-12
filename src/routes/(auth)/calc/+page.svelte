<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { fade } from "svelte/transition";
  import { enhance } from "$app/forms";
  import Switch from "$lib/Switch.svelte";
  import Addresses from "$lib/models/addresses";
  let showDesAddress = false;
  let error = false;
  /** @type {import('./$types').PageServerData} */
  export let data;
  let dataready = false;
  /** @type {import('./$types').ActionData} */
  export let form;
  $: if (form?.error) {
    flashError();
  }

  function flashError() {
    error = true;
    setTimeout(() => {
      error = false;
    }, 2600);
  }
</script>

<div class="container-fluid">
  <div class="row justify-content-center" style="min-height: 70px">
    {#if error == true}
      <div class="col-6">
        <div transition:fly={{ y: -200 }} class="border rounded border-danger">
          <h5 class="text-center pb-0 mb-0 mt-2">{form?.error}</h5>
        </div>
      </div>
    {/if}
  </div>
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
  <form
    class="form-group mt-4 mb-5"
    action="?/create"
    method="POST"
    use:enhance
  >
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
      <div class="col-auto">
        <Switch bind:checked={showDesAddress} color="#2196F3" class="mt-2" />
      </div>
    </div>
  </form>
  <div class="container">
    {#each data.addresses as address (address.origin_address)}
      <div
        in:fly={{ x: 100, duration: 250 }}
        class="row mt-3 rounded-pill bg-primary"
      >
        <div class="col-12">
          <div class="row mt-3">
            <div class="col">
              <p class="text-center">{address.origin_address}</p>
            </div>
            <div class="col">
              {#if showDesAddress == true}
                <p in:fade class="text-center">
                  {address.destination_address}
                </p>
              {:else}
                <p in:fade class="text-center">Closest beach access</p>
              {/if}
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
        </div>
      </div>
    {/each}
  </div>
  {#if form?.walktime}
    <h1>{form?.walktime} walk</h1>
  {/if}

  {#if form?.error}
    <h1>{form?.error}</h1>
  {/if}
</div>
