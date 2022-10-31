// Generated by Ignite ignite.com/cli

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient, DeliverTxResponse } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { msgTypes } from './registry';
import { IgniteClient } from "../client"
import { MissingWalletError } from "../helpers"
import { Api } from "./rest";
import { MsgCancelUpgrade } from "./types/cosmos/upgrade/v1beta1/tx";
import { MsgSoftwareUpgrade } from "./types/cosmos/upgrade/v1beta1/tx";


export { MsgCancelUpgrade, MsgSoftwareUpgrade };

type sendMsgCancelUpgradeParams = {
  value: MsgCancelUpgrade,
  fee?: StdFee,
  memo?: string
};

type sendMsgSoftwareUpgradeParams = {
  value: MsgSoftwareUpgrade,
  fee?: StdFee,
  memo?: string
};


type msgCancelUpgradeParams = {
  value: MsgCancelUpgrade,
};

type msgSoftwareUpgradeParams = {
  value: MsgSoftwareUpgrade,
};


export const registry = new Registry(msgTypes);

const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
	prefix: string
	signer?: OfflineSigner
}

export const txClient = ({ signer, prefix, addr }: TxClientOptions = { addr: "http://localhost:26657", prefix: "cosmos" }) => {

  return {
		
		async sendMsgCancelUpgrade({ value, fee, memo }: sendMsgCancelUpgradeParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgCancelUpgrade: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgCancelUpgrade({ value: MsgCancelUpgrade.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgCancelUpgrade: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgSoftwareUpgrade({ value, fee, memo }: sendMsgSoftwareUpgradeParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgSoftwareUpgrade: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgSoftwareUpgrade({ value: MsgSoftwareUpgrade.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgSoftwareUpgrade: Could not broadcast Tx: '+ e.message)
			}
		},
		
		
		msgCancelUpgrade({ value }: msgCancelUpgradeParams): EncodeObject {
			try {
				return { typeUrl: "/cosmos.upgrade.v1beta1.MsgCancelUpgrade", value: MsgCancelUpgrade.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgCancelUpgrade: Could not create message: ' + e.message)
			}
		},
		
		msgSoftwareUpgrade({ value }: msgSoftwareUpgradeParams): EncodeObject {
			try {
				return { typeUrl: "/cosmos.upgrade.v1beta1.MsgSoftwareUpgrade", value: MsgSoftwareUpgrade.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgSoftwareUpgrade: Could not create message: ' + e.message)
			}
		},
		
	}
};

interface QueryClientOptions {
  addr: string
}

export const queryClient = ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseURL: addr });
};

class SDKModule {
	public query: ReturnType<typeof queryClient>;
	public tx: ReturnType<typeof txClient>;
	
	public registry: Array<[string, GeneratedType]>;

	constructor(client: IgniteClient) {		
	
		this.query = queryClient({ addr: client.env.apiURL });
		this.tx = txClient({ signer: client.signer, addr: client.env.rpcURL, prefix: client.env.prefix ?? "cosmos" });
	}
};

const Module = (test: IgniteClient) => {
	return {
		module: {
			CosmosUpgradeV1Beta1: new SDKModule(test)
		},
		registry: msgTypes
  }
}
export default Module;