import express from "express";
import path from "path"
import { renderApp } from "./app";
import { HOSTNAME } from "./env";
import { config } from "./config";
import protocol, { NewPingResult } from "minecraft-protocol";
import { MinecraftServer } from "./types";

const app = express();

app.get("/", async (req, res, next) => {
  // Get the status of Waterfall Proxy
  const name = HOSTNAME
  const address = "waterfall"
  const host = "waterfall"
  const port = Number(config.listeners[0].query_port)
  const waterfall = await new Promise<MinecraftServer>((resolve, reject) => {
    protocol.ping({ host, port }, (err, result) => {
      if (err) {
        return resolve({
          name,
          address,
          host,
          port,
          isOnline: false
        })
      }
      resolve({
        name,
        address,
        host,
        port,
        isOnline: true,
        status: result as NewPingResult,
      })
    })
  })

  // Get the status of Paper Servers
  const papers: Array<MinecraftServer> = []
  for (let name in config.servers) {
    const server = config.servers[name] // e.g: hub
    const address = String(server.address) // e.g: hub:25566
    const host = String(server.address).split(":")[0] // e.g: 25566
    const port = address.split(":")[1] == null ? 25565 : Number(address.split(":")[1])
    const paper = await new Promise<MinecraftServer>((resolve) => {
      protocol.ping({ host, port }, (err, result) => {
        if (err) {
          return resolve({
            name,
            address,
            host,
            port,
            isOnline: false
          })
        }
        resolve({
          name,
          address,
          host,
          port,
          isOnline: true,
          status: result as NewPingResult,
        })
      })
    })
    if (paper !== null) papers.push(paper)
  }

  const props = {
    hostname: HOSTNAME,
    waterfall,
    papers
  }

  res.send(renderApp(props))
});

app.use(express.static(path.resolve(__dirname, "..", "public")));
app.listen(process.env.PORT || 8080);