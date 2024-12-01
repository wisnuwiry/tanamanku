"use client";

import axios from "axios";
import DropImageInput from "./components/home/DropImageInput";
import PlantTypeSelection from "./components/home/PlantTypeSelection";
import LoadingBar from "./components/LoadingBar";
import { ChangeEvent, FormEvent, useState } from "react";
import IcLoading from "./components/icons/IcLoading";
import { ResponseData, SuccessResponse } from "./types";
import PredictionResult from "./components/home/PredictionResult";

interface PlantFormData {
  plantType: string;
  image: File | null;
}

type DataState = "initial" | "loading" | "success" | "error";

export default function Home() {
  const [dataState, setDataState] = useState<DataState>("initial");
  const [data, setData] = useState<SuccessResponse | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const isFormValid = () => formData.plantType && formData.image;

  const [formData, setFormData] = useState<PlantFormData>({
    plantType: "",
    image: null,
  });

  const handlePlantTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      plantType: event.target.value,
    });
  };

  const handleImageChange = (file: File | null) => {
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setDataState("loading");

    if (!isFormValid()) {
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("plant_type", formData.plantType);
    formDataObj.append("image", formData.image!);
    formDataObj.append("show_image", "true");

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/api/v1/predict",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const responseData: ResponseData | undefined = response?.data;

      if (!responseData) return;

      if (responseData.detail.status === "success") {
        if (responseData.detail.predictions.length > 0) {
          setDataState("success");
          setData(responseData.detail);
        } else {
          setDataState("error");
          setError(
            "The image cannot be detected, please change the image or plant type"
          );
        }
      } else {
        setError(responseData.detail.error_message);
        setDataState("error");
      }
    } catch (e) {
      setError(e?.toString());
      setDataState("error");
    }
  };

  return (
    <div className="py-10">
      <div className="flex flex-col py-6 px-4 mx-2 sm:px-6 lg:px-8 bg-white rounded-lg border border-neutral-150 dark:bg-neutral-900 dark:border-gray-800">
        <h2 className="mb-4 font-semibold text-xl">Start scan your plants</h2>

        <form onSubmit={handleSubmit}>
          <DropImageInput id="image" onChange={handleImageChange} />
          <PlantTypeSelection
            id="plant_type"
            onChange={handlePlantTypeChange}
          />
          <div className="flex w-full justify-end mt-4 border-t border-neutral-150 pt-6 dark:border-gray-800">
            <button
              type="submit"
              disabled={dataState === "loading" || !isFormValid()}
              className={
                isFormValid()
                  ? "text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-8 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                  : "text-white bg-green-300 dark:bg-green-500/20 cursor-not-allowed font-medium rounded-lg text-sm px-8 py-2.5 me-2 mb-2 text-center"
              }
            >
              {dataState === "loading" && <IcLoading />}
              Start
            </button>
          </div>
        </form>
      </div>

      {dataState !== "initial" && (
        <div className="flex flex-col py-6 px-4 mx-2  my-8 sm:px-6 lg:px-8 bg-white rounded-lg border border-neutral-150 dark:bg-neutral-900 dark:border-gray-800">
          {dataState === "loading" && <LoadingBar />}
          {dataState === "error" && <p>{error}</p>}
          {dataState === "success" && (
            <PredictionResult
              image={data?.image}
              predictions={data?.predictions ?? []}
            />
          )}
        </div>
      )}
    </div>
  );
}
