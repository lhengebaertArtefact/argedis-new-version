"use client";

import Link from "next/link";
import { Station } from "@/shared/types";
import { useTranslation } from "react-i18next";

interface StationCardProps {
  station: Station;
}

export default function StationCard({ station }: StationCardProps) {
  const { t } = useTranslation();

  return (
    <Link href={`/fr/${station.region}/${station.id}`}>
      <div className="bg-white rounded-lg p-6 cursor-pointer border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {station.name}
        </h3>
        <p className="text-gray-600">
          {t("stations.region", { region: station.region })}
        </p>
      </div>
    </Link>
  );
}
