import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { useEffect, useState } from "react"
import './Tab1.css';
import { receipt } from 'ionicons/icons';

const Tab1: React.FC = () => {

  const [amount, setAmount] = useState("0")
  const [recipient, setReceipient] = useState("*unset*")
  const [receiveMethod, setReceiveMethod] = useState("*unset*")
  const [payMeResponse, setPayMeResponse] = useState(undefined as any)
  const [fpsResponse, setFpsResponse] = useState(undefined as any)

  const updateData = () => {
    fetch('http://localhost:3000/api/user/payme').then((res) => res.json()).then(setPayMeResponse);
    fetch('http://localhost:3000/api/user/fps').then((res) => res.json()).then(setFpsResponse);
  }
  useEffect(updateData, [])



  const sendPayment = async (payer: string, receipient: string, paymentMethod: string, receiveMethod: string, amount: string) => {
    await fetch('http://localhost:3000/api/pay', {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        payer,
        recipient,
        paymentMethod,
        receiveMethod,
        "amount": +amount
      })
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>User Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonButton style={{ "color": "white", "--background": "#2c639e" }} onClick={() => {
          setReceipient("FTEC3002-shop")
        }}>Set Receipient</IonButton>
        <IonButton style={{ "color": "black", "--background": "#ebcf34" }} onClick={() => {
          setReceiveMethod("paypal")
        }}>Receive Paypal</IonButton>
        <IonButton style={{ "color": "black", "--background": "#ebcf34" }} onClick={() => {
          setReceiveMethod("alipay")
        }}>Receive Alipay</IonButton>


        <div style={{ "display": "flex", "flexDirection": "column", "minHeight": "90vh", "justifyContent": "center", "alignItems": "center", "paddingLeft": "4rem", "paddingRight": "4rem" }}>
          <p style={{ "fontSize": "4rem", "fontWeight": "bold" }}>Receipient: {recipient}<br />Receive Method: {receiveMethod}</p>

          <IonItem style={{ "width": "100%" }}>
            <IonInput label="Input the Amount to Transfer" labelPlacement="stacked" placeholder="Amount" value={amount} onIonChange={(e) => { setAmount((e.currentTarget as any).value) }}></IonInput>
          </IonItem>


          <div style={{ "display": "flex" }}>
            <IonButton style={{ "color": "white", "--background": "#cc1d31" }} onClick={async () => {
              if (!(await confirm("Are you sure you want to transfer $" + amount + "to " + recipient + "?"))) return;
              await sendPayment("user", recipient, "payme", receiveMethod, amount)
              updateData()
              console.log('done')
            }}>PayMe</IonButton>
            <IonButton style={{ "color": "white", "--background": "#2c639e" }} onClick={async () => {
              if (!(await confirm("Are you sure you want to transfer $" + amount + "to " + recipient + "?"))) return;
              await sendPayment("user", recipient, "fps", receiveMethod, amount)
              updateData()
              console.log('done')
            }}>FPS</IonButton>
          </div>
          {/* <p>Amount: {amount}</p> */}

          <div style={{ "display": "flex", "marginTop": "2rem" }}>
            {/* {JSON.stringify(payMeResponse)}
            {JSON.stringify(fpsResponse)} */}
            PayMe Balance: {payMeResponse?.balance} <br />
            FPS Balance: {fpsResponse?.balance}

          </div>
        </div>


      </IonContent>
    </IonPage>
  );
};

export default Tab1;
