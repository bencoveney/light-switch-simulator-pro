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

// General stats (console output) settings.
export const stats = {
  assets: false,
  children: false,
  hash: false,
  modules: false,
  version: true,
};

export const configuration: Webpack.Configuration = {
  // Include source maps.
  devtool: "source-map",

  // Specify the entry point to the bundling process.
  entry: [
    "./src/index.tsx",
  ],

  module: {
    rules: [
      // Loader for TypeScript files (.ts and .tsx). Include bable to support
      // the react hot module reloading.
      {
        include: resolvePath("src"),
        loaders: [
          "babel-loader",
          "awesome-typescript-loader",
        ],
        test: /\.tsx?$/,
      },

      // Loader for source maps (generated by TypeScript).
      {
        enforce: "pre",
        loader: "source-map-loader",
        test: /\.js$/,
      },

      // Loader for TSLint so that errors are checked during development.
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

      // Loader for CSS modules. Typings files (.d.ts) are automatically
      // generated.
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

  // Specify where to create the output bundle.
  output: {
    filename: "bundle.js",
    path: resolvePath(outputDirectory),
  },

  // Ignore material design icons from performance warnings. We can't do much
  // about the size.
  performance: {
    assetFilter(assetName) {
      return assetName.indexOf("material-design-icons-webfont") !== -1;
    },
  },

  plugins: [
    // Clean the output directory to ensure fresh output.
    new CleanPlugin(
      [outputDirectory],
      { verbose: false },
    ),

    // Copy certain asset files to the output directory.
    new CopyPlugin([
      { from: "node_modules/reset-css/reset.css", to: "." },
      { from: "node_modules/mdi/fonts", to: "./mdi/fonts" },
      { from: "node_modules/mdi/css", to: "./mdi/css" },
    ]),

    // Settings for creating a templated index.html file. Include some metadata
    // from the package file for use in the template.
    new HtmlPlugin({
      author: packageJson.author,
      chunksSortMode: "dependency",
      description: packageJson.description,
      template: resolvePath("./src/index.ejs"),
      title: packageJson.name,
    }),

    // Include referenced assets in the templated index.html file.
    new IncludeAssetsPlugin({
      append: false,
      assets: [
        "reset.css",
        "mdi/css/materialdesignicons.min.css",
      ],
    }),
  ],

  // Resolve TypeScript and JavaScript files.
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    symlinks: false,
  },

  // Include the default stats options.
  stats,
};

// Export shared favicon settings.
export const faviconOptions = {
  background: "#000000",
  logo: resolvePath("assets/favicon.png"),
  title: packageJson.name,
};