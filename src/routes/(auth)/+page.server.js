import { SECRET_API_KEY } from "$env/static/private";
/** @type {import('./$types').Actions} */
export const actions = {
    create: async ({ cookies, request }) => {
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
        console.log(addy);
        let a = await fetch(
            `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${addy},carolina+beach,NC&destinations=34.027134,-77.894682|${destinations}&mode=walking&key=${SECRET_API_KEY}
        `,
            { headers: { mode: "no-cors" } }
        );
        let data = await a.json();
        console.log(data, 'NDJ KASjndas')
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
            };

            return addyData;
        }
    },
};