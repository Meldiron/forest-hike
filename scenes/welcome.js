async function openWelcomeScene() {
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
    `<1>Forest Hike<1>\n<3>(memory minigame)<3>\n\n\nStay on the trail!\n\n\n<7>Press SPACE to start<7>`,
  );

  openMenuScene();
}
