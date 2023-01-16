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
  $: console.log(fdata);

  function flashError() {
    error = true;
    setTimeout(() => {
      error = false;
    }, 2000);
  }
</script>

<div class="container mt-5" style="min-height: 100vh">
  <div class="row">
    <div class="col">
      <h2 in:fade class="text-center">Welcome to "Walker"</h2>
    </div>
  </div>

  <div in:fade class="row">
    <div class="col">
      <p class="text-center">
        Walker is a simple calculator that finds the closest public beach access
        to a given address and will calculate the walk time
      </p>
    </div>
  </div>

  <div class="row mt-5">
    <div in:fly={{ x: -200 }} class="col">
      <div class="row">
        <div class="col-12">
          <h4>Made Specifically for Carolina Beach</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <p>
            This app was made specifically for Carolina Beach, NC. Currently,
            the only destinations for this calculator are all of the public
            beach accesses in Carolina Beach. This could later be expanded to
            create custom pages for certain areas and their landmarks.
          </p>
        </div>
        <div class="col-12">
          <p>
            You can save your history of queries in the <a href="/calculate"
              >Calculate</a
            > page if you create an account.
          </p>
        </div>
      </div>
    </div>

    <div in:fly={{ x: 200 }} class="col-auto">
      <img class="img-fluid" src="cb.svg" alt="" />
    </div>
  </div>

  <div class="row">
    <div class="col-12">
      <h4 class="text-center mt-5">How it works</h4>
    </div>
    <div class="col-12">
      <p class="text-center">
        Just input a valid address and it will find the closest public beach
        access and tell you the walk time
      </p>
    </div>
  </div>
  <form class="form-group mt-4 mb-5" method="POST" use:enhance>
    <div class="row justify-content-center">
      <div class="col-auto">
        <input class="form-control" required type="text" name="address" />
      </div>
      <div class="col-auto">
        <h5 class="m-0 mt-2 p-0">Carolina Beach, NC</h5>
      </div>
      <div class="col-auto mt-2 mt-md-0">
        <button class="btn btn-success" type="submit">Calculate</button>
      </div>
    </div>
    {#if error}
      <div class="row mt-3">
        <div class="col">
          <div class="alert alert-danger" out:fade>
            {form?.error}
          </div>
        </div>
      </div>
    {/if}
  </form>

  {#if fdata.addyData != null}
    <div
      out:fly|local={{ x: -100, duration: 250 }}
      in:fly={{ x: 100, duration: 250 }}
      class="row mt-3   bg-primary"
      style="border-radius: 23px;"
    >
      <div class="col-12 p-3">
        <div class="row">
          <div class="col-12 col-sm-4">
            <p in:fade class="text-center">{fdata.addyData.origin_address}</p>
          </div>
          <div class="col-12 col-sm-4">
            <p in:fade class="text-center">
              {fdata.addyData.destination_address}
            </p>
          </div>
          <div class="col-12 col-sm-4">
            <div class="row">
              <div class="col">
                <div class="col">
                  <div class="row justify-content-center">
                    <div class="col-auto ">
                      <img in:fade class="img-fluid" src="car.svg" alt="" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <p in:fade class="text-center">
                        {fdata.addyData.drivetime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="row justify-content-center">
                  <div class="col-auto">
                    <img in:fade class="img-fluid" src="walk.svg" alt="" />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <p in:fade class="text-center">
                      {fdata.addyData.walktime}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col">
        <p class="text-center" in:fade>
          Want to save a history of addresses? <a href="/register">Register</a> with
          a simple username and password
        </p>
      </div>
    </div>
  {/if}
</div>
