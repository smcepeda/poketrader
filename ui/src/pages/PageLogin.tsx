import {
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from "../ConfigFirebase";

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
  ],
};

const PageLogin: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>PokeTrader</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" color="primary">
              POKETRADER
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonListHeader>
          <IonLabel color="tertiary" className="ion-text-center">
            Gotta Trade them all!
          </IonLabel>
        </IonListHeader>

        <br />
        <br />
        <br />
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </IonContent>
    </IonPage>
  );
};

export default PageLogin;
