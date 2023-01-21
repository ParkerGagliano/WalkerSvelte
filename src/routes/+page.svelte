<script>
  import { fade } from "svelte/transition";
  import { fly } from "svelte/transition";
  import { enhance } from "$app/forms";

  let fdata = { addyData: null };

  let error = false;

  /** @type {import('./$types').ActionData} */
  export let form;
  $: if (form) {
    refreshAddress();
  }

  $: if (form?.error) {
    flashError();
  }
  function refreshAddress() {
    fdata.addyData = null;
    setTimeout(() => {
      fdata.addyData = form.addyData;
    }, 10);
  }
  if (form?.error) {
    flashError();
  }

  function flashError() {
    error = true;
    setTimeout(() => {
      error = false;
    }, 2000);
  }
</script>

<div class="container mt-20 pt-5 mx-auto min-h-screen">
  <div
    class="border-black-50 border-2 text-center md:text-left shadow-lg  pt-6 pb-8 rounded-lg justify-evenly bg-gray-100 hover:bg-gray-50"
  >
    <div class="text-5xl text-center">
      <span
        in:fade
        class="font-bold bg-clip-text text-bold
                bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-900 via-sky-400 to-blue-700 text-transparent"
        >Welcome to "Walker"</span
      >
    </div>
    <div class="div mt-5">
      <p in:fade class="text-center text-sky-700">
        Walker is a simple calculator that finds the closest public beach access
        to a given address and will calculate the walk time and golf cart/drive
        time.
      </p>
    </div>
  </div>

  <div
    in:fly={{ x: -200 }}
    class=" border-black-50 border-2 text-center md:text-left shadow-lg flex h-90 md:h-80 rounded-lg flex-row mt-10 justify-evenly bg-gray-100 hover:bg-gray-50"
  >
    <div class="w-5/6 mt-0 md:mt-10 px-6">
      <h1
        class="text-3xl font-bold bg-clip-text text-bold
            bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-900 via-sky-400 to-blue-700 text-transparent "
      >
        Made Specifically for Carolina Beach
      </h1>
      <p class="text-sky-700">
        This app was made specifically for Carolina Beach, NC. Currently, the
        only destinations for this calculator are all of the public beach
        accesses in Carolina Beach. This could later be expanded to create
        custom pages for certain areas and their landmarks.
      </p>

      <p class="mt-3 sm:mt-10 md:mt-20 font-light text-opacity-60 text-sky-600">
        You can save your history of queries in the Calculate page if you <a
          class="font-bold bg-clip-text text-bold
                bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-900 via-sky-400 to-blue-700 text-transparent "
          href="">create an account</a
        >.
      </p>
    </div>
    <div class="mt-5 w-1/6 hidden md:block">
      <img class="mx-auto" src="cb.svg" alt="" />
    </div>
  </div>

  <div
    in:fly={{ x: -200 }}
    class="text-center md:text-left border-black-50  border-2 shadow-lg h-100  pb-10  rounded-lg bg-gray-100 mt-10 justify-evenly hover:bg-gray-50"
  >
    <div class="px-6 mt-10">
      <h1
        class="text-3xl font-bold bg-clip-text text-bold
            bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-900 via-sky-400 to-blue-700 text-transparent "
      >
        How it Works
      </h1>
      <p class="text-sky-700">
        Input the first part of the address within Carolina Beach, NC and the
        app will calculate the closest public beach access along with the walk
        time and drive/golf cart time to that address.
      </p>
      <div class="flex flex-col justify-content-center">
        <form
          method="POST"
          use:enhance
          class="flex flex-row justify-center space-x-5 mt-5"
        >
          <input
            type="text"
            class="w-1/3 md:w-1/2 lg:w-1/4 p-2 rounded-lg"
            placeholder="123 Swordfish Ln"
            name="address"
            required
          />
          <p class="text-left text-sky-700 pt-1 pl-0 text-xl">Carolina Beach</p>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-900 rounded-lg w-1/5"
            >Check</button
          >
        </form>
      </div>
      {#if fdata.addyData != null}
        <div
          out:fly|local={{ x: -100, duration: 250 }}
          in:fly={{ x: 100, duration: 250 }}
          class="border-black-50 border-2 text-center flex flex-col md:flex-row shadow-lg py-6 rounded-lg mt-10 justify-around"
        >
          <p class="w-full md:w-1/5">
            {fdata.addyData.origin_address}
          </p>
          <p class="mt-4 md:mt-0 w-full md:w-1/5">
            {fdata.addyData.destination_address}
          </p>
          <div class="mt-4 md:mt-0 w-full md:w-2/6 flex flex-row">
            <div class="w-1/2  my-auto">
              <img class="mx-auto" height="25px" src="walker.svg" alt="" />
              {fdata.addyData.walktime}
            </div>
            <div class="w-1/2 my-auto">
              <img class="mx-auto " height="25px" src="car.svg" alt="" />
              {fdata.addyData.drivetime}
            </div>
          </div>
        </div>
      {/if}
    </div>
    <div />
  </div>
</div>
