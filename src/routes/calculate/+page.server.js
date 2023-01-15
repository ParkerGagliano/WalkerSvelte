import { SECRET_API_KEY } from "$env/static/private";
import { db } from "$lib/database";
import { redirect } from "@sveltejs/kit";
import { fade } from "svelte/transition";

/** @type {import('./$types').PageServerLoad}Load} */
export async function load({ cookies, parent }) {
  let test = await parent();
  if (test.error) {
    throw redirect(307, "/login/error");
  }
  const sessionid = cookies.get("session_token");

  if (!sessionid) {
    throw redirect(307, "/login/error");
  }
  let session = await db.getSession(sessionid);
  if (session.error) {
    throw redirect(307, "/login/error");
  }
  if (session.expiresat < new Date()) {
    let del = await db.deleteSession(session.id);
    throw redirect(307, "/login/error");
  }
  let addresses = await db.getAddresses(session.user_id);
  return { addresses: addresses ?? [] };
}
/** @type {import('./$types').Actions} */
export const actions = {
  create: async ({ cookies, request }) => {
    //let check = await db.getUser(cookies.get("session_token"));
    //if (check.error) {
    // throw redirect(307, "/login");
    //}
    let fd = await request.formData();
    let address = fd.get("address");

    let final = address.split(" ");

    let addy = "";
    final.forEach((element) => {
      if (element == final[final.length - 1]) {
        addy += element;
      } else {
        addy += element + "+";
      }
    });
    let destinations =
      "Salt+Marsh+Ln,Carolina+Beach,NC|Periwinkle+Ln,Carolina+Beach,NC|Clam+Shell+Ln,Carolina+Beach,NC+28428|Ocean+Blvd,Carolina+Beach,NC|Sandpiper+Ln,Carolina+Beach,NC";

    let a = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${addy},carolina+beach,NC&destinations=34.027134,-77.894682|${destinations}&mode=walking&key=${SECRET_API_KEY}
      `,
      { headers: { mode: "no-cors" } }
    );
    let data = await a.json();
    let smallest = { value: Infinity, index: 0 };
    let temp2 = data.rows[0].elements.map((element, a) => {
      if (element.distance.value < smallest.value) {
        smallest.value = element.distance.value;
        smallest.index = a;
      }
    });

    if (data.origin_addresses == "Carolina Beach, NC 28428, USA") {
      return { error: "Address not found" };
    } else {
      destinations = data.destination_addresses[smallest.index];
      let drivetime = await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${addy},carolina+beach,NC&destinations=34.027134,-77.894682|${destinations}&mode=drive&key=${SECRET_API_KEY}
        `,
        { headers: { mode: "no-cors" } }
      );
      let d = await drivetime.json();
      let addyData = {
        addyData: {
          origin_address: data.origin_addresses[0],
          destination_address: data.destination_addresses[smallest.index],
          walktime: data.rows[0].elements[smallest.index].duration.text,
          drivetime: d.rows[0].elements[0].duration.text,
        },
        session_token: cookies.get("session_token"),
      };
      console.log(addyData);
      let joe = await db.addAddress(addyData);
      return joe;
    }
  },
  delete: async ({ request, cookies }) => {
    let data = await request.formData();
    let res = db.deleteAddress(data.get("id"));
    return res;
  },
};
