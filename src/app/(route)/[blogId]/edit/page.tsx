"use client";
import { useState } from "react";
import NoSSRWriteEdit from "@/app/_components/WriteEditor";

export default function Edit() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [thumbnail, setThumbnail] = useState<File>();

  return (
    <NoSSRWriteEdit title={title} contents={contents} thumbnail={thumbnail} />
  );
}
