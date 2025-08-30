import Redis from "ioredis";
import { serverConfig } from ".";

const redisConfig = {
  host: serverConfig.REDIS_HOST,
  port: serverConfig.REDIS_PORT,
  maxRetriesPerRequest: null,
}

export const redis = new Redis(redisConfig);

redis.on("connect", () => {
  console.log("Connected to Redis successfully");
})

redis.on("error", (error) => {
  console.error("Redis connection error", error);
})

export const createNewRedisConnection = async () => {
  return new Redis(redisConfig);
}