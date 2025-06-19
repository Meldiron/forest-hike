async function openSettingsScene() {
  const scene = odyc.createGame({
    dialogBackground: "#222529",
    dialogColor: "#fff",
    dialogBorder: "#fff",

    background: "#222529",

    messageBackground: "#222529",
    messageColor: "#fff",

    dialogInternvalMs: 15,

    colors: gameConfig.colors,
    player: { sprite: `` },
  });

  const dialogs = localStorage.getItem("dialogs") || "yes";

  const responseIndex = await scene.prompt(
    dialogs === "yes" ? "Hide dialogs" : "Show dialogs",
    "Go back",
  );

  switch (responseIndex) {
    case 0:
      let msg;
      if (dialogs === "yes") {
        msg = "In-game dialogs will now be hidden.";
        localStorage.setItem("dialogs", "no");
      } else {
        msg = "In-game dialogs will now be shown.";
        localStorage.setItem("dialogs", "yes");
      }
      await scene.openDialog(msg);
      openSettingsScene();
      break;
    case 1:
      openMenuScene();
      break;
  }
}
