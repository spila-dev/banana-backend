import { Socket as ClientSocket } from "socket.io-client";

import { IO, SocketEvent } from "~/types";
import { NativeModelKey } from "~/types/models";

import { Requester } from "@/classes/Requester";
import { helpers } from "@/helpers";

export type RequesterMaker<IOType extends IO> = (
  socketClient: ClientSocket
) => Requester<IOType>;

export type RequesterMakerWrapper<IOType extends IO> = (
  socket: ClientSocket
) => Requester<IOType>;

export type RequesterMakerHelper<IOType extends IO> = (
  event: SocketEvent<IOType>
) => RequesterMakerWrapper<IOType>;

export type RequesterCollection = typeof helpers.requesterCollection;

export type E2eFailTestIgnores = NativeModelKey[];

export type E2eFailTestInitializer<IOType extends IO = any> = (
  configuredRequester: Requester<IOType>,
  data: Readonly<object>,
  ignores?: E2eFailTestIgnores
) => void;

export type AssertionInitializerOptions = {
  modelCheck: boolean;
  stringEquality: boolean;
};
export interface AssertionInitializerArgs {
  equalValue?: any;
  testValue: any;
}

export type AssertionInitializer = (
  data: AssertionInitializerArgs,
  options?: AssertionInitializerOptions
) => void;

export interface RequesterOptions {
  shouldFilterRequestData: boolean;
}

export type { ClientSocket };
