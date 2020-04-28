// Copyright (c) 2020 Fernando G. Vilar
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import "./global.d";
import { Query, encode, decode } from "../index";

type TestCases = [string, Query][];

describe("exported `decode`", () => {
  it("is a function", () => {
    expect(decode).toBeFunction();
  });
  it.each([
    ["", {}],
    ["?a", { a: true }],
    ["?a=1", { a: ["1"] }],
    ["?a=1&&a=2", { a: ["1", "2"] }],
    ["?a=", { a: [""] }],
    [
      "?b&c=中国&c=Argentina&名字=王&名字=Fernando&f=peas%26carrots&f=peanut %26 jelly",
      {
        b: true,
        c: ["中国", "Argentina"],
        名字: ["王", "Fernando"],
        f: ["peas&carrots", "peanut & jelly"],
      },
    ],
    [
      `?where=名字="王"&where=age>18&where=gpa≥3.5&where=pizza="Papa John's"&where=nickname='"fingers"'&where=missed<5&where=subjects≤8&where=taking∩["English","中文","Español"]&where=member∋"Mathletes"&where=faculty∈["Law","Business"]` +
        "&order=gpa↓&order=age↑" +
        "&limit=20" +
        "&cursor=[docID&cursor=(docID&cursor=docID)&cursor=docID]",
      {
        where: [
          '名字="王"',
          "age>18",
          "gpa≥3.5",
          `pizza="Papa John's"`,
          `nickname='"fingers"'`,
          "missed<5",
          "subjects≤8",
          'taking∩["English","中文","Español"]',
          'member∋"Mathletes"',
          'faculty∈["Law","Business"]',
        ],
        order: ["gpa↓", "age↑"],
        cursor: ["[docID", "(docID", "docID)", "docID]"],
        limit: ["20"],
      },
    ],
    [
      "?string=question&boolean&string=&string=42",
      { boolean: true, string: ["question", "", "42"] },
    ],
    [
      "?聪明&名字=Fernando&名字=&名字=王",
      { 名字: ["Fernando", "", "王"], 聪明: true },
    ],
  ] as TestCases)(
    'capable of decoding FROM querystring: "%s"',
    (querystring, query) => {
      expect(decode(querystring)).toEqual(query);
    },
  );
});

describe("exported `encode`", () => {
  it("is a function", () => {
    expect(encode).toBeFunction();
  });
  it.each([
    ["", {}],
    ["?a", { a: true }],
    ["?a=1", { a: ["1"] }],
    ["?a=", { a: [""] }],
    [
      "?b&c=中国&c=Argentina&f=peas %26 carrots&f=peanut%26jelly&名字=王&名字=Fernando",
      {
        b: true,
        c: ["中国", "Argentina"],
        名字: ["王", "Fernando"],
        f: ["peas & carrots", "peanut&jelly"],
        undefined: undefined,
        false: false,
        falsyNumber: 0,
        falsyString: "",
        empty: [],
      },
    ],
    [
      "?cursor=[docID&cursor=(docID&cursor=docID)&cursor=docID]" +
        "&limit=20" +
        "&order=gpa↓&order=age↑" +
        `&where=名字="王"&where=age>18&where=gpa≥3.5&where=pizza="Papa John's"&where=nickname='"fingers"'&where=missed<5&where=subjects≤8&where=taking∩["English","中文","Español"]&where=member∋"Mathletes"&where=faculty∈["Law","Business"]`,
      {
        where: [
          '名字="王"',
          "age>18",
          "gpa≥3.5",
          `pizza="Papa John's"`,
          `nickname='"fingers"'`,
          "missed<5",
          "subjects≤8",
          'taking∩["English","中文","Español"]',
          'member∋"Mathletes"',
          'faculty∈["Law","Business"]',
        ],
        order: ["gpa↓", "age↑"],
        cursor: ["[docID", "(docID", "docID)", "docID]"],
        limit: ["20"],
      },
    ],
    [
      "?boolean&string=question&string=&string=42",
      { boolean: true, string: ["question", "", "42"] },
    ],
    [
      "?名字=Fernando&名字=&名字=王&聪明",
      { 名字: ["Fernando", "", "王"], 聪明: true },
    ],
  ] as TestCases)(
    'capable of encoding TO querystring: "%s"',
    (querystring, query) => {
      expect(encode(query)).toEqual(querystring);
    },
  );
});
