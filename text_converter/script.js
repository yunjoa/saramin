function convertText() {
  var input = document.getElementById("inputText").value;

  // 선택된 라디오 버튼 값 가져오기
  var conversionType = document.querySelector(
    'input[name="conversionType"]:checked'
  ).value;

  var output = "";
  if (conversionType === "oddEven") {
    var lines = input.split("\n");
    for (var i = 0; i < lines.length; i += 2) {
      output +=
        "ㆍ" + lines[i] + (lines[i + 1] ? " : " + lines[i + 1] : "") + "\n";
    }
  } else if (conversionType === "prependBullet") {
    input = input.replace(/^"|"\s*$/gm, "");
    var lines = input.split("\n");
    for (var i = 0; i < lines.length; i++) {
      output += "ㆍ" + lines[i] + "\n";
    }
  } else if (conversionType === "removeEmptyLines") {
    input = input.replace(/^"|"\s*$/gm, "");
    var lines = input.split("\n");
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].trim() !== "") {
        output += lines[i] + "\n";
      }
    }
  } else if (conversionType === "removeNumberedLines") {
    var lines = input.split("\n");
    for (var i = 0; i < lines.length; i++) {
      lines[i] = lines[i].replace(/^"\s*|\s*"$/g, "");
      lines[i] = lines[i].replace(/^\s*\d+\)?\.?\s*/g, "ㆍ");
      lines[i] = lines[i].replace(/^[①②③④⑤⑥⑦⑧⑨⑩]+/g, "ㆍ");
      output += lines[i] + "\n";
    }
  } else if (conversionType === "td_style_copy") {
    // HTML 테이블로 변환
    var table = document.createElement('table');
    table.innerHTML = input;

    // 첫 번째 tr의 td 스타일 및 속성들을 가져오기
    var firstRowCells = table.querySelectorAll("tr:first-child td");
    var columnStyles = Array.from(firstRowCells).map(cell => {
      // 각 td의 style, align, bgcolor 속성 값을 객체로 저장
      return {
        style: cell.getAttribute("style"),
        align: cell.getAttribute("align"),
        bgcolor: cell.getAttribute("bgcolor")
      };
    });

    // 첫 번째 tr 이후의 td들에 스타일 및 속성 적용
    var rows = table.querySelectorAll("tr");
    rows.forEach(row => {
      var cells = row.querySelectorAll("td");
      cells.forEach((cell, colIndex) => {
        // 기존 스타일과 속성을 제거하고 새로운 스타일과 속성 적용
        cell.removeAttribute("style"); // 기존 스타일 제거
        cell.removeAttribute("align"); // 기존 align 제거
        cell.removeAttribute("bgcolor"); // 기존 bgcolor 제거

        // 새 스타일, align, bgcolor 속성 적용
        if (columnStyles[colIndex].style) {
          cell.setAttribute("style", columnStyles[colIndex].style);
        }
        if (columnStyles[colIndex].align) {
          cell.setAttribute("align", columnStyles[colIndex].align);
        }
        if (columnStyles[colIndex].bgcolor) {
          cell.setAttribute("bgcolor", columnStyles[colIndex].bgcolor);
        }
      });
    });

    // <tbody> 제거
    output = table.innerHTML.replace(/<tbody.*?>|<\/tbody>/g, "");
  }

  document.getElementById("outputText").innerText = output;
}

function copyText() {
  // 출력 칸의 텍스트를 가져오기
  var text = document.getElementById("outputText").innerText;

  // 텍스트를 클립보드에 복사
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("텍스트가 복사완료!");
    })
    .catch((err) => {
      console.error("복사 실패ㅠㅠ:", err);
    });
}

document.querySelectorAll('input[name="conversionType"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    var description = this.getAttribute("data-description");
    document.getElementById("descriptionContainer").innerText = description;
  });
});
