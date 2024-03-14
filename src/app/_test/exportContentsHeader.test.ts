import { exportContentsHeader } from "../_utils/exportContentsHeader";

describe("exportContentsHeaderTest", () => {
  it("h1~h4 태그만 포함된 배열을 추출할 수 있다.", () => {
    const testText =
      "<h1>설기</h1><h2>배포 테스트</h2><p>설기로 배포 테스트</p><h1>제발!!!</h1>";
    const result = exportContentsHeader(testText);

    expect(result).toEqual([
      { tag: "1", content: "설기" },
      { tag: "2", content: "배포 테스트" },
      { tag: "1", content: "제발!!!" },
    ]);
  });

  it("h1~h4 태그가 없을 땐 빈 배열을 return한다.", () => {
    const testText = "<p>test</p>";
    const result = exportContentsHeader(testText);

    expect(result).toEqual([]);
  });
});
