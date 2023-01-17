import { SECRET_API_KEY } from "$env/static/private";
let firstdestinationmap = {
  0: {
    name: "Alabama Public Beach Access",
    c: { x: "34.013834", y: "-77.900046" },
  },
  1: {
    name: "Texas Avenue Meter Lot",
    c: { x: "34.015428", y: "-77.899419" },
  },
  2: {
    name: "South Carolina Public Beach Access",
    c: { x: "34.017039", y: "-77.898913" },
  },
  3: {
    name: "Ocean Public Beach Access",
    c: { x: "34.018612", y: "-77.898107" },
  },
  4: {
    name: "North Carolina Public Beach Access",
    c: { x: "34.020256", y: "-77.897518" },
  },
  5: {
    name: "Tennessee Public Beach Access",
    c: { x: "34.021944", y: "-77.897020" },
  },
  6: {
    name: "Spartanburg Public Beach Access",
    c: { x: "34.025788", y: "-77.895226" },
  },
  7: {
    name: "Lake Public Beach Access",
    c: { x: "34.027160", y: "-77.894741" },
  },
  8: {
    name: "Driftwood Public Beach Access",
    c: { x: "34.028520", y: "-77.894167" },
  },
  9: {
    name: "Atlanta Public Beach Access",
    c: { x: "34.029935", y: "-77.893738" },
  },
  10: {
    name: "Hamlet Public Beach Access",
    c: { x: "34.031454", y: "-77.892882" },
  },
  11: {
    name: "Harper Public Beach Access",
    c: { x: "34.034094", y: "-77.891702" },
  },
};
let seconddestinationmap = {
  0: {
    name: "Pelican Public Beach Access",
    c: { x: "34.036361", y: "-77.890739" },
  },
  1: {
    name: "Dolphin Public Beach Access",
    c: { x: "34.037715", y: "-77.890161" },
  },
  2: {
    name: "Scallop Public Beach Access",
    c: { x: "34.039127", y: "-77.889752" },
  },
  3: {
    name: "Sea Gull Public Beach Access",
    c: { x: "34.040500", y: "-77.889241" },
  },
  4: {
    name: "Sailfish Public Beach Access",
    c: { x: "34.041890", y: "-77.888672" },
  },
  5: {
    name: "Oyster Shell Public Beach Access",
    c: { x: "34.043232", y: "-77.888158" },
  },
  6: {
    name: "Sandpiper Public Beach Access",
    c: { x: "34.044557", y: "-77.887434" },
  },
  7: {
    name: "Seahorse Public Beach Access",
    c: { x: "34.045910", y: "-77.886866" },
  },
  8: {
    name: "Scotch Bonnet Public Beach Access",
    c: { x: "34.047298", y: "-77.886310" },
  },
  9: {
    name: "Starfish Public Beach Access",
    c: { x: "34.048625", y: "-77.885627" },
  },
  10: {
    name: "Sand Dollar Public Beach Access",
    c: { x: "34.049963", y: "-77.884986" },
  },
  11: {
    name: "Clam Shell Public Beach Access",
    c: { x: "34.051290", y: "-77.884319" },
  },
  12: {
    name: "Periwinkle Public Beach Access",
    c: { x: "34.052580", y: "-77.883507" },
  },
};
/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ cookies, request }) => {
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

    let checkdestinations = "34.034094,-77.891702|34.036361,-77.890739";
    let aa = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${addy},carolina+beach,NC&destinations=${checkdestinations}&mode=walking&key=${SECRET_API_KEY}
      `,
      { headers: { mode: "no-cors" } }
    );
    let first = false;
    let dataa = await aa.json();

    if (
      dataa.rows[0].elements[0].distance.value <
      dataa.rows[0].elements[1].distance.value
    ) {
      first = true;
    }
    let finaldes;
    let destinations = "";

    if (first == true) {
      destinations =
        "34.013834,-77.900046|34.015428,-77.899419|34.017039,-77.898913|34.018612,-77.898107|34.020256,-77.897518|34.021944,-77.897020|34.025788,-77.895226|34.027160,-77.894741|34.028520,-77.894167|34.029935,-77.893738|34.031454,-77.892882|34.034094,-77.891702";
      finaldes = firstdestinationmap;
    } else {
      destinations =
        "34.036361,-77.890739|34.037715,-77.890161|34.039127,-77.889752|34.040500,-77.889241|34.041890,-77.888672|34.043232,-77.888158|34.044557,-77.887434|34.045910,-77.886866|34.047298,-77.886310|34.048625,-77.885627|34.049963,-77.884986|34.051290,-77.884319|34.052580,-77.883507|34.052580,-77.883507";
      finaldes = seconddestinationmap;
    }

    //let destinations =
    // "Salt+Marsh+Ln,Carolina+Beach,NC|Periwinkle+Ln,Carolina+Beach,NC|Clam+Shell+Ln,Carolina+Beach,NC+28428|Ocean+Blvd,Carolina+Beach,NC|Sandpiper+Ln,Carolina+Beach,NC";
    //let destinations =
    // "34.013834,-77.900046|34.015428,-77.899419|34.017039,-77.898913|34.018612,-77.898107|34.020256,-77.897518|34.021944,-77.897020|34.025788,-77.895226|34.027160,-77.894741|34.028520,-77.894167|34.029935,-77.893738|34.031454,-77.892882|34.034094,-77.891702|34.036361,-77.890739|34.037715,-77.890161|34.039127,-77.889752|34.040500,-77.889241|34.041890,-77.888672|34.043232,-77.888158|34.044557,-77.887434|34.045910,-77.886866|34.047298,-77.886310|34.048625,-77.885627|34.049963,-77.884986|34.051290,-77.884319|34.052580,-77.883507|34.052580,-77.883507";

    let a = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${addy},carolina+beach,NC&destinations=${destinations}&mode=walking&key=${SECRET_API_KEY}
      `,
      { headers: { mode: "no-cors" } }
    );
    let data = await a.json();

    let smallest = { value: Infinity, index: 0 };
    data.rows[0].elements;
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
      let drive = await drivetime.json();

      let addyData = {
        addyData: {
          origin_address: data.origin_addresses[0],
          destination_address: finaldes[smallest.index].name,
          walktime: data.rows[0].elements[smallest.index].duration.text,
          drivetime: drive.rows[0].elements[0].duration.text,
        },
      };
      return addyData;
    }
  },
};
