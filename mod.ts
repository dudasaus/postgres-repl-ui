import { WebUI } from "@webui/deno-webui";
import * as path from "@std/path";
import { serveDir } from "@std/http/file-server";

const distDir = path.join(import.meta.dirname!, "dist");
const ac = new AbortController();

const server = Deno.serve(
  { port: 8080, signal: ac.signal },
  async (req: Request) => {
    if (req.url.endsWith(".wasm")) {
      const url = new URL(req.url);
      const filepath = path.join(
        distDir,
        decodeURIComponent(url.pathname) + "a",
      );
      const file = await Deno.open(filepath, { read: true });
      return new Response(file.readable, {
        headers: {
          "Content-Type": "application/wasm",
        },
      });
    }

    return serveDir(req, {
      fsRoot: distDir,
    });
  },
);

server.finished.then(() => {
  console.log("Server closed");
});

const window = new WebUI();
window.setPort(8081);
await window.show("http://localhost:8080");
console.log("App opened");
await WebUI.wait();
console.log("All apps closed");
ac.abort();
