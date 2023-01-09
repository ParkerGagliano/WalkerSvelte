import { db } from "$lib/database";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  let ans = await db.login("danjo");
  return {
    ans,
  };
}
