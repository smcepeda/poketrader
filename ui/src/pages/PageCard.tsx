import React from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { addCircleOutline, cart } from "ionicons/icons";
import { Card, UserProfile } from "../Model";
import { getCard } from "../DataStorage";
import { firestore } from "../ConfigFirebase";
import { profile } from "node:console";
import DisplayMoney from "../DisplayMoney";
import i18next from "../i18n";

interface Props {
  cardId: string;
  profile: UserProfile;
}

interface State {
  card: Card;
  inited: boolean;
}

class PageCard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      card: undefined,
      inited: false,
    };
  }

  async componentDidMount() {
    this.setState({
      inited: true,
      card: await getCard(firestore, this.props.cardId),
    });
  }

  render() {
    const { inited, card } = this.state;

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
            </IonButtons>
            <IonTitle className="ion-text-center">{i18next.t("card")}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          {inited && (
            <IonList>
              <IonListHeader>
                <IonLabel color="primary" className="ion-text-center">
                  {card.name}
                </IonLabel>
              </IonListHeader>
              <IonItem lines="none" className="ion-text-center">
                <IonLabel>3/70 - Holo - Near Mint</IonLabel>
              </IonItem>

              <IonItem lines="none" className="ion-text-center">
                <IonGrid>
                  <IonRow>
                    <IonCol size="12">
                      <img src={card.screen} alt="" />
                    </IonCol>
                    <IonCol></IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>

              <IonItem lines="none">
                <IonLabel color="primary">{i18next.t("price")}</IonLabel>
                <IonText slot="end">
                  <DisplayMoney money={card.price} /> (+5%)
                </IonText>
              </IonItem>

              <IonItem lines="none">
                <IonLabel color="primary">{i18next.t("number")}</IonLabel>
                <IonText slot="end">3 / 70</IonText>
              </IonItem>

              <IonItem lines="none">
                <IonLabel color="primary">{i18next.t("condition")}</IonLabel>
                <IonText slot="end">Near Mint</IonText>
              </IonItem>

              <IonItem lines="none">
                <IonLabel color="primary">{i18next.t("edition")}</IonLabel>
                <IonText slot="end">Majestät der Drachen</IonText>
              </IonItem>
              <IonRow>
                <IonCol size="6">
                  <IonButton expand="full" fill="solid">
                    <IonIcon slot="start" icon={cart} color="secondary" />
                    <IonText color="secondary"> {i18next.t("buy")} </IonText>
                  </IonButton>
                </IonCol>
                <IonCol size="6">
                  <IonButton expand="full" fill="solid">
                    <IonIcon
                      slot="start"
                      icon={addCircleOutline}
                      color="secondary"
                    />
                    <IonText color="secondary">{i18next.t("wishlist")}</IonText>
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonList>
          )}
        </IonContent>
      </IonPage>
    );
  }
}

export default PageCard;
