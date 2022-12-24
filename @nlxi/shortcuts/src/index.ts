import fs from "fs";
import YAML from "yaml";
import fetch from "node-fetch";
import express from "express";

const { DOCKERIZED } = process.env;
const isDockerized = DOCKERIZED === "true";

type TYaml = {
  services: {
    [key: string]: TService;
  };
};

type TService = {
  ports?: string[];
};

type TPortStatus = {
  port: string;
  status?: number;
  errorMessage?: string;
};

const file = fs.readFileSync("./docker-compose.yml", "utf8");

async function run() {
  const app = express();
  const port = process.env.PORT || 8080;

  const parsedFile = <TYaml>YAML.parse(file);
  const { services } = parsedFile;
  const nextServices = Object.entries(services)
    .map(([service, config]) => {
      return {
        service,
        ports: config.ports
          ? config.ports.map((portsMapping) => {
              const [hostPort, containerPort] = portsMapping.split(":");
              return {
                hostPort,
                containerPort,
              };
            })
          : [],
      };
    })
    .filter(({ service }) => service !== "shortcuts");

  app.get("/", async (req, res) => {
    const servicePortStatus = await Promise.all(
      nextServices.map(async ({ service, ports }) => ({
        service,
        ports: await Promise.all(
          ports.map((port) =>
            fetch(
              `http://${isDockerized ? service : "localhost"}:${
                isDockerized ? port.containerPort : port.hostPort
              }/`
            )
              .then<TPortStatus>((response) => ({
                port: port.hostPort,
                status: response.status,
              }))
              .catch<TPortStatus>((error) => ({
                port: port.hostPort,
                errorMessage: error.message,
              }))
          )
        ),
      }))
    );

    res.send(`
      <h1>Index</h1>
      ${servicePortStatus
        .map(
          ({ service, ports }) => `
        <div>${service}: ${ports.map(({ port, status }) =>
            status === 200
              ? `<a href="http://localhost:${port}" target="blank">${port}</a>`
              : port
          )}</div>`
        )
        .join("")}`);
  });

  app.listen(port);
}

run();
