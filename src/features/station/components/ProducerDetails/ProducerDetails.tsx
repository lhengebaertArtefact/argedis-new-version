import { Producer } from "../../types";

interface ProducerDetailsProps {
  producer: Producer;
}

export default function ProducerDetails({ producer }: ProducerDetailsProps) {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        {/* Photo  */}
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-2xl font-bold text-gray-600">
            {producer.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)}
          </span>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {producer.name}
          </h2>
        </div>
      </div>
      <div className="flex-1">
        <p className="text-gray-700 leading-relaxed">{producer.description}</p>
      </div>
    </div>
  );
}
