function generateRandomPath(
  width,
  height,
  minLength,
  maxLength,
  checkpointGap,
) {
  const corners = [
    { x: 0, y: 0 }, // Top-left
    { x: width - 1, y: 0 }, // Top-right
    { x: 0, y: height - 1 }, // Bottom-left
    { x: width - 1, y: height - 1 }, // Bottom-right
  ];

  // Pick two random corners
  const startIndex = Math.floor(Math.random() * corners.length);
  let endIndex = Math.floor(Math.random() * corners.length);

  // Ensure start and end are different corners
  while (endIndex === startIndex) {
    endIndex = Math.floor(Math.random() * corners.length);
  }

  const start = corners[startIndex];
  const end = corners[endIndex];

  let path = [{ x: start.x, y: start.y, type: "r" }];

  let currentX = start.x;
  let currentY = start.y;

  let endX = end.x;
  let endY = end.y;

  let gap = 0;
  let isStart = true;

  while (currentX !== endX || currentY !== endY) {
    const nextPos = [
      { x: currentX, y: currentY + 1 }, // Down
      { x: currentX + 1, y: currentY }, // Right
      { x: currentX, y: currentY - 1 }, // Up
      { x: currentX - 1, y: currentY }, // Left
    ].filter((pos) => {
      const pathIncludesPos = path.some(
        (pos2) => pos.x === pos2.x && pos.y === pos2.y,
      );

      if (pathIncludesPos) {
        return false;
      }

      if (pos.x < 0 || pos.x >= width || pos.y < 0 || pos.y >= height) {
        return false;
      }

      const neighbours = [
        { x: pos.x + 1, y: pos.y },
        { x: pos.x - 1, y: pos.y },
        { x: pos.x, y: pos.y + 1 },
        { x: pos.x, y: pos.y - 1 },
      ];

      const neighboursCount = neighbours.filter((neighbour) => {
        const neighbourAlreadyExists = path.some(
          (pos2) => neighbour.x === pos2.x && neighbour.y === pos2.y,
        );

        if (neighbourAlreadyExists) {
          return true;
        }

        return false;
      }).length;

      if (neighboursCount > 1) {
        return false;
      }

      // TODO: Make sure path to end position exists

      return true;
    });

    if (nextPos.length === 0) {
      return null;
    }

    const newPos = nextPos[Math.floor(Math.random() * nextPos.length)];
    currentX = newPos.x;
    currentY = newPos.y;

    let isCheckpoint = false;
    if (isStart) {
      if (gap >= 2) {
        isCheckpoint = true;
      }
    } else {
      if (gap >= checkpointGap) {
        isCheckpoint = true;
      }
    }

    let isEnd = currentX === endX && currentY === endY;
    if (path.length >= maxLength) {
      isEnd = true;
      endX = currentX;
      endY = currentY;
    }
    if (isEnd) {
      isCheckpoint = true;
    }

    let type = "r";
    if (isCheckpoint) {
      if (isStart) {
        type = "s";
        isStart = false;
      } else if (isEnd) {
        type = "f";
      } else {
        type = "c";
      }
    }

    path.push({ x: currentX, y: currentY, type });
    gap++;

    if (isCheckpoint) {
      gap = 0;
    }
  }

  if (path.length < minLength) {
    return null;
  }

  path = path.map((pos, index) => {
    const isNearEnd = index >= path.length - 5;
    if (isNearEnd && (pos.type === "c" || pos.type === "s")) {
      pos.type = "r";
    }
    return pos;
  });

  return { path, start, end };
}

function convertPathToMap(path, size) {
  let levelSchema = [];
  for (const pos of path) {
    const { x, y, type } = pos;
    levelSchema[x + y * size] = type;
  }

  for (let i = 0; i < size * size; i++) {
    levelSchema[i] = levelSchema[i] || ".";
  }

  const chunked = [];
  for (let i = 0; i < levelSchema.length; i += size) {
    chunked.push(levelSchema.slice(i, i + size).join(""));
  }

  return chunked.join("\n");
}
