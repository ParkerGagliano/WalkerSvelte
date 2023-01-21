<script>
  import "../app.css";
  import { invalidateAll } from "$app/navigation";
  import { goto } from "$app/navigation";
  /** @type {import('./$types').LayoutServerData} */
  export let data;

  function handleNavToggle() {
    const nav = document.getElementById("navbarSupportedContent");
    if (nav.classList.contains("show")) {
      nav.classList.remove("show");
    } else {
      nav.classList.add("show");
    }
  }

  async function handleClick() {
    await goto("/logout");
    invalidateAll();
  }

  function flashError() {}
</script>

<svelte:head>
  <title>Walker</title>
</svelte:head>
<nav
  class="p-4 border-b-2 border-white w-full fixed top-0 bg-gray-100 flex items-center justify-between"
>
  <div class="flex gap-x-2 md:gap-x-10 ">
    <img width="25px" height="25px" src="walker.svg" alt="" />
    <a
      class="hover:text-transparent  font-bold bg-clip-text text-bold
        bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-900 via-sky-400 to-blue-700 "
      href="/">Home</a
    >
    <a
      class="hover:text-transparent  font-bold bg-clip-text text-bold
        bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-900 via-sky-400 to-blue-700"
      href="/calculate">Calculate</a
    >
  </div>

  <div>
    <div class="flex gap-x-2 md:gap-x-10">
      {#if data.authorized == true}
        <a
          class="hover:text-transparent  font-bold bg-clip-text text-bold
        bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-900 via-sky-400 to-blue-700"
          data-sveltekit-preload-data="tap"
          href="/logout"
          on:click|preventDefault={handleClick}>Logout</a
        >
        <p
          class="hover:text-transparent  font-bold bg-clip-text text-bold
            bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-900 via-sky-400 to-blue-700"
        >
          {data.username}
        </p>
      {:else}
        <a
          class="hover:text-transparent  font-bold bg-clip-text text-bold
            bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-900 via-sky-400 to-blue-700"
          href="/register">Register</a
        >
        <a
          class="hover:text-transparent  font-bold bg-clip-text text-bold
            bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-900 via-sky-400 to-blue-700"
          href="/login">Login</a
        >
      {/if}
    </div>
  </div>
</nav>
<slot />
<footer>
  <p class="text-center mt-10 pt-8">
    Built By <a
      class="font-bold bg-clip-text text-bold
            bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-900 via-sky-400 to-blue-700 text-transparent"
      href="">Parker Gagliano</a
    >
  </p>
</footer>
