import AppContainer from "@/core/components/AppContainer/AppContainer";
import { stations } from "@/features/stations-list/data/stations.data";
import { producers } from "@/features/station/data/producers.data";
import StationLayout from "@/features/station/components/StationLayout/StationLayout";
import { notFound } from "next/navigation";

interface StationPageProps {
  params: {
    locale: string;
    region: string;
    stationId: string;
  };
}

export default function StationPage({ params }: StationPageProps) {
  const station = stations.find(
    (s) => s.id === params.stationId && s.region === params.region
  );

  if (!station) {
    notFound();
  }

  const stationProducers = producers.filter((p) => p.stationId === station.id);

  return (
    <AppContainer>
      <StationLayout station={station} producers={stationProducers} />
    </AppContainer>
  );
}
