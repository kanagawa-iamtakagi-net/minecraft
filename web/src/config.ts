import path from "path";
import fs from "fs";
import yaml from "js-yaml";
import { WaterfallConfig } from "./types";

const configPath = path.resolve("./config.yml");

if (!fs.existsSync(configPath)) throw new Error("config.yml が存在しません");

const loadWaterfallConfig = () => {
  const yamlText = fs.readFileSync(configPath, "utf8");
  return yaml.load(yamlText) as WaterfallConfig;
};

export const config = loadWaterfallConfig();
