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
  NonPast = "non-past",
  NonPastPolite = "non-past-polite",
  Past = "past",
  PastPolite = "past-polite",
  Te = "te",
  Potential = "potential",
  Passive = "passive",
  Causative = "causative",
  CausativePassive = "causative-passive",
  Imperative = "imperative",
}
