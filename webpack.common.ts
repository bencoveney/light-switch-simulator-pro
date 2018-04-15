import * as CleanPlugin from "clean-webpack-plugin";
import * as CopyPlugin from "copy-webpack-plugin";
import * as HtmlPlugin from "html-webpack-plugin";
import * as Path from "path";
import * as Webpack from "webpack";

// No typings.
// tslint:disable-next-line:no-var-requires
const IncludeAssetsPlugin = require("html-webpack-include-assets-plugin");

// Load package definition so we can pluck out anything relevant.
// tslint:disable-next-line:no-var-requires
const packageJson = require("./package.json");

// Shorthand for paths.
const resolvePath = (target: string) => Path.resolve(__dirname, target);

// Output to `/docs/` for GitHub pages.
const outputDirectory = "docs";

export const stats = {
  assets: false,
  children: false,
  hash: false,
  modules: false,
  version: true,
};

export const configuration: Webpack.Configuration = {
  devtool: "source-map",
  entry: [
    "./src/index.tsx",
  ],
  module: {
    rules: [
      {
        include: resolvePath("src"),
        loaders: [
          "babel-loader",
          "awesome-typescript-loader",
        ],
        test: /\.tsx?$/,
      },
      {
        enforce: "pre",
        loader: "source-map-loader",
        test: /\.js$/,
      },
      {
        enforce: "pre",
        include: resolvePath("src"),
        loader: "tslint-loader",
        options: {
          configFile: resolvePath("tslint.json"),
          formatter: "stylish",
        },
        test: /\.tsx?$/,
      },
      {
        include: resolvePath("src/components"),
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "typings-for-css-modules-loader",
            options: {
              camelCase: true,
              modules: true,
              namedExport: true,
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: resolvePath(outputDirectory),
  },
  performance: {
    assetFilter(assetName) {
      return assetName.indexOf("material-design-icons-webfont") !== -1;
    },
  },
  plugins: [
    new CleanPlugin(
      [outputDirectory],
      { verbose: false },
    ),
    new CopyPlugin([
      { from: "node_modules/reset-css/reset.css", to: "." },
      { from: "node_modules/mdi/fonts", to: "./mdi/fonts" },
      { from: "node_modules/mdi/css", to: "./mdi/css" },
    ]),
    new HtmlPlugin({
      author: packageJson.author,
      chunksSortMode: "dependency",
      description: packageJson.description,
      template: resolvePath("./src/index.ejs"),
      title: packageJson.name,
    }),
    new IncludeAssetsPlugin({
      append: false,
      assets: [
        "reset.css",
        "mdi/css/materialdesignicons.min.css",
      ],
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    symlinks: false,
  },
  stats,
};

export const faviconOptions = {
  background: "#000000",
  logo: resolvePath("assets/favicon.png"),
  title: packageJson.name,
};
