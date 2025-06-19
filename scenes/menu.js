async function openMenuScene() {
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

  const responseIndex = await scene.prompt(
    "Play game",
    "Stats",
    "Settings",
    "Cancel",
  );

  switch (responseIndex) {
    case 0: // Play game
      openDifficultyScene();
      break;
    case 1: // Stats
      openStatsScene();
      break;
    case 2: // Settings
      openSettingsScene();
      break;
    case 3: // Cancel
      openWelcomeScene();
      break;
  }
}
