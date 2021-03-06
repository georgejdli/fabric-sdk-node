/**
 * Copyright 2018, 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AllForTxStrategy } from './allfortxstrategy';
import { AnyForTxStrategy } from './anyfortxstrategy';
import { TxEventHandlerFactory, TransactionEventHandler } from './transactioneventhandler';
import { Network } from '../../network';
import { Endorser } from 'fabric-common';

function getOrganizationPeers(network: Network): Endorser[] {
	const mspId = network.getGateway().getIdentity().mspId;
	return network.getChannel().getEndorsers(mspId);
}

function getNetworkPeers(network: Network): Endorser[] {
	return network.getChannel().getEndorsers();
}

/**
 * @typedef DefaultEventHandlerStrategies
 * @memberof module:fabric-network
 * @property {module:fabric-network.TxEventHandlerFactory} MSPID_SCOPE_ALLFORTX Listen for transaction commit
 * events from all peers in the client identity's organization.
 * The [submitTransaction]{@link module:fabric-network.Contract#submitTransaction} function will wait until successful
 * events are received from <em>all</em> currently connected peers (minimum 1).
 * @property {module:fabric-network.TxEventHandlerFactory} MSPID_SCOPE_ALLFORTX Listen for transaction commit
 * events from all peers in the client identity's organization.
 * The [submitTransaction]{@link module:fabric-network.Contract#submitTransaction} function will wait until successful
 * events are received from <em>all</em> currently connected peers (minimum 1).
 * @property {module:fabric-network.TxEventHandlerFactory} MSPID_SCOPE_ALLFORTX Listen for transaction commit
 * events from all peers in the client identity's organization.
 * The [submitTransaction]{@link module:fabric-network.Contract#submitTransaction} function will wait until successful
 * events are received from <em>all</em> currently connected peers (minimum 1).
 * @property {module:fabric-network.TxEventHandlerFactory} NETWORK_SCOPE_ANYFORTX Listen for transaction commit
 * events from all peers in the network.
 * The [submitTransaction]{@link module:fabric-network.Contract#submitTransaction} function will wait until a
 * successful event is received from <em>any</em> peer.
 */

export const MSPID_SCOPE_ALLFORTX: TxEventHandlerFactory = (transactionId, network) => {
	const eventStrategy = new AllForTxStrategy(getOrganizationPeers(network));
	return new TransactionEventHandler(transactionId, network, eventStrategy);
};

export const MSPID_SCOPE_ANYFORTX: TxEventHandlerFactory = (transactionId, network) => {
	const eventStrategy = new AnyForTxStrategy(getOrganizationPeers(network));
	return new TransactionEventHandler(transactionId, network, eventStrategy);
};

export const NETWORK_SCOPE_ALLFORTX: TxEventHandlerFactory = (transactionId, network) => {
	const eventStrategy = new AllForTxStrategy(getNetworkPeers(network));
	return new TransactionEventHandler(transactionId, network, eventStrategy);
};

export const NETWORK_SCOPE_ANYFORTX: TxEventHandlerFactory = (transactionId, network) => {
	const eventStrategy = new AnyForTxStrategy(getNetworkPeers(network));
	return new TransactionEventHandler(transactionId, network, eventStrategy);
};
