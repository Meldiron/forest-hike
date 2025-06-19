async function openDifficultyScene() {
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

  const responseIndex = await scene.prompt("Easy", "Medium", "Hard", "Go back");

  switch (responseIndex) {
    case 0:
      openGameScene("easy");
      break;
    case 1:
      openGameScene("medium");
      break;
    case 2:
      openGameScene("hard");
      break;
    case 3:
      openMenuScene();
      break;
  }
}
