import { IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { useState, useEffect } from 'react';

const Tab3: React.FC = () => {
  const appUser = "payconnect"
  const [alipayResponse, setAlipayResponse] = useState(undefined as any)
  const [paypalResponse, setPaypalResponse] = useState(undefined as any)
  const [paymeResponse, setPaymeResponse] = useState(undefined as any)
  const [fpsResponse, setFpsResponse] = useState(undefined as any)

  const updateData = () => {
    fetch(`http://localhost:3000/api/${encodeURIComponent(appUser)}/alipay`).then((res) => res.json()).then(setAlipayResponse);
    fetch(`http://localhost:3000/api/${encodeURIComponent(appUser)}/paypal`).then((res) => res.json()).then(setPaypalResponse);
    fetch(`http://localhost:3000/api/${encodeURIComponent(appUser)}/payme`).then((res) => res.json()).then(setPaymeResponse);
    fetch(`http://localhost:3000/api/${encodeURIComponent(appUser)}/fps`).then((res) => res.json()).then(setFpsResponse);
  }
  useEffect(() => {
    updateData()
    const interval = setInterval(updateData, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>PayConnect</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div style={{ "display": "flex", "flexDirection": "column", "minHeight": "90vh", "justifyContent": "center", "alignItems": "center", "paddingLeft": "4rem", "paddingRight": "4rem" }}>

          <IonImg style={{height:"10rem", marginBottom: "4rem"}}
            src="/PayConnect_Long.png"
            alt="PayConnect Icon"
          ></IonImg>
          <div style={{ "display": "flex", "fontSize": "4rem"}}>
            Alipay Balance: {alipayResponse?.balance} <br />
            Paypal Balance: {paypalResponse?.balance} <br />
            Payme Balance: {paymeResponse?.balance} <br />
            FPS Balance: {fpsResponse?.balance}

          </div>

        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
