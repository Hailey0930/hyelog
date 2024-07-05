"use client";
import { IParams } from "@/app/types/params.types";
import dynamic from "next/dynamic";

export default function Edit({ params }: IParams) {
  const NoSSREditComponent = dynamic(
    () => import("../../../_components/WriteEdit"),
    { ssr: false }
  );

  return <NoSSREditComponent params={params} />;
}
