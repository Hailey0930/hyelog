"use client";
import NoSSRWriteEdit from "@/app/_components/WriteEditor";
import { IParams } from "@/app/types/params.types";

export default function Edit({ params }: IParams) {
  return <NoSSRWriteEdit params={params} />;
}
