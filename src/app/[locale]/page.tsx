import StationList from "@/features/stations-list/components/StationList";
import { stations } from "@/features/stations-list/data/stations.data";
import AppContainer from "@/core/components/AppContainer/AppContainer";

interface HomePageProps {
  params: {
    locale: string;
  };
}

export default function HomePage({ params }: HomePageProps) {
  return (
    <AppContainer>
      <StationList stations={stations} />
    </AppContainer>
  );
}
