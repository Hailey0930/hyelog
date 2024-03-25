"use client";
import WriteEditComponent from "@/app/_components/WriteEdit";
import { IParams } from "@/app/types/params.types";

export default function Write({ params }: IParams) {
  return <WriteEditComponent params={params} />;
}
