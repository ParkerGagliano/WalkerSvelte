<script>
  import { page } from "$app/stores";
</script>

<div class="container pt-5" style="min-height:100vh">
  <div class="row justify-content-center">
    <div class="col-auto">
      <div in:fly={{ x: 200 }} class="col-auto">
        <img class="img-fluid" src="cb.svg" alt="" />
      </div>
    </div>
  </div>
  <div class="row justify-content-center mt-4">
    <div class="col-auto">
      <h1>{$page.error.message}</h1>
    </div>
  </div>
</div>
