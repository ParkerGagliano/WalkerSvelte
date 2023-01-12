<script>
  import "../../app.scss";
  /** @type {import('./$types').LayoutServerData} */
  export let data;

  if (data.error) {
    console.log(data.error);
  }
  function handleNavToggle() {
    const nav = document.getElementById("navbarSupportedContent");
    if (nav.classList.contains("show")) {
      nav.classList.remove("show");
    } else {
      nav.classList.add("show");
    }
  }

  function flashError() {}
</script>

<nav class="navbar navbar-expand-sm navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Walker</a>
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
            href="/calc
          ">Calculate</a
          >
        </li>
      </ul>
      <ul class="navbar-nav ">
        {#if data.username}
          <li class="nav-item">
            <a class="nav-link active" href="/logout">Logout</a>
          </li>
        {:else}
          <li class="nav-item">
            <a class="nav-link active" href="/login">Login</a>
          </li>
        {/if}
        {#if data.username}
          <li class="nav-item">
            <a class="nav-link active" href="/login">{data.username}</a>
          </li>
        {/if}
      </ul>
    </div>
  </div>
</nav>
{#if data.error}
  <h1>{data.error}</h1>
{/if}

<slot />
