//FIXME: Remove http://
import cookie from "cookie";
import http from "http";
import Client, {
  ManagerOptions,
  Socket,
  SocketOptions,
} from "socket.io-client";

import { appConfigs } from "~/classes/AppConfigs";
import { clientManager } from "~/classes/ClientIdManager";
import { utils } from "~/utils";
import { errors } from "~/variables";

const {
  APP: { PORT, HOSTNAME: hostname },
} = appConfigs.getConfigs();

const setClientIdRequestOptions = {
  headers: {
    "Content-Type": "application/json",
  },
  hostname,
  method: "GET",
  path: "/setClientId",
  port: PORT,
};

type PromiseResolve = (value: string | PromiseLike<string>) => void;
type PromiseReject = (reason?: any) => void;

const setClientIdRequestBody = (
  resolve: PromiseResolve,
  reject: PromiseReject
) => {
  return (res: http.IncomingMessage) => {
    const cookies = res.headers["set-cookie"];
    if (!cookies) return reject(errors.cookieIsNotDefined);

    resolve(utils.extractClientFromCookie(cookies[0]));
  };
};

export class ClientInitializer {
  private client: Socket;
  private clientStr: string;
  private clientCookie: string;

  setClient(clientStr?: any) {
    this.clientStr = clientStr;
    return this;
  }

  async makeLegalClient() {
    return await new Promise<string>((resolve, reject) => {
      const req = http.request(
        setClientIdRequestOptions,
        setClientIdRequestBody(resolve, reject)
      );
      req.end();
    });
  }

  initClient() {
    this.client = Client(this.makeUrl(), this.makeClientSocketOptions());
    return this;
  }

  private makeUrl() {
    return `http://${hostname}:${PORT}`;
  }

  private makeClientSocketOptions() {
    const options: Partial<ManagerOptions & SocketOptions> = {
      autoConnect: false,
      withCredentials: true,
    };

    if (this.clientCookie) {
      options.extraHeaders = {
        cookie: this.clientCookie,
      };
    }

    return options;
  }
  makeClientCookie() {
    this.clientCookie = cookie.serialize("clientId", this.clientStr, {
      httpOnly: true,
      sameSite: false,
      secure: true,
    });

    return this;
  }

  async assignClientId() {
    const {
      payload: { clientId },
    } = await clientManager.verifyClient(this.clientStr);
    this.client.clientId = clientId;

    return this;
  }

  connect() {
    this.client.connect();
    return this;
  }

  async createComplete() {
    this.clientStr = await this.makeLegalClient();
    this.makeClientCookie();
    this.initClient();
    await this.assignClientId();
    this.connect();

    return this;
  }

  getClient() {
    return this.client;
  }
}

export const clientInitializer = () => new ClientInitializer();
