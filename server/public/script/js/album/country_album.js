const borderImage = document.querySelectorAll(".borderImage");

borderImage.forEach((i) =>
  i.addEventListener("click", () => {
    const fileId = i.querySelector(".fileId").value;
    const url = window.location.href;

    location.href = `${url}/${fileId}`;
  })
);
