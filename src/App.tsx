import { Connection } from "@solana/web3.js";
import React, { useEffect, useState } from "react";
import "./App.css";
import Sender from "./components/Sender";
import TransactionsView from "./components/TransactionView";
import {
  getTransactions,
  TransactionWithSignature,
} from "./helpers/transactions";
import { initWallet, WalletAdapter } from "./helpers/wallet";
//simple ui build 
function App() {
	const [transactions, setTransactions] =
		useState<Array<TransactionWithSignature>>();
	const conn = React.useRef<Connection>();
	const wall = React.useRef<WalletAdapter>();

	useEffect(() => {
		initWallet().then(([connection, wallet]: [Connection, WalletAdapter]) => {
			conn.current = connection;
			wall.current = wallet;
			if (wallet.publicKey) {
				getTransactions(connection, wallet.publicKey).then((trans) => {
					setTransactions(trans);
				});
			}
		});
	}, []);
	// call to inicialize the wallet
	const didSendMoney = () => {
		getTransactions(conn.current!, wall.current!.publicKey!).then((trans) => {
			setTransactions(trans);
		});
	};
	// call to inicialize the list of transactions and get actively the data
	return (
		<div className='app-body'>
			<div className='app-body-top'>
				<h1> Ethernum native token reproduced</h1>
				<h3>Sending Money on Solana Blockchain</h3>
				<Sender didSendMoney={didSendMoney} />
			</div>
			<div className='app-body-mid'>
				<TransactionsView transactions={transactions} />
			</div>
		</div>
	);
}

export default App;
