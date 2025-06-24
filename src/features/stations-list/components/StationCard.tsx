import Link from "next/link";
import { Station } from "@/shared/types";

interface StationCardProps {
  station: Station;
}

export default function StationCard({ station }: StationCardProps) {
  return (
    <Link href={`/fr/${station.region}/${station.id}`}>
      <div className="bg-white rounded-lg p-6 cursor-pointer border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {station.name}
        </h3>
        <p className="text-gray-600">Région : {station.region}</p>
      </div>
    </Link>
  );
}
