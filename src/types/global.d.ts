/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
import { LoggerChalker } from "logger-chalker";
import { Server } from "socket.io";

import {
  CustomEmit,
  CustomOn,
  CustomUse,
  Environments,
  VerifiedSession,
} from "@/types";

declare global {
  var logger: LoggerChalker;
}

declare module "socket.io" {
  interface Socket {
    authData: VerifiedSession;
    clientId: string;
    currentUserId: string;
    customEmit: CustomEmit;
    customOn: CustomOn;
    customUse: CustomUse;
    io: Server;
  }
}

declare module "socket.io-client" {
  interface Socket {
    clientId: string;
  }
}

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends Environments {}
  }
}

export {};
