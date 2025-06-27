import { Station } from "@/shared/types/types";
import RegionMap from "../../components/RegionMap";
import { getAllRegions, getStationData } from "@/api/contentful";

export async function generateStaticParams() {
  const regions: any = await getAllRegions();
  const staticParams: any[] = [];

  for (const region of regions) {
    staticParams.push([
      {
        region: region.sys.id,
      },
    ]);
  }

  return staticParams.flat();
}

export default async function Region({
  params,
}: {
  params: { region: string };
}) {
  const regionID = params.region;
  const region = await getStationData(regionID);

  const frRegion: Station | undefined = region.fr;
  const enRegion: Station | undefined = region.en;

  if (!frRegion || !enRegion) {
    return null;
  }

  return (
    <div className="relative overflow-hidden">
      {" "}
      <RegionMap region={{ fr: frRegion, en: enRegion }} />
    </div>
  );
}
