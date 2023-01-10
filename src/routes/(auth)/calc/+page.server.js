import { SECRET_API_KEY } from "$env/static/private";
import { db } from "$lib/database";
import { redirect } from "@sveltejs/kit";
import { fade } from "svelte/transition";

/** @type {import('./$types').PageServerLoad}Load} */
export async function load({ cookies }) {
  const sessionid = cookies.get("session_token");
  let session = await db.getSession(sessionid);
  let addresses = await db.getAddresses(session.user_id);
  let temp = addresses.map((element) => {
    return {
      origin_address: element.origin_address,
      destination_address: element.destination_address,
      walktime: element.walktime,
    };
  });
  console.log(temp, "ADDRESSES");
  if (!sessionid) {
    throw redirect(307, "/login");
  }

  return { addresses: temp };
}
/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    let check = await db.getUser(event.cookies.get("session_token"));
    if (check.error == "Session expired") {
      throw redirect(307, "/login");
    }
    let fd = await event.request.formData();
    let address = fd.get("address");
    console.log(address);
    let final = address.split(" ");
    console.log(final);
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
    console.log(addy);
    let a = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${addy},carolina+beach,NC&destinations=34.027134,-77.894682|${destinations}&mode=walking&key=${SECRET_API_KEY}
      `,
      { headers: { mode: "no-cors" } }
    );
    let data = await a.json();
    console.log(data.rows[0].elements, "ELEEM");
    let smallest = { value: Infinity, index: 0 };
    let temp2 = data.rows[0].elements.map((element, a) => {
      if (element.distance.value < smallest.value) {
        smallest.value = element.distance.value;
        smallest.index = a;
      }
    });

    console.log("DSNMALKDNALJ", smallest.index);

    if (data.origin_addresses == "Carolina Beach, NC 28428, USA") {
      return { error: "Address not found" };
    } else {
      console.log(data, "89232389un");
      let addyData = {
        addyData: {
          origin_address: data.origin_addresses[0],
          destination_address: data.destination_addresses[smallest.index],
          walktime: data.rows[0].elements[smallest.index].duration.text,
        },

        session_token: event.cookies.get("session_token"),
      };
      let joe = db.addAddress(addyData);
      return joe;
    }
  },
};
