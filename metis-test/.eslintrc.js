module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    quotes: ["error", "double"],
    "react/react-in-jsx-scope": "off", // jsx를 사용하여도 react를 꼭 import 하지 않아돟 된다.
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".tsx"] },
    ], // jsx 사용 가능한 확장자
    "react/jsx-props-no-spreading": "off", // props를 스프레스 할수 있따.
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
        json: "never",
      },
    ],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "react/prop-types": "off", // proptypes를 사용하지 않음    "no-unused-vars": "off", // 사용안한 변수 경고
    "@typescript-eslint/no-unused-vars": "warn", // 사용 안한 변ㅅ ㅜ경고
  },
};
