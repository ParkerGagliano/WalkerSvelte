<script>
  import { onMount } from "svelte/internal";
  import { fly } from "svelte/transition";

  /** @type {import('./$types').PageServerData} */
  export let data;
  /** @type {import('./$types').ActionData} */
  export let form;
  console.log(form);
  let ready = false;
  onMount(() => {
    ready = true;
  });
</script>

{#if ready === true}
  {#if form?.error}
    <div class="alert alert-danger" role="alert">
      {form?.error}
    </div>
  {/if}
  <div class="container-lg mt-5 pt-5">
    <div class="row justify-content-center">
      <div class="col-7">
        <form method="POST">
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
