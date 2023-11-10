/* eslint-disable @typescript-eslint/no-explicit-any */
import { GearApi, ProgramMetadata, GearKeyring } from "@gear-js/api";
import { useAccount } from "@gear-js/react-hooks";
import { Button } from "@gear-js/ui";
import { useState } from "react";

function App() {
  const { accounts, account } = useAccount();
  const [mnemonictext, setMnemonictext] = useState("");
  const generatemnemonic = async() => {
    const mnemonic = GearKeyring.generateMnemonic();
    setMnemonictext(mnemonic);
  };
  const init = async()=>{
    // const { mnemonic, seed } = GearKeyring.generateMnemonic();
    // const { keyring, json } = await GearKeyring.create('keyringName', 'passphrase');
    

    try {
      await generatemnemonic()
      const gearApi = await GearApi.create({
        providerAddress: 'wss://testnet.vara-network.io',
      });
      const meta = "0001000000010000000001010000000000000001020000005d0220000808696f18416374696f6e000104344578616d706c65416374696f6e00000000040808696f144576656e74000104304578616d706c654576656e7400000000080000020c000c00000408101c001010106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004001401205b75383b2033325d0000140000032000000018001800000503001c0000050700";
      const hexBytes = (meta.match(/.{1,2}/g) || []).map(byte => parseInt(byte, 16));
      const metaUint = new Uint8Array(hexBytes);

      const localaccount = account?.address;
      debugger

      const isVisibleAccount = accounts.some(
        (visibleAccount) => visibleAccount.address === localaccount
      );
      const metadata = new ProgramMetadata(metaUint,1,0);
      const message: any = {
        destination: '0x00a019b76fcdd46e8d55ea38c2a57c994aa7853d665b4c438b64ed6e81dca88f', // programId
        payload: {},
        gasLimit: 10000000,
        value: 0,
        // prepaid: true,
        // account: accountId,
        // if you send message with issued voucher
      };
      const transferExtrinsic = gearApi.message.send(message, metadata);
      debugger
      try {
        await transferExtrinsic.signAndSend(mnemonictext, (event) => {
          console.log(`OK: ${event.toHuman()}`);
        });
      } catch (error:any) {
        debugger
        console.error(`ERRROR ${error.name}: ${error.message}`);
      }
    } catch (error:any) {
      debugger

      console.error(`${error.name}: ${error.message}`);
    }
  }
  
  return (
    <>
    <Button text="Approve" onClick={init} />;
    </>
  )
}

export default App;