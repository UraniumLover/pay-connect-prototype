import { IonContent, IonHeader, IonIcon, IonImg, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { useEffect, useState } from 'react';
import { storefront } from 'ionicons/icons';

const Tab2: React.FC = () => {
  const appUser = "FTEC3002-shop"
  const [alipayResponse, setAlipayResponse] = useState(undefined as any)
  const [paypalResponse, setPaypalResponse] = useState(undefined as any)

  const updateData = () => {
    fetch(`http://localhost:3000/api/${encodeURIComponent(appUser)}/alipay`).then((res) => res.json()).then(setAlipayResponse);
    fetch(`http://localhost:3000/api/${encodeURIComponent(appUser)}/paypal`).then((res) => res.json()).then(setPaypalResponse);
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
          <IonTitle>FTEC3002-shop</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div style={{ "display": "flex", "flexDirection": "column", "minHeight": "90vh", "justifyContent": "center", "alignItems": "center", "paddingLeft": "4rem", "paddingRight": "4rem" }}>

          <IonImg style={{height:"10rem", marginBottom: "4rem"}}
            src="/store_icon.png"
            alt="PayConnect Icon"
          ></IonImg>
          <div style={{ "display": "flex", "fontSize": "4rem", "fontWeight": "bold" }}>
            Alipay Balance: {alipayResponse?.balance} <br />
            Paypal Balance: {paypalResponse?.balance}
          </div>

        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
