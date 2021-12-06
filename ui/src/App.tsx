import React from "react";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import PageHome from "./pages/PageHome";
import {
  homeOutline,
  searchOutline,
  settingsOutline,
  statsChartOutline,
} from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import PageTresor from "./pages/PageTresor";
import PageCard from "./pages/PageCard";
import PageSearch from "./pages/PageSearch";
import PageSettings from "./pages/PageSettings";
import PageLogin from "./pages/PageLogin";
import PageRegister from "./pages/PageRegister";
import { Card, UserProfile } from "./Model";
import { onAuthenticationChanged } from "./DataApp";
import {
  getCardsByIds,
  getCardsForUser,
  getTopCards,
  getUserProfileSnapshot,
  getWishlistCardForUser,
} from "./DataStorage";
import firebase, { auth, firestore } from "./ConfigFirebase";
import { IonReactRouter } from "@ionic/react-router";
import i18next from "./i18n";

interface Props {}

interface State {
  inited: boolean;
  profile: UserProfile;
  wishlistCards?: Card[];
  topCards?: Card[];
  portfolioCards?: Card[];
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inited: false,
      profile: undefined,
    };
  }

  componentDidMount() {
    onAuthenticationChanged(auth, async (firebaseUser: firebase.User) => {
      if (firebaseUser) {
        getUserProfileSnapshot(
          firestore,
          firebaseUser.uid,
          async (profile: UserProfile) => {
            const wishListCards = await getWishlistCardForUser(
              firestore,
              profile
            );

            i18next.changeLanguage(profile.language);

            const portfolioCards = await getCardsForUser(firestore, profile);
            const topCards = await getTopCards(firestore, profile);

            this.setState({
              inited: true,
              profile: profile,
              portfolioCards: portfolioCards,
              wishlistCards: wishListCards,
              topCards: topCards,
            });
          }
        );
      } else {
        this.setState({ inited: true });
      }
    });
  }

  securedRoutes() {
    return (
      <IonRouterOutlet id="mainRouter">
        <Route path="/" exact={true}>
          <Redirect to="/tabs/home" />
        </Route>

        <Route
          path="/card/:cardId"
          exact={true}
          render={(props) => (
            <PageCard
              cardId={props.match.params["cardId"]}
              profile={this.state.profile}
            />
          )}
        ></Route>

        <Route path="/login" exact={true}>
          <PageLogin />
        </Route>

        <Route path="/register" exact={true}>
          <PageRegister />
        </Route>

        <Route
          path="/tabs"
          render={(props: any) => (
            <IonTabs>
              <IonRouterOutlet id="tabs">
                <Route path="/tabs/home" exact={true}>
                  <PageHome
                    profile={this.state.profile}
                    portfolioCards={this.state.portfolioCards}
                    wishlistCards={this.state.wishlistCards}
                    topCards={this.state.topCards}
                  />
                </Route>
                <Route path="/tabs/tresor" exact={true}>
                  <PageTresor
                    profile={this.state.profile}
                    portfolioCards={this.state.portfolioCards}
                    wishlistCards={this.state.wishlistCards}
                    topCards={this.state.topCards}
                  />
                </Route>
                <Route path="/tabs/search" exact={true}>
                  <PageSearch
                    profile={this.state.profile}
                    portfolioCards={this.state.portfolioCards}
                    wishlistCards={this.state.wishlistCards}
                    topCards={this.state.topCards}
                  />
                </Route>
                <Route path="/tabs/settings" exact={true}>
                  <PageSettings
                    profile={this.state.profile}
                    portfolioCards={this.state.portfolioCards}
                    wishlistCards={this.state.wishlistCards}
                    topCards={this.state.topCards}
                  />
                </Route>
              </IonRouterOutlet>

              <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/tabs/home">
                  <IonIcon icon={homeOutline} />
                  <IonLabel></IonLabel>
                </IonTabButton>

                <IonTabButton tab="tresor" href="/tabs/tresor">
                  <IonIcon icon={statsChartOutline} />
                  <IonLabel></IonLabel>
                </IonTabButton>

                <IonTabButton tab="search" href="/tabs/search">
                  <IonIcon icon={searchOutline} />
                  <IonLabel> </IonLabel>
                </IonTabButton>

                <IonTabButton tab="settings" href="/tabs/settings">
                  <IonIcon icon={settingsOutline} />
                  <IonLabel></IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          )}
        ></Route>
      </IonRouterOutlet>
    );
  }

  render() {
    const { inited, profile } = this.state;

    return (
      <IonApp>
        {inited && (
          <IonReactRouter>
            <IonRouterOutlet>
              <Route
                path="/"
                render={(props) =>
                  profile ? this.securedRoutes() : <PageLogin />
                }
              />
            </IonRouterOutlet>
          </IonReactRouter>
        )}
      </IonApp>
    );
  }
}

export default App;
