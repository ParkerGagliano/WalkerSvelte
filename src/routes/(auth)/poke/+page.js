/** @type {import('./$types').PageLoad} */
export async function load() {
  let a = await fetch(`https://pokeapi.co/api/v2/pokemon/ditto`);
  let data = await a.json();
  return data;
}
