"use client";
import { useState } from "react";
import WriteEditComponent from "@/app/_components/WriteEdit";

export default function Edit() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  return (
    <WriteEditComponent
      title={title}
      contents={contents}
      thumbnail={thumbnail}
    />
  );
}
