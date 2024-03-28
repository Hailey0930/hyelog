"use client";
import { IParams } from "@/app/types/params.types";
import dynamic from "next/dynamic";

export default function Write({ params }: IParams) {
  const NoSSRWriteComponent = dynamic(
    () => import("../../_components/WriteEdit"),
    { ssr: false }
  );

  return <NoSSRWriteComponent params={params} />;
}
