<script>
  import { page } from "$app/stores";
  import { fly } from "svelte/transition";
</script>

<div class="container mt-20 h-4/5 mx-auto">
  <img src="cb.svg" class="mx-auto pr-10" alt="" />
  <h1
    class="text-3xl font-bold bg-clip-text text-bold
  bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-900 via-sky-400 to-blue-700 text-center text-transparent "
  >
    {$page.error.message}
  </h1>
</div>
