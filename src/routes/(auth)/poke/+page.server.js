import { SECRET_API_KEY } from "$env/static/private";
/** @type {import('./$types').PageServerLoad} */
export async function load() {
  let a = await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?origins=1119+swordfish+lane,carolina+beach,NC&destinations=34.027134,-77.894682&mode=walking&key=${SECRET_API_KEY}
    `,
    { headers: { mode: "no-cors" } }
  );
  let data = await a.json();
  return data;
}
