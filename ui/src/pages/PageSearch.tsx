import {
  IonButtons,
  IonGrid,
  IonSearchbar,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { addCircleOutline, cart } from "ionicons/icons";
import { Card, UserProfile } from "../Model";
import { getCard } from "../DataStorage";
import { firestore } from "../ConfigFirebase";
import DisplayMoney from "../DisplayMoney";
import i18next from "../i18n";

interface Props {
  profile: UserProfile;
  wishlistCards?: Card[];
  portfolioCards?: Card[];
  topCards?: Card[];
}

interface State {
  search: "";
}

class PageSearch extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { search: "" };
  }

  handleChange(e) {
    this.setState({
      search: e.target.value,
    });
  }

  render() {
    const emptyState = (
      <IonGrid className="ion-padding">
        <IonRow>
          <IonCol size="6">
            <img src="assets/shield.png" alt="" />
            <IonLabel className="ion-text-center ion-padding ">
              Pokemon Shield
            </IonLabel>
          </IonCol>
          <IonCol size="6">
            <img src="assets/sword.png" alt="" />
            <IonLabel className="ion-text-center ion-padding">
              Pokemon Sword
            </IonLabel>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <img src="assets/sun.png" alt="" />
            <IonLabel className="ion-text-center ion-padding ">
              Pokemon Sun
            </IonLabel>
          </IonCol>
          <IonCol size="6">
            <img src="assets/moon.png" alt="" />
            <IonLabel className="ion-text-center ion-padding">
              Pokemon Moon
            </IonLabel>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <img src="assets/black.png" alt="" />
            <IonLabel className="ion-text-center ion-padding">
              Pokemon Black
            </IonLabel>
          </IonCol>
          <IonCol size="6">
            <img src="assets/white.png" alt="" />
            <IonLabel className="ion-text-center ion-padding">
              Pokemon White
            </IonLabel>
          </IonCol>
        </IonRow>
      </IonGrid>
    );

    const searching = (
      <IonList>
        {this.props.portfolioCards
          ?.filter(
            (card) =>
              card.name
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) >= 0
          )
          .map((card: Card, index: number) => (
            <IonItem lines="none" key={index} routerLink={"/card/" + card.id}>
              <IonLabel>{card.name} Holo Edition</IonLabel>
              <IonText slot="end">
                <DisplayMoney money={card.price} />
              </IonText>
            </IonItem>
          ))}
      </IonList>
    );

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{i18next.t("search")}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large" color="primary">
                {i18next.t("search")}
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <br />
          <IonSearchbar
            onIonChange={(e) => this.handleChange(e)}
            placeholder={i18next.t("search_cards")}
          ></IonSearchbar>
          {this.state.search.length === 0 ? emptyState : searching}
        </IonContent>
      </IonPage>
    );
  }
}

export default PageSearch;
