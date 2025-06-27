import { LANG_EN, LANG_FR } from "@/constants/constants";
import { Station, StationData, StationDataList } from "@/shared/types/types";

const fetchContentfulData = async (query: string) => {
  const res = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,

    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    }
  );
  const data = res.json();
  return data;
};

export const getAllRegions = async (): Promise<Array<Station>> => {
  let query = `{
    stationCollection {
      items {
          id
          sys {
            id
          }
          }
        }
      }`;
  const res = await fetchContentfulData(query);
  const regions: Station[] = res.data.stationCollection.items || [];

  // Si vous attendez une seule page, vous pouvez simplement retourner la première
  // page de la liste ou null si la liste est vide
  return regions;
};

export const getStationData = async (
  stationID: string
): Promise<StationData> => {
  const frQuery = `
    {
      station(id: "${stationID}") {
        id
        backgroundRadient
        primaryColor
        secondaryColor
        lottieMap
        producersCollection(limit: 20, locale: "${LANG_FR}") {
          limit
          items {
            ... on Producer {
              id
              title1
              title2
              y
              x
              picture {
                url
              }
              miniMap {
                url
              }
              description {
                json
              }
              hasSpace
              productsCollection(limit: 4, locale: "${LANG_FR}") {
                limit
                items {
                  ... on Product {
                    id
                    picture {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const enQuery = `
    {
     station(id: "${stationID}") {
        id
        backgroundRadient
        primaryColor
        secondaryColor
        lottieMap
        producersCollection(limit: 20, locale: "${LANG_EN}") {
          limit
          items {
            ... on Producer {
              id
              title1
              title2
              y
              x
              picture {
                url
              }
              miniMap {
                url
              }
              description {
                json
              }
              hasSpace
              productsCollection(limit: 4, locale: "${LANG_EN}") {
                limit
                items {
                  ... on Product {
                    id
                    picture {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const [frResponse, enResponse] = await Promise.all([
    fetchContentfulData(frQuery),
    fetchContentfulData(enQuery),
  ]);

  return { fr: frResponse.data.station, en: enResponse.data.station };
};

// export const getAllRegionsLangs = async (regionID: string): Promise<StationData> => {
//   let query = `{
//       fr: stationCollection( where: {id: "${regionID}"}, locale: "${LANG_FR}") {
//         items {
//             id
//             backgroundRadient
//             primaryColor
//             secondaryColor
//             lottieMap
//             producersCollection(limit: 5) {
//               limit
//               items {
//                 ... on Producer {
//                   id
//                   title1
//                   title2
//                   y
//                   x
//                   picture{
//                     url
//                   }
//                   miniMap{
//                     url
//                   }
//                   description {
//                     json
//                   }
//                   productsCollection(limit: 3) {
//                                   limit
//                     items {
//                       ... on Product {
//                         id
//                         picture{
//                           url
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//       }
//       en: stationCollection(where: {id: "${regionID}"}, locale: "${LANG_EN}") {
//         items {
//             id
//             backgroundRadient
//             primaryColor
//             secondaryColor
//             lottieMap
//             producersCollection(limit: 4) {
//                       limit
//               items {
//                 ... on Producer {
//                   id
//                   title1
//                   title2
//                   y
//                   x
//                   picture{
//                     url
//                   }
//                   miniMap{
//                     url
//                   }
//                   description {
//                     json
//                   }
//                   productsCollection(limit: 3) {
//                                   limit
//                     items {
//                       ... on Product {
//                         id
//                         picture{
//                           url
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//       }
// }`;

//   const res = await fetchContentfulData(query);

//  return {
//     fr: res.data.fr.items[0] || undefined,
//     en: res.data.en.items[0] || undefined
//   };
// };
