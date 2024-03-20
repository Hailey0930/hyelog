"use client";
import NoSSRWriteEdit from "@/app/_components/WriteEditor";
import { IParams } from "@/app/types/params.types";

export default function Write({ params }: IParams) {
  return <NoSSRWriteEdit params={params} />;
}
