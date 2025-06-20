let scene;
let level;

async function openGameScene(difficulty) {
  const configurations = {
    easy: {
      minLength: 12,
      maxLength: 15,
      checkpointGap: 5,
      size: 5,
    },
    medium: {
      minLength: 25,
      maxLength: 30,
      checkpointGap: 7,
      size: 7,
    },
    hard: {
      minLength: 50,
      maxLength: 100,
      checkpointGap: 10,
      size: 10,
    },
  };
  const configuration = configurations[difficulty];

  let path;
  for (let i = 0; i < 100_000; i++) {
    path = generateRandomPath(
      configuration.size,
      configuration.size,
      configuration.minLength,
      configuration.maxLength,
      configuration.checkpointGap,
    );

    if (path) {
      break;
    }
  }

  level = {
    start: path.start,
    end: path.end,
    path: path.path,
    map: convertPathToMap(path.path, configuration.size),
    difficulty,
  };

  scene = odyc.createGame({
    screenWidth: configuration.size,
    screenHeight: configuration.size,
    cameraWidth: configuration.size,
    cameraHeight: configuration.size,
    background: "#000",
    messageColor: "#fff",
    messageBackground: "#222529",
    dialogBackground: "#222529",
    dialogColor: "#fff",
    dialogBorder: "#fff",
    dialogInternvalMs: 15,
    cellWidth: gameConfig.cellWidth,
    cellHeight: gameConfig.cellHeight,
    colors: gameConfig.colors,
    map: ``,
    templates: {
      ".": getObsticleSprite(true),
      "-": getObsticleSprite(false),
      r: getRoadSprite(true),
      R: getRoadSprite(false),
      s: getCheckpointSprite(true, 1),
      S: getCheckpointSprite(false, 1),
      c: getCheckpointSprite(true, 2),
      C: getCheckpointSprite(false, 2),
      f: getCheckpointSprite(true, 3),
      F: getCheckpointSprite(false, 3),
    },
    player: {
      position: [level.start.x, level.start.y],
      sprite: gameConfig.sprites.player,
    },
  });

  renderDayMap();
}

function renderDayMap() {
  scene.loadMap(level.map);
}

function renderNightMap() {
  scene.loadMap(
    level.map
      .split("r")
      .join("R")
      .split("s")
      .join("S")
      .split("f")
      .join("F")
      .split("c")
      .join("C")
      .split(".")
      .join("-"),
  );
}

function getObsticleSprite(visible) {
  return {
    onEnter: async () => {
      renderDayMap();
      await scene.openDialog("You missed a turn and got lost in the woods!");
      scene.player.position = [level.start.x, level.start.y];
    },
    solid: false,
    sprite: visible
      ? gameConfig.sprites.obsticle
      : gameConfig.sprites["road-dark"],
  };
}

function getRoadSprite(visible) {
  return {
    solid: false,
    sprite: visible ? gameConfig.sprites.road : gameConfig.sprites["road-dark"],
  };
}

function getCheckpointSprite(visible, step) {
  return {
    solid: false,
    onEnter: async (target) => {
      renderDayMap();

      const isFinish = step == 3;
      if (isFinish) {
        let finishes = +(localStorage.getItem(level.difficulty) || "0");
        finishes++;
        localStorage.setItem(level.difficulty, `${finishes}`);

        openCelebrationScene(level.difficulty);
        return;
      }

      const dialogs = localStorage.getItem("dialogs") || "yes";
      if (dialogs === "yes") {
        const msg =
          step === 1
            ? "It's getting dark. Remember the route!"
            : "What a nap! Let's continue the hike.";
        await scene.openDialog(msg);
      }
    },
    onLeave: () => {
      renderNightMap();
    },
    sprite: visible
      ? gameConfig.sprites.checkpoint
      : gameConfig.sprites["road-dark"],
  };
}
