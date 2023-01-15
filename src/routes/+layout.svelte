<script>
  import "../app.scss";
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
<div class="container-fluid p-0 m-0">
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container-fluid">
      <h1 class="mb-0 navbar-brand">Walker</h1>
      <button
        on:click={() => {
          handleNavToggle();
        }}
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div
        class="collapse navbar-collapse  justify-content-between"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav ">
          <li class="nav-item  ">
            <a class="nav-link active " aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link active"
              href="/calculate
            ">Calculate</a
            >
          </li>
        </ul>
        <ul class="navbar-nav ">
          {#if data.authorized == true}
            <li class="nav-item">
              <a
                class="nav-link active"
                data-sveltekit-preload-data="tap"
                href="/logout"
                on:click|preventDefault={handleClick}>Logout</a
              >
            </li>
          {:else}
            <li class="nav-item">
              <a class="nav-link active" href="/login">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/register">Register</a>
            </li>
          {/if}
          {#if data.authorized == true}
            <li class="nav-item">
              <a class="nav-link active" href="/login">{data.username}</a>
            </li>
          {/if}
        </ul>
      </div>
    </div>
  </nav>

  <div class="row" />

  <slot />
  <footer>
    <div class="mt-4 row justify-content-center">
      <div class="col-auto">
        <p>
          Built by <a href="https://projects.parkergagliano.com"
            >Parker Gagliano</a
          >
          using <a href="https://kit.svelte.dev/">Sveltekit</a>
        </p>
      </div>
    </div>
  </footer>
</div>
