export interface ExistenceMap {
  [key: string]: boolean;
}

export enum EndingVowel {
  A,
  I,
  E,
  O,
}

export enum Group {
  Ichidan = "ichidan",
  Godan = "godan",
  Irregular = "irregular",
}

export interface Verb {
  wanikaniLevel: number;
  reading: string;
  jlpt: string[];
  senses: {
    definitions: string[];
    tags: string[];
  };
  slug: string;
  group: Group;
}

export enum Inflection {
  NonPast = "NonPast",
  NonPastPolite = "NonPastPolite",
  Past = "Past",
  PastPolite = "PastPolite",
  Te = "Te",
  Continuous = "Continuous",
  Potential = "Potential",
  Passive = "Passive",
  Causative = "Causative",
  CausativePassive = "CaustivePassive",
  Imperative = "Imperative",
}
