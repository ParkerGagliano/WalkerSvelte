<script>
  import { fly } from "svelte/transition";
  import { slide } from "svelte/transition";
  import { enhance } from "$app/forms";
  /** @type {import('./$types').ActionData} */
  export let form;
  let error = false;
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

<div class="container mx-auto h-screen">
  <div class="px-6 h-full text-gray-800">
    <div
      class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
    >
      <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
        <form method="POST" use:enhance>
          {#if error}
            <div
              transition:slide
              class="p-3 mx-auto rounded-full w-3/4 lg:w-2/4 border-2 border-red-700 "
              role="alert"
            >
              <p class="text-center text-red-700  font-bold">
                {form.error}
              </p>
            </div>
          {/if}
          <h1
            class="font-bold bg-clip-text text-center text-4xl text-bold mb-5
            bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))]  from-blue-900 p-2 via-sky-400 to-blue-700 text-transparent"
          >
            Register
          </h1>
          <!-- Email input -->
          <div class="mb-6">
            <input
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              name="username"
              type="username"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter username"
              required
            />
          </div>

          <!-- Password input -->
          <div class="mb-6">
            <input
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              name="password"
              type="password"
              id="exampleInputPassword1"
              placeholder="Password"
              required
            />
          </div>
          <div class="mb-6">
            <input
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              name="confirmpassword"
              type="password"
              id="exampleInputPassword1"
              placeholder="Password"
              required
            />
          </div>

          <div class="text-center ">
            <button
              type="submit"
              class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
