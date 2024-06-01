export function toI(character: string) {
  switch (character) {
    case `う`:
      return `い`;
    case `く`:
      return `き`;
    case `す`:
      return `し`;
    case `つ`:
      return `ち`;
    case `ぬ`:
      return `に`;
    case `ぶ`:
      return `び`;
    case `む`:
      return `み`;
    case `る`:
      return `り`;
    case `ぐ`:
      return `ぎ`;
    default:
      throw new Error("provided an unknown character!");
  }
}

/**
 * returns the 'a' syllable version of a character
 *
 * @param character string
 * @returns
 */
export function toA(character: string): string {
  switch (character) {
    case `う`:
      return `わ`;
    case `く`:
      return `か`;
    case `す`:
      return `さ`;
    case `つ`:
      return `た`;
    case `ぬ`:
      return `な`;
    case `ぶ`:
      return `ば`;
    case `む`:
      return `ま`;
    case `る`:
      return `ら`;
    case `ぐ`:
      return `が`;
    default:
      throw new Error("provided an unknown character!");
  }
}

/**
 * returns the 'e' syllable version of a character
 *
 * @param character string
 * @returns
 */
export function toE(character: string): string {
  switch (character) {
    case `う`:
      return `え`;
    case `く`:
      return `け`;
    case `す`:
      return `せ`;
    case `つ`:
      return `て`;
    case `ぬ`:
      return `ね`;
    case `ぶ`:
      return `べ`;
    case `む`:
      return `め`;
    case `る`:
      return `れ`;
    case `ぐ`:
      return `げ`;
    default:
      throw new Error("provided an unknown character!");
  }
}
