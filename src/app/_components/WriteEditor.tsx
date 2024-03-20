import "@toast-ui/editor/dist/toastui-editor.css";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import dynamic from "next/dynamic";
import { IParams } from "../types/params.types";

const Editor = dynamic(() => import("./WriteEdit"), { ssr: false });

export default function NoSSRWriteEdit({ params }: IParams) {
  return <Editor params={params} />;
}
