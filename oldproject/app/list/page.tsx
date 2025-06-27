import { getAllRegions } from "@/api/contentful";

let prev = "";
export default async function List() {
  const regions = await getAllRegions();

  return (
    <div className="ml-[40px] mt-[40px]">
      {regions
        .sort((a, b) => a.id.localeCompare(b.id))
        .map((element: any, index: number) => {
          const e = element.id.split("-")[0];
          const newE = e !== prev;
          prev = e;
          return (
            <div key={index} className={`${newE ? "mt-[40px]" : "mt-2"}`}>
              <a href={`/${element.sys.id}`} target="_blank">
                {element.id}
              </a>
            </div>
          );
        })}
    </div>
  );
}
