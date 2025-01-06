module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  globals: {
    process: "readonly"
  },
  extends: [
    "eslint:recommended",
    "plugin:react-hooks/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/react",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    "react-refresh",
    "react",
    "react-hooks",
    "jsx-a11y",
    "import",
    "promise",
    "prettier",
  ],
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"], // Указываем src как базовую папку
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      alias: {
        map: [["@components", "./src/components"]],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    //add customize rules here as per your project's needs
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "prettier/prettier": "warn",
    "promise/always-return": "error",
    "promise/no-return-wrap": "error",
    "import/no-unresolved": "error",
    "import/named": "error",
    "jsx-a11y/anchor-is-valid": "warn",
    "import/no-named-as-default-member": "off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default": "off",
    //"no-console": ["error", { allow: ["warn", "error"] }],

  },
  ignorePatterns: ["*.cjs"],
};
