"use client";

import { useState } from "react";
import { Station } from "@/shared/types";
import { Producer } from "../../types";
import ProducerDetails from "../ProducerDetails/ProducerDetails";
import ProductPanel from "../ProductPanel/ProductPanel";
import RegionMap from "../RegionMap/RegionMap";
import LanguageToggle from "@/shared/components/LanguageToggle/LanguageToggle";

interface StationLayoutProps {
  station: Station;
  producers: Producer[];
}

export default function StationLayout({
  station,
  producers,
}: StationLayoutProps) {
  const [selectedProducer, setSelectedProducer] = useState<Producer | null>(
    null
  );

  return (
    <div className="flex flex-col h-full relative">
      <LanguageToggle />

      <div className="flex-1 flex items-center justify-center p-8">
        <RegionMap
          station={station}
          producers={producers}
          selectedProducer={selectedProducer}
          onProducerSelect={setSelectedProducer}
        />
      </div>

      {selectedProducer && (
        <div className="h-80 border-t border-gray-200">
          <div className="flex h-full">
            <div className="flex-1">
              <ProducerDetails
                producer={selectedProducer}
                producers={producers}
                onProducerChange={setSelectedProducer}
              />
            </div>

            <div className="w-96 border-l border-gray-200">
              <ProductPanel producer={selectedProducer} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
