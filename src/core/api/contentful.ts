import { Station, StationData } from "@/shared/types/types";

const fetchContentfulData = async (query: string) => {
  console.log("Fetching from Contentful with query:", query);
  console.log("Space ID:", process.env.CONTENTFUL_SPACE_ID);
  console.log(
    "Access Token:",
    process.env.CONTENTFUL_ACCESS_TOKEN ? "Present" : "Missing"
  );

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

  console.log("Response status:", res.status);
  const data = await res.json();
  console.log("Response data:", data);
  return data;
};

export const getAllStations = async (
  locale: string = "fr"
): Promise<Array<Station>> => {
  const query = `{
    stationCollection(locale: "${locale}") {
      items {
        id
        sys {
          id
        }
        backgroundRadient
        primaryColor
        secondaryColor
      }
    }
  }`;

  const res = await fetchContentfulData(query);
  console.log(
    "All stations from Contentful:",
    JSON.stringify(res.data.stationCollection.items.slice(0, 3), null, 2)
  );
  const stations: Station[] = res.data.stationCollection.items || [];
  return stations;
};

export const getStationData = async (
  stationID: string,
  locale: string = "fr"
): Promise<Station> => {
  const query = `{
    station(id: "${stationID}", locale: "${locale}") {
      id
      backgroundRadient
      primaryColor
      secondaryColor
      lottieMap
      producersCollection(limit: 20) {
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
            productsCollection(limit: 4) {
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
  }`;

  const res = await fetchContentfulData(query);

  if (!res.data || !res.data.station) {
    throw new Error(`Station not found: ${stationID}`);
  }

  return res.data.station;
};
