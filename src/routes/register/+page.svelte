<script>
  import { onMount } from "svelte/internal";
  import { fly } from "svelte/transition";

  let ready = false;
  onMount(() => {
    ready = true;
  });
</script>

{#if ready === true}
  <div class="container-lg">
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
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Confirm Password</label>
            <input
              name="confirmpassword"
              type="confirmpassword"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
{/if}
