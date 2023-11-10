/* eslint-disable @typescript-eslint/no-explicit-any */
import { GearApi, ProgramMetadata, GearKeyring } from "@gear-js/api";
import { useAccount } from "@gear-js/react-hooks";
import { Button } from "@gear-js/ui";
import { useState } from "react";
import { useForm } from "react-hook-form";



const Upload = () => {
  type FormValues = {
    starting_price: string,
    token_owner: string,
    discount_rate: string,
    time_left: string,

  }
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
  const { accounts, account } = useAccount();
  const [mnemonictext, setMnemonictext] = useState("");
  const generatemnemonic = async () => {
    const mnemonic = GearKeyring.generateMnemonic();
    setMnemonictext(mnemonic);
  };
  const init = async (data: any) => {
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

      // const localaccount = account?.address;

      // const isVisibleAccount = accounts?.some(
      //   (visibleAccount) => visibleAccount.address === localaccount
      // );
      const metadata = new ProgramMetadata(metaUint, 0, 0);
      data.action
      const message: any = {
        destination: '0x00a019b76fcdd46e8d55ea38c2a57c994aa7853d665b4c438b64ed6e81dca88f', // programId
        payload: {
          "_variants": {
              "ExampleAction": null
          }
      },
        gasLimit: 10000000,
        value: 0,
        // prepaid: true,
        // account: accountId,
        // if you send message with issued voucher
      };
      const transferExtrinsic = gearApi.message.send(message, metadata);
      try {
        await transferExtrinsic.signAndSend(mnemonictext, (event) => {
          console.log(`OK: ${event.toHuman()}`);
        });
      } catch (error: any) {
        console.error(`ERRROR ${error.name}: ${error.message}`);
      }
    } catch (error: any) {
      console.error(`${error.name}: ${error.message}`);
    }
  }
  
  return (
    <div className="flex flex-col items-center w-2/6">
      <h1 className="">Subir Producto</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(init)}>
        <div>
          <label htmlFor="" className="labelTxt">Price</label>
          <input type="text" className="inputNumber"
            {...register('starting_price',
              {
                required: {
                  value: true,
                  message: "Ingresa un valor valido"
                },
              })}
          />
        </div>
        <div>
          <label htmlFor="" className="labelTxt">Token Owner</label>
          <input type="text" className="inputNumber"
            {...register('token_owner',
              {
                required: {
                  value: true,
                  message: "Ingresa un valor valido"
                },
              })}
          />
        </div>

        <div>
          <label htmlFor="" className="labelTxt">discount rate </label>
          <input type="text" className="inputNumber"
            {...register('discount_rate',
              {
                required: {
                  value: true,
                  message: "Ingresa un valor valido"
                },
              })}
          />
        </div>
        <div>
          <label htmlFor="" className="labelTxt">Time</label>
          <input type="text" className="inputNumber"
          {...register('time_left',
            {
              required: {
                value: true,
                message: "Ingresa un valor valido"
              },
            })}
        />
        </div>
        <Button className="bg-purple mt-10" type="submit" text="Send" />;
      </form>
      {/* <Button text="Approve" onClick={init} />; */}
    </div>
  )
}

export default Upload; 