import React from "react";
import { MinecraftServer } from "./types";
import McText from 'mctext-react'
import { renderHtml } from "./html";

export interface Props {
  hostname: string,
  waterfall: MinecraftServer,
  papers: Array<MinecraftServer>
  error?: {
    status: number;
    message: string;
  };
};

const Waterfall: React.FC<{ server: MinecraftServer }> = ({server}) => {
  const { status } = server
  return (
    <div style={{ display: "flex", flexDirection: "row", background: "black", color: "white", padding: ".25rem" }}>
      <img src={status.favicon} alt="" />

      <div style={{ marginLeft: ".25rem", fontSize: ".875rem" }}>
        <div>{server.name}</div>
        <McText>{status.description}</McText>
      </div>

      <div style={{ fontSize: ".75rem" }}>
        <div style={{ paddingLeft: ".5rem", paddingRight: ".5rem" }}>{status.version.name}</div>
        <div style={{ paddingLeft: ".5rem", paddingRight: ".5rem" }}>{status.latency}ms</div>
      </div>

      <div style={{ fontSize: ".75rem", paddingLeft: ".5rem", paddingRight: ".5rem" }}>
        {status.players.online} / {status.players.max}
      </div>
    </div>
  )
}

const Paper: React.FC<{ server: MinecraftServer }> = ({ server }) => {
  return (
    <tr>
      <td>{server.name}</td>
      <td>
        {server.status.version.name}
      </td>
      <td>
        {server.status.players.online} / {server.status.players.max}
      </td>
    </tr>
  )
}

const Papers: React.FC<{ servers: Array<MinecraftServer> }> = ({ servers }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Server Name</th>
          <th>Version</th>
          <th>Online Players</th>
        </tr>
      </thead>
      <tbody>
        {servers.map((server, i) => {
          return (
            <Paper server={server} />
          )
        })}
      </tbody>
    </table>
  )
}

export const App: React.FC<Props> = ({ hostname, waterfall, papers, error }) => {
  if (error) return <>
    <p>{error.message}</p>
    <p>{error.status}</p>
  </>

  return (
    <>
      <main>
        <section>
          <h1>{hostname}</h1>
          <Waterfall server={waterfall} />
          <section>
            <h2>Servers</h2>
            <Papers servers={papers} />
          </section>
        </section>
      </main>
      <hr />
      <footer>
        <p>
          GitHub:
          <a href="https://github.com/kanagawa-iamtakagi-net/minecraft"
          >https://github.com/kanagawa-iamtakagi-net/minecraft</a>
        </p>
        <p>
          Author:
          <a href="https://github.com/iamtakagi">iamtakagi</a>
        </p>
        <p>© iamtakagi</p>
      </footer>
    </>
  )
}

export const renderApp = (props: Props) => renderHtml({title: props.hostname, children: <App hostname={props.hostname} waterfall={props.waterfall} papers={props.papers}/> })