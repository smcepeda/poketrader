import React from "react";
import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonSlide,
  IonSlides,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./PageHome.css";
import { Card, Money, NewsItem, UserProfile } from "../Model";
import { fetchNews, getNewsItems, getPortfolioValue } from "../DataStorage";
import i18next from "../i18n";
import { firestore } from "../ConfigFirebase";

const slideOpts = {
  speed: 400,
  spaceBetween: 0,
  slidesPerView: 2,
  loop: false,
  direction: "horizontal",
};

interface Props {
  profile: UserProfile;
  wishlistCards?: Card[];
  portfolioCards?: Card[];
  topCards?: Card[];
}

interface State {
  newsItems?: NewsItem[];
}

class PageHome extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      newsItems: [],
    };
  }

  async componentDidMount() {
    this.setState({ newsItems: await getNewsItems(firestore) });

    this.state.newsItems.forEach((item) => console.log(item["title"]));
  }

  render() {
    const { profile, wishlistCards, topCards, portfolioCards } = this.props;
    const portfolioMoney: Money = getPortfolioValue(profile, portfolioCards);
    return (
      <IonPage className="page-home">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle className="title">{i18next.t("overview")}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large" color="primary">
                {i18next.t("overview")}
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
              <IonLabel color="primary">{i18next.t("watchlist")}</IonLabel>
            </IonListHeader>

            <IonSlides pager={true} options={slideOpts}>
              {wishlistCards?.map((card: Card, index: number) => (
                <IonSlide key={index}>
                  <IonCard routerLink={"/card/" + card.id}>
                    <img src={card.image} alt="" />
                    <IonCardHeader></IonCardHeader>
                    <IonCardContent>{card.name}</IonCardContent>
                  </IonCard>
                </IonSlide>
              ))}
            </IonSlides>

            <IonListHeader>
              <IonLabel color="primary">{i18next.t("top_movers")}</IonLabel>
            </IonListHeader>

            <IonSlides pager={true} options={slideOpts}>
              {topCards?.map((card: Card, index: number) => (
                <IonSlide key={index}>
                  <IonCard routerLink={"/card/" + card.id}>
                    <img src={card.image} alt="" />
                    <IonCardHeader></IonCardHeader>
                    <IonCardContent>{card.name}</IonCardContent>
                  </IonCard>
                </IonSlide>
              ))}
            </IonSlides>

            <IonListHeader>
              <IonLabel color="primary">{i18next.t("news")}</IonLabel>
            </IonListHeader>
            <br />
            {this.state.newsItems?.map((item, index) => (
              <IonList>
                <IonItem lines="none">
                  <IonText color="primary" text-wrap>
                    {item["title"]} - vor 2 Stunden
                  </IonText>
                </IonItem>

                <IonItem lines="none">
                  <IonText>{item["content"]}</IonText>
                </IonItem>
                <br />
                <br />
              </IonList>
            ))}
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
}

export default PageHome;
