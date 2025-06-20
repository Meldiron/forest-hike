async function openCelebrationScene(difficulty) {
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
    "<1>You finished one " +
      difficulty +
      " hike, good job!<1>\n\n\n<7>Press SPACE to go to play again.<7>",
  );
  openDifficultyScene();
}
