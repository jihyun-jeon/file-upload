export function getFiles(
  fileList: FileList | DataTransferItemList | null,
  config?: string
) {
  if (!fileList) {
    return [];
  }

  let filteredFileList2;
  if (isDataTransferItemList(fileList)) {
    // 1. file인거만 거름, isDataTransferItem에는 드래그앤 드롭 할 수 있는게, link나 text등 별게 다들어갈 수 있어서
    const items = Array.from(fileList).filter((item) => item.kind === "file");
    const fiilteredFileList = items
      .map((item) => item.getAsFile()) // 2. file로 뽑아냄
      .filter((item) => item) as File[];
    filteredFileList2 = Array.from(fiilteredFileList);
  } else {
    filteredFileList2 = Array.from(fileList);
  }

  // 3. config 형식에 맞는 것만 추출
  if (config) {
    // accept타입에 맞지 않은 것은 뺴줌 // config : "application/zip,video/*"
    const configList = config.split(","); // [application/zip , video/*]

    const filteredTest = filteredFileList2.filter((item) => {
      const target = item.type.split("/"); // [application , zip] , [video , mp4]

      const findIdx = configList.findIndex((con) => con.includes(target[0]));

      if (findIdx < 0) return false;

      const second = configList[findIdx].split("/")[1];
      if (second === target[1]) {
        return true;
      }

      if (second === "*") {
        return true;
      }

      return false;
    });

    console.log("filteredTest", filteredTest);

    return filteredTest;
  }

  return filteredFileList2;
}

// 커스텀 타입 가드
function isDataTransferItemList(obj: any): obj is DataTransferItemList {
  return obj.add;
}

/*
if (isNumber(a)) {
  a;
}
// 커스텀 타입 가드
// a is Number로 인해 위에서 a를 자동으로 숫자로 인식함
// false면 number가 아닌 다른 나머지 타입으로 인식됨
function isNumber(a: any): a is number {
  return typeof a === "number";
}
*/
