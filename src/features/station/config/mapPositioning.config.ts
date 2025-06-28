export interface MapPosition {
  top: string;
  left: string;
}

// Configuration of mini-map positions by region and map type
export const regionConfigs: { [key: string]: any } = {
  bretagne: {
    // Cutted map (partial view of Bretagne)
    cutted: {
      position: { top: "-20px", left: "45px" },
      stations: [
        "broceliande",
        "grassinieres",
        "pommeniac",
        "varadespaysdancenis",
        "vertougrassiniere",
        "mondevert",
      ],
    },
    // Full map (complete view of Bretagne)
    full: {
      position: { top: "-15px", left: "-30px" },
      stations: ["lepaysderennes", "lemontstmichel"],
    },
    // Fallback for other Bretagne stations
    default: { top: "-45px", left: "0px" },
  },
  est: {
    // Left cutted map
    left: {
      position: { top: "0px", left: "0px" }, // To adjust
      stations: ["laportedalsacenord"],
    },
    // Right cutted map
    right: {
      position: { top: "0px", left: "0px" }, // To adjust
      stations: ["ardenneswoinic", "reimschampagnenord", "reimschampagnesud"],
    },
    // Center placed map
    center: {
      position: { top: "0px", left: "0px" }, // To adjust
      stations: ["lobrion", "lorrainelesrappes"],
    },
    // Fallback for other Est stations
    default: { top: "5px", left: "-15px" },
  },
};

// Configuration of scales by region and map type
export const regionScales: { [key: string]: any } = {
  bretagne: {
    // Cutted map (smaller scale because less visible)
    cutted: {
      scale: 0.41,
      stations: [
        "broceliande",
        "grassinieres",
        "pommeniac",
        "varadespaysdancenis",
        "vertougrassiniere",
        "mondevert",
      ],
    },
    // Full map (moderate scale)
    full: {
      scale: 0.55,
      stations: ["lepaysderennes", "lemontstmichel"],
    },
    // Fallback for other Bretagne stations
    default: 0.63,
  },
  est: {
    // Left cutted map
    left: {
      scale: 0.63, // To adjust
      stations: ["laportedalsacenord"],
    },
    // Right cutted map
    right: {
      scale: 0.63, // To adjust
      stations: ["ardenneswoinic", "reimschampagnenord", "reimschampagnesud"],
    },
    // Center placed map
    center: {
      scale: 0.63, // To adjust
      stations: ["lobrion", "lorrainelesrappes"],
    },
    // Fallback for other Est stations
    default: 0.63,
  },
};

// Base positions for regions
export const basePositions: { [key: string]: MapPosition } = {
  auvergne: { top: "5px", left: "-15px" },
  bourgogne: { top: "-45px", left: "0px" },
  default: { top: "5px", left: "-15px" },
};

// Base scales for regions
export const baseScales: { [key: string]: number } = {
  auvergne: 0.63,
  bourgogne: 0.63,
  default: 0.63,
};

// Helper functions
export const getMiniMapPosition = (stationId: string): MapPosition => {
  const stationIdLower = stationId.toLowerCase();

  if (stationIdLower.includes("auvergne")) {
    return basePositions.auvergne;
  } else if (stationIdLower.includes("bourgogne")) {
    return basePositions.bourgogne;
  } else if (stationIdLower.includes("bretagne")) {
    const bretagneConfig = regionConfigs.bretagne;

    // Check cutted map stations first
    if (
      bretagneConfig.cutted.stations.some((station: string) =>
        stationIdLower.includes(station)
      )
    ) {
      return bretagneConfig.cutted.position;
    }
    // Then check full map stations
    else if (
      bretagneConfig.full.stations.some((station: string) =>
        stationIdLower.includes(station)
      )
    ) {
      return bretagneConfig.full.position;
    }
    // Otherwise use Bretagne fallback
    return bretagneConfig.default;
  } else if (stationIdLower.includes("est")) {
    const estConfig = regionConfigs.est;

    // Check different types of Est maps
    if (
      estConfig.left.stations.some((station: string) =>
        stationIdLower.includes(station)
      )
    ) {
      return estConfig.left.position;
    } else if (
      estConfig.right.stations.some((station: string) =>
        stationIdLower.includes(station)
      )
    ) {
      return estConfig.right.position;
    } else if (
      estConfig.center.stations.some((station: string) =>
        stationIdLower.includes(station)
      )
    ) {
      return estConfig.center.position;
    }
    // Otherwise use Est fallback
    return estConfig.default;
  }

  return basePositions.default;
};

export const getRegionScale = (stationId: string): number => {
  const stationIdLower = stationId.toLowerCase();

  if (stationIdLower.includes("auvergne")) {
    return baseScales.auvergne;
  } else if (stationIdLower.includes("bourgogne")) {
    return baseScales.bourgogne;
  } else if (stationIdLower.includes("bretagne")) {
    const bretagneScale = regionScales.bretagne;

    // Check cutted map stations first
    if (
      bretagneScale.cutted.stations.some((station: string) =>
        stationIdLower.includes(station)
      )
    ) {
      return bretagneScale.cutted.scale;
    }
    // Then check full map stations
    else if (
      bretagneScale.full.stations.some((station: string) =>
        stationIdLower.includes(station)
      )
    ) {
      return bretagneScale.full.scale;
    }
    // Otherwise use Bretagne fallback
    return bretagneScale.default;
  } else if (stationIdLower.includes("est")) {
    const estScale = regionScales.est;

    // Check different types of Est maps
    if (
      estScale.left.stations.some((station: string) =>
        stationIdLower.includes(station)
      )
    ) {
      return estScale.left.scale;
    } else if (
      estScale.right.stations.some((station: string) =>
        stationIdLower.includes(station)
      )
    ) {
      return estScale.right.scale;
    } else if (
      estScale.center.stations.some((station: string) =>
        stationIdLower.includes(station)
      )
    ) {
      return estScale.center.scale;
    }
    // Otherwise use Est fallback
    return estScale.default;
  }

  return baseScales.default;
};
