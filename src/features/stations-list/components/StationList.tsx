import { Station } from "@/shared/types";
import StationCard from "./StationCard";

interface StationListProps {
  stations: Station[];
}

export default function StationList({ stations }: StationListProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Stations Service Argedis
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {stations.map((station) => (
          <StationCard key={station.id} station={station} />
        ))}
      </div>
    </div>
  );
}
