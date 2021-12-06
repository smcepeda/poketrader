import {
  IonButtons,
  IonSelect,
  IonSelectOption,
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
import { addCircleOutline, cart } from "ionicons/icons";
import { Card, UserProfile } from "../Model";
import {
  getCard,
  updateUserProfileLanguage,
  updateUserProfileCurrency,
} from "../DataStorage";
import { auth, firestore } from "../ConfigFirebase";
import React, { useState } from "react";
import i18next from "../i18n";
import i18n from "../i18n";
import { logout } from "../DataApp";

interface Props {
  profile: UserProfile;
  wishlistCards?: Card[];
  portfolioCards?: Card[];
  topCards?: Card[];
}

interface State {}

class PageSettings extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  async doLogout() {
    await logout(auth);
    window.location.href = "/";
  }

  changeLanguage = async (languageCode: string) => {
    await updateUserProfileLanguage(
      firestore,
      this.props.profile.id,
      languageCode
    );
  };

  changeCurrencyCode = async (currencyCode: string) => {
    await updateUserProfileCurrency(
      firestore,
      this.props.profile.id,
      currencyCode
    );
  };
  componentDidMount() {}

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{i18next.t("settings")}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large" color="primary">
                {i18next.t("settings")}
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <br />

          <IonList>
            <IonItem lines="none">
              <IonLabel color="primary">{i18next.t("language")}</IonLabel>
              <IonSelect
                value={this.props.profile.language}
                onIonChange={(e: any) => this.changeLanguage(e.target.value)}
              >
                <IonSelectOption value="de">Deutsch</IonSelectOption>
                <IonSelectOption value="en">Englisch</IonSelectOption>
                <IonSelectOption value="jp">Japanisch</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem lines="none">
              <IonLabel color="primary">{i18next.t("currency")}</IonLabel>
              <IonSelect
                value={this.props.profile.currencyCode}
                onIonChange={(e: any) =>
                  this.changeCurrencyCode(e.target.value)
                }
              >
                <IonSelectOption value="CHF">CHF</IonSelectOption>
                <IonSelectOption value="USD">USD</IonSelectOption>
                <IonSelectOption value="JP¥">JPY</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem color="white" lines="none">
              <IonLabel onClick={(_) => this.doLogout()} color="primary">
                Logout
              </IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
}

export default PageSettings;
