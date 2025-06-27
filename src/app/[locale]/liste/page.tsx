import { getAllStations } from "@/core/api/contentful";

interface ListePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ListePage({ params }: ListePageProps) {
  const { locale } = await params;
  const stations = await getAllStations(locale);

  let prev = "";

  return (
    <div className="ml-[40px] mt-[40px]">
      {stations
        .sort((a, b) => a.id.localeCompare(b.id))
        .map((element: any, index: number) => {
          const e = element.id.split("-")[0];
          const newE = e !== prev;
          prev = e;
          return (
            <div key={index} className={`${newE ? "mt-[40px]" : "mt-2"}`}>
              <a
                href={`/${locale}/${element.id}/${
                  element.sys?.id || element.id
                }`}
              >
                {element.id}
              </a>
            </div>
          );
        })}
    </div>
  );
}
