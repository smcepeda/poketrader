import {
  IonButtons,
  IonCardHeader,
  IonCardContent,
  IonText,
  IonCard,
  IonSlides,
  IonSlide,
  IonListHeader,
  IonButton,
  IonLabel,
  IonItem,
  IonContent,
  IonHeader,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { Card, Money, UserProfile } from "../Model";
import { getPortfolioValue } from "../DataStorage";
import i18next from "../i18n";

const slideOpts = {
  speed: 400,
  spaceBetween: 0,
  slidesPerView: 2,
  centeredSlides: true,
  loop: false,
};

interface Props {
  profile: UserProfile;
  wishlistCards?: Card[];
  portfolioCards?: Card[];
  topCards?: Card[];
}

interface State {}

class PageTresor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { profile, portfolioCards, topCards } = this.props;

    const portfolioMoney: Money = getPortfolioValue(profile, portfolioCards);

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{i18next.t("treasure")}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large" color="primary">
                {i18next.t("treasure")}
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonList>
            <IonListHeader>
              <IonLabel color="primary">{i18next.t("total_value")}</IonLabel>
            </IonListHeader>
            <IonItem lines="none">
              <IonLabel>
                {portfolioMoney.currencyCode} {portfolioMoney.quantity} (+10%)
              </IonLabel>
            </IonItem>

            <IonListHeader>
              <IonLabel color="primary">{i18next.t("top_cards")}</IonLabel>
            </IonListHeader>

            <IonSlides pager={true} options={slideOpts}>
              {portfolioCards?.map((card: Card, index: number) => (
                <IonSlide key={index}>
                  <IonCard routerLink={"/card/" + card.id}>
                    <img src={card.image} alt="" />
                    <IonCardContent>{card.name}</IonCardContent>
                  </IonCard>
                </IonSlide>
              ))}
            </IonSlides>

            <IonListHeader>
              <IonLabel color="primary"> {i18next.t("cards")}</IonLabel>
            </IonListHeader>

            {portfolioCards?.map((card: Card, index: number) => (
              <IonItem lines="none" key={index} routerLink={"/card/" + card.id}>
                <IonLabel>{card.name} Holo Edition</IonLabel>
                <IonText slot="end">
                  {portfolioMoney.currencyCode} {card.price.quantity}
                </IonText>
              </IonItem>
            ))}

            <br />

            <IonButton expand="full" fill="solid">
              <IonText color="secondary"> {i18next.t("add_cards")}</IonText>
            </IonButton>
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
}

export default PageTresor;
