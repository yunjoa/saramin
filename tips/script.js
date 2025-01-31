$(document).ready(function () {
  $(".copy").on("click", function () {
    var $content = $(this).clone(); //
    $content.find("button").remove();
    var htmlString = $content.html();
    console.log(htmlString);
    var $temp = $("<textarea>");
    $("body").append($temp);
    $temp.val(htmlString).select();
    document.execCommand("copy");
    $temp.remove();
    alert("데이터가 복사되었습니다.");
  });
});
