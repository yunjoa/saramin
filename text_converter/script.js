function convertText() {
  var input = document.getElementById("inputText").value;

  // 선택된 라디오 버튼 값 가져오기
  var conversionType = document.querySelector(
    'input[name="conversionType"]:checked'
  ).value;

  var output = "";
  
  // 빈 줄 제거 함수
  function removeEmptyLines(text) {
    return text.replace(/^"|"\s*$/gm, "")
               .split("\n")
               .filter(line => line.trim() !== "")
               .join("\n");
  }

  if (conversionType === "oddEven") {
    var lines = input.split("\n");
    for (var i = 0; i < lines.length; i += 2) {
      output += "ㆍ" + lines[i] + (lines[i + 1] ? " : " + lines[i + 1] : "") + "\n";
    }
  } else if (conversionType === "prependBullet") {
    input = removeEmptyLines(input);
    var lines = input.split("\n");
    for (var i = 0; i < lines.length; i++) {
      output += "ㆍ" + lines[i] + "\n";
    }
  } else if (conversionType === "removeEmptyLines") {
    output = removeEmptyLines(input);
  } else if (conversionType === "removeNumberedLines") {
    input = removeEmptyLines(input);
    var lines = input.split("\n");
    for (var i = 0; i < lines.length; i++) {
      lines[i] = lines[i].replace(/^"\s*|\s*"$/g, "");
      lines[i] = lines[i].replace(/^\s*\d+\)?\.\s*/g, "ㆍ");
      lines[i] = lines[i].replace(/^[①②③④⑤⑥⑦⑧⑨⑩]+/g, "ㆍ");
      output += lines[i] + "\n";
    }
  } else if (conversionType === "td_style_copy") {
    var table = document.createElement('table');
    table.innerHTML = input;

    var firstRowCells = table.querySelectorAll("tr:first-child td");
    var columnStyles = Array.from(firstRowCells).map(cell => {
      return {
        style: cell.getAttribute("style"),
        align: cell.getAttribute("align"),
        bgcolor: cell.getAttribute("bgcolor")
      };
    });

    var rows = table.querySelectorAll("tr");
    rows.forEach(row => {
      var cells = row.querySelectorAll("td");
      cells.forEach((cell, colIndex) => {
        cell.removeAttribute("style");
        cell.removeAttribute("align");
        cell.removeAttribute("bgcolor");
        
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

    output = table.innerHTML.replace(/<tbody.*?>|<\/tbody>/g, "");
  }

  document.getElementById("outputText").innerText = output;
}

function copyText() {
  var text = document.getElementById("outputText").innerText;
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
