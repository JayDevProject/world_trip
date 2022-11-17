const contents = document.querySelectorAll(".contents");

contents.forEach((i) => {
  // img 배경 색 랜덤으로 변경
  const img = i.firstChild.querySelector(".img");

  const red = Math.round(Math.random() * 255);
  const green = Math.round(Math.random() * 255);
  const blue = Math.round(Math.random() * 255);

  img.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, 0.5)`;

  // 마우스 클릭 후 뗐을 때 배경 애니메이션
  i.addEventListener("mouseup", () => {
    i.animate(
      [
        {
          backgroundColor: "rgba(141, 141, 141, 0.5)",
          border: "1px solid white",
        },
        {
          backgroundColor: "rgba(141, 141, 141, 0)",
          border: "1px solid rgba(22, 22, 22, 0.5",
        },
      ],
      500
    );
  });
});
