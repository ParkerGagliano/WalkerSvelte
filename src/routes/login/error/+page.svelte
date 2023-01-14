<script>
  import { onMount } from "svelte/internal";
  import { slide } from "svelte/transition";
  import { enhance } from "$app/forms";
  /** @type {import('./$types').PageServerData} */
  export let data;
  /** @type {import('./$types').ActionData} */
  export let form;
  console.log(form);
  let error = false;
  let ready = false;
  onMount(() => {
    ready = true;
  });
  let formerror = false;

  $: if (form?.error) {
    flashFormError();
  }

  if (data.authorized == false && formerror == false) {
    flashError();
  }
  function flashError() {
    error = true;
    setTimeout(() => {
      error = false;
    }, 2600);
  }
  function flashFormError() {
    formerror = true;
    setTimeout(() => {
      formerror = false;
    }, 2600);
  }
</script>

{#if ready === true}
  <div class="container" style="min-height:10vh">
    {#if error}
      <div transition:slide class="alert alert-danger" role="alert">
        {data.message}
      </div>
    {/if}

    {#if formerror}
      <div transition:slide class="alert alert-danger" role="alert">
        {form.error}
      </div>
    {/if}
  </div>
  <div class="container-lg mt-5 pt-5" style="min-height:80vh">
    <div class="row justify-content-center">
      <div class="col-7">
        <form method="POST" use:enhance>
          <div class="form-group">
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
          <div class="form-group">
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
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
{/if}
