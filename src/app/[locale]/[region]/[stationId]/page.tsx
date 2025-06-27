import { getStationData } from "@/core/api/contentful";
import AppContainer from "@/core/components/AppContainer/AppContainer";
import StationLayout from "@/features/station/components/StationLayout/StationLayout";
import { notFound } from "next/navigation";

interface StationPageProps {
  params: Promise<{
    locale: string;
    region: string;
    stationId: string;
  }>;
}

export default async function StationPage({ params }: StationPageProps) {
  const { locale, stationId } = await params;

  try {
    const contentfulStation = await getStationData(stationId, locale);

    if (!contentfulStation) {
      notFound();
    }

    // Adapter les données pour correspondre à l'interface attendue
    const adaptedStation = {
      id: contentfulStation.id,
      name: contentfulStation.id,
      region: stationId,
      backgroundRadient: contentfulStation.backgroundRadient,
      primaryColor: contentfulStation.primaryColor,
      secondaryColor: contentfulStation.secondaryColor,
      lottieMap: contentfulStation.lottieMap,
    };

    const adaptedProducers =
      contentfulStation.producersCollection?.items.map((producer) => ({
        id: producer.id,
        name: `${producer.title1} ${producer.title2}`,
        description: JSON.stringify(producer.description?.json || {}),
        stationId: contentfulStation.id,
        mapPosition: { x: producer.x, y: producer.y },
        blobPosition: { x: producer.x, y: producer.y },
        picture: producer.picture,
        products:
          producer.productsCollection?.items.map((product) => ({
            id: product.id,
            name: product.id,
            description: "",
            producerId: producer.id,
            picture: product.picture,
          })) || [],
      })) || [];

    return (
      <AppContainer>
        <StationLayout station={adaptedStation} producers={adaptedProducers} />
      </AppContainer>
    );
  } catch (error) {
    console.error("Error loading station:", error);
    notFound();
  }
}
