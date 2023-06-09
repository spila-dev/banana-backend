import { LogLevel } from "..";

export type NodeEnvValue =
  | "build"
  | "development"
  | "production_local"
  | "production"
  | "test_development"
  | "test_production_local"
  | "test_production";

export type EnvFileName = NodeEnvValue | "base";

export interface Environments {
  CLIENT_SECRET: string;
  LOG_LEVEL: LogLevel;
  MONGO_COLLECTION_NAME: string;
  MONGO_PORT: number;
  MONGO_URL: string;
  NODE_ENV: NodeEnvValue;
  PORT: number;
  REDIS_HOST: string;
  REDIS_PASSWORD: string;
  REDIS_PORT: number;
  SELF_EXEC: boolean;
  SMS_PROVIDER_1_HOST: string;
  SMS_PROVIDER_1_ROUTE: string;
  SMS_PROVIDER_1_SENDER: string;
  SMS_PROVIDER_1_SESSION: string;
  SMS_PROVIDER_2_HOST: string;
  SMS_PROVIDER_2_REPORT_URL: string;
  SMS_PROVIDER_2_ROUTE: string;
  SMS_PROVIDER_2_SESSION: string;
  SMS_PROVIDER_SELECTOR: number;
}
