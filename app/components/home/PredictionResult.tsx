import { SuccessResponse } from "@/app/types";
import Accordion from "../Accordion";

type PredictionResultProps = Pick<SuccessResponse, "image"> &
  Pick<SuccessResponse, "predictions">;

export default function PredictionResult({
  image,
  predictions,
}: PredictionResultProps) {
  return (
    <>
      <h2 className="mb-4 font-semibold text-xl">Result</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          {image && (
            <img
              src={`data:image/png;base64,${image}`}
              className="w-full object-contain rounded-lg"
            />
          )}
        </div>
        <div className="flex-1">
          {predictions.map((e, i) => (
            <Accordion
              key={i}
              title={e.class_label}
              body={e.solution}
              autoOpen={predictions.length === 1}
            />
          ))}
        </div>
      </div>
    </>
  );
}
