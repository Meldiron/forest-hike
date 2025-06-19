async function openStatsScene() {
  const easy = +(localStorage.getItem("easy") || "0");
  const medium = +(localStorage.getItem("medium") || "0");
  const hard = +(localStorage.getItem("hard") || "0");

  const scene = odyc.createGame({
    dialogBackground: "#222529",
    dialogColor: "#fff",
    dialogBorder: "#fff",

    background: "#222529",

    messageBackground: "#222529",
    messageColor: "#fff",

    colors: gameConfig.colors,
    player: { sprite: `` },
  });

  await scene.openMessage(
    `<1>Statistics<1>\n\n<3>Levels completed<3>\n${easy} Easy\n${medium} Medium\n${hard} Hard\n\n\n<7>Press SPACE to go back<7>`,
  );

  openMenuScene();
}
