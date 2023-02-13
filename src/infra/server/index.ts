import app from "@infra/app";

const PORT = 3333;

const start = async () => {
  try {
    await app.listen({ port: PORT as number, host: "0.0.0.0" });
    app.log.info(`Docs listening at http://localhost:${PORT}/docs`);
    app.log.info("Server has started! 🚀");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
