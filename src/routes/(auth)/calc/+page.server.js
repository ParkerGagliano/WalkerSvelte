import { SECRET_API_KEY } from "$env/static/private";

import { db } from "$lib/database";
/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
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
    console.log(addy);
    let a = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${addy},carolina+beach,NC&destinations=34.027134,-77.894682&mode=walking&key=${SECRET_API_KEY}
      `,
      { headers: { mode: "no-cors" } }
    );
    let data = await a.json();
    if (data.origin_addresses == "Carolina Beach, NC 28428, USA") {
      return { error: "Address not found" };
    } else {
      console.log(data, "89232389un");
      let addyData = {
        addyData: {
          origin_address: data.origin_addresses[0],
          destination_address: data.destination_addresses[0],
          walktime: data.rows[0].elements[0].duration.text,
        },

        session_token: event.cookies.get("session_token"),
      };
      let joe = db.addAddress(addyData);
      return joe;
    }
  },
};
