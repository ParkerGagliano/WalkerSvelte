<script>
  /** @type {import('./$types').PageServerData} */
  export let data;
  console.log(data);
</script>

<h1>{data.ans}</h1>
<div>{@html data.ans}</div>
