var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// ../tokens/dist/index.mjs
var colors;
var init_dist = __esm({
  "../tokens/dist/index.mjs"() {
    "use strict";
    colors = {
      white: "#FFF",
      black: "#000",
      gray100: "#E1E1E6",
      gray200: "#A9A9B2",
      gray400: "#7C7C8A",
      gray500: "#505059",
      gray600: "#323238",
      gray700: "#29292E",
      gray800: "#202024",
      gray900: "#121214",
      green300: "#00B27E",
      green500: "#00875F",
      green700: "#015F43",
      green900: "#00291D"
    };
  }
});

// src/index.ts
var require_index = __commonJS({
  "src/index.ts"() {
    init_dist();
    console.log(colors);
  }
});
export default require_index();
