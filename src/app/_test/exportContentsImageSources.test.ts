import { exportContentsImageSources } from "../_utils/exportContentsImageSrc";

describe("exportContentsImageSourcesTest", () => {
  it("img 태그에서 src만 추출할 수 있다.", () => {
    const testText =
      '<p>ㅎㅇㅎㅇ</p><p><img src="https://res.cloudinary.com/dk3gzyoal/image/upload/v1711605494/icon_down-arrow_ljxmd2.png"></p><p>ㅋ</p>';
    const result = exportContentsImageSources(testText);

    expect(result).toEqual([
      "https://res.cloudinary.com/dk3gzyoal/image/upload/v1711605494/icon_down-arrow_ljxmd2.png",
    ]);
  });

  it("img 태그가 없을 땐 빈 배열을 return한다.", () => {
    const testText = "<p>test</p>";
    const result = exportContentsImageSources(testText);

    expect(result).toEqual([]);
  });
});
