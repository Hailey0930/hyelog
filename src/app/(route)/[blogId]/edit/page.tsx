"use client";
import WriteEditComponent from "@/app/_components/WriteEdit";
import { IParams } from "@/app/types/params.types";

export default function Edit({ params }: IParams) {
  return <WriteEditComponent params={params} />;
}
