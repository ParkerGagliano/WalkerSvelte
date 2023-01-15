<script>
  import { onMount } from "svelte/internal";
  import { slide } from "svelte/transition";
  import { enhance } from "$app/forms";

  /** @type {import('./$types').ActionData} */
  export let form;
  console.log(form);
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

<div class="container" style="min-height:10vh">
  {#if error}
    <div transition:slide class="alert alert-danger" role="alert">
      {form.error}
    </div>
  {/if}
</div>

<div class="container-lg mt-5 pt-5" style="min-height:80vh">
  <div class="row">
    <div class="col">
      <h5 class="text-center">Login</h5>
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-7">
      <form method="POST" use:enhance>
        <div class="form-group mt-2">
          <label for="exampleInputEmail1">Username</label>
          <input
            name="username"
            type="username"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter username"
            required
          />
        </div>
        <div class="form-group mt-2">
          <label for="exampleInputPassword1">Password</label>
          <input
            name="password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary mx-auto d-block mt-3"
          >Submit</button
        >
      </form>
    </div>
  </div>
</div>
