import "dotenv/config";
import app from "./app";
import { env } from "./config/env";
import { connectDbIfEnabled } from "./db/connectDb";

async function bootstrap() {
  await connectDbIfEnabled();

  app.listen(env.PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${env.PORT}`);
  });
}

bootstrap();