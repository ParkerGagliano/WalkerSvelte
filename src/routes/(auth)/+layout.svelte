<script>
  /** @type {import('./$types').LayoutServerData} */
  export let data;
  console.log(data);
</script>

<nav class="navbar navbar-expand-sm navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Walker</a>
    <button
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
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
        <li class="nav-item ">
          <a class="nav-link active " aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link active"
            href="/calc
          ">Calculate</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="/login">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="/logout">Logout</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="/login">{data.username}</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
{#if data.error}
  <h1>{data.error}</h1>
{/if}
<slot />
