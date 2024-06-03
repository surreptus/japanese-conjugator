## 🔰 Japanese Conjugator

A small library to inflect Japanese verbs and adjectives. It aims to allow you provide a verb or adjective such as `食べる` and an inflecion `PolitePast` and for it to return `食べました`.

### Usage

**`inflect(word: string, inflection: Inflection, group?: Group): string`**

Takes a given word and inflects it using the Inflection provided. You can optionally provide a group to use if you want to overide / ensure the right conjugation is used, otherwise it will guess based on the ending and lookup tables.

```ts
inflect("調べる", Inflection.Te); // 調べて
inflect("語る", Inflection.Past, Group.Godan); // 語った
```

### About

I started this project as a way to learn the way in which verbs and adjectives change in each form, and get more comfortable using it in my own speech and writing.

Want to suggest an improvement or report a bug? Please [create a Github issue](https://github.com/surreptus/japanese-conjugator/issues/new) to raise it.
