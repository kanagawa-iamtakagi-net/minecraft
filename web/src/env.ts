if (!process.env.HOSTNAME || process.env.HOSTNAME.length <= 0)
  throw new Error("環境変数に HOSTNAME が設定されていません");

export const HOSTNAME = process.env.HOSTNAME