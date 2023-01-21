<script>
  import { fly } from "svelte/transition";
  import { slide } from "svelte/transition";
  import { enhance } from "$app/forms";
  import Switch from "$lib/Switch.svelte";

  let showDesAddress = true;
  let error = false;
  /** @type {import('./$types').PageServerData} */
  export let data;

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

<div class="container mt-20 min-h-full mx-auto">
  <div
    class=" border-black-50 border-2 text-center  shadow-lg  py-3  rounded-lg mt-10 justify-evenly bg-gray-100 "
  >
    <h1
      class="text-3xl font-bold bg-clip-text text-bold
            bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-900 via-sky-400 to-blue-700 text-transparent "
    >
      Walk Time Calculator
    </h1>
    <p class="text-sky-700">Time to closest public beach access</p>
  </div>
  <form
    action="?/create"
    method="POST"
    use:enhance
    class=" border-black-50 border-2 text-center flex flex-col shadow-lg   py-6 rounded-lg mt-10  bg-gray-100 "
  >
    <div class="flex flex-row justify-center">
      <input
        required
        name="address"
        type="text"
        class="mr-4 p-2 rounded-lg w-1/3 md:w-1/2 lg:w-1/3"
        placeholder="123 Swordfish Ln"
      />
      <h2 class="font-bold mr-4 pt-1 text-lg">Carolina Beach</h2>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-900 rounded-lg w-1/5 lg:w-1/6"
        >Check</button
      >
    </div>
  </form>
  {#if error == true}
    <div
      out:fly|local={{ x: -100, duration: 250 }}
      in:fly={{ x: 100, duration: 250 }}
      class="p-2 mt-10 my-auto mx-auto rounded-full border-2 border-red-700 "
      role="alert"
    >
      <p class="text-center text-red-700  font-bold">
        {form?.error}
      </p>
    </div>
  {:else}
    <div class="p-1" />
  {/if}
  {#each data.addresses as address (address.id)}
    <div
      out:fly|local={{ x: -100, duration: 250 }}
      in:fly={{ x: 100, duration: 250 }}
      class="border-black-50 border-2  text-center flex flex-col md:flex-row shadow-lg py-6 rounded-lg mt-10 justify-around"
    >
      <p class="w-full md:w-1/5">
        {address.origin_address}
      </p>
      <p class="mt-4 md:mt-0 w-full md:w-1/5">
        {address.destination_address}
      </p>
      <div class="mt-4 md:mt-0 w-full md:w-2/6 flex flex-row">
        <div class="w-1/2  my-auto">
          <img class="mx-auto" height="25px" src="walker.svg" alt="" />
          <p>{address.walktime}</p>
        </div>
        <div class="w-1/2 my-auto">
          <img class="mx-auto " height="25px" src="car.svg" alt="" />
          <p>{address.drivetime}</p>
        </div>
      </div>

      <form
        use:enhance
        action="?/delete"
        method="POST"
        class="w-full md:w-1/5 my-auto"
      >
        <input type="hidden" name="id" value={address.id} />
        <button
          type="submit"
          class="p-2 justify-self-center  text-white bg-red-700 hover:bg-red-900 rounded-lg"
          >Delete</button
        >
      </form>
    </div>
  {/each}
</div>
