import {UserProfile, Card, Money, NewsItem} from "./Model";
import firebase from "firebase";

export async function getUserProfile(store: firebase.firestore.Firestore, userId: string): Promise<UserProfile> {
  return store.collection("user")
    .doc(userId)
    .get()
    .then((db: any) => db.data() as UserProfile);
}

export async function updateUserProfile(store: firebase.firestore.Firestore, profile: UserProfile): Promise<any> {
  return store
    .collection("user")
    .doc(profile.id)
    .set(profile);
}

export async function updateUserProfileLanguage(store: firebase.firestore.Firestore, profileId : string, language : string): Promise<any> {
  return store
    .collection("user")
    .doc(profileId)
    .update({language : language});
}

export async function updateUserProfileCurrency(store: firebase.firestore.Firestore, profileId : string, currency : string): Promise<any> {
  return store
    .collection("user")
    .doc(profileId)
    .update({currencyCode : currency});
}

export async function getCard(store: firebase.firestore.Firestore, cardId: string): Promise<Card> {
  return store.collection("card")
    .doc(cardId)
    .get()
    .then((db: any) => db.data() as Card);
}

export async function getNewsItems(store: firebase.firestore.Firestore) : Promise<NewsItem[]> {
  return store
  .collection("news")
  .limit(10)
    .get()
    .then(result => result.docs.map(doc => doc.data() as NewsItem))
}


export function getUserProfileSnapshot(firestoreRef: firebase.firestore.Firestore, userId: string, onResult: (profile: UserProfile) => any): () => void {
  return firestoreRef
    .collection("user")
    .doc(userId)
    .onSnapshot((dbProfile: any) => {
      if (dbProfile.exists) {
        onResult(dbProfile.data() as UserProfile);
      }
    });
}

export async function getCardsForUser(store: firebase.firestore.Firestore, user : UserProfile): Promise<Card[]> {
  return getCardsByIds(store, user.positions.map(c => c.cardId));
}

export async function getWishlistCardForUser(store: firebase.firestore.Firestore, user : UserProfile): Promise<Card[]> {
  return getCardsByIds(store, user.wishlist);
}

export async function getTopCards(store: firebase.firestore.Firestore, user : UserProfile): Promise<Card[]> {
  return getCardsByIds(store, user.wishlist);
}

export async function getCardsByIds(store: firebase.firestore.Firestore, cardIds: string[]): Promise<Card[]> {
  if(!cardIds || cardIds.length === 0){
    return [];
  }
  return store.collection("card")
    .where("id", "in", cardIds)
    .get()
    .then((db: any) => db.docs.map(doc => doc.data() as Card));
}

export function getPortfolioValue(user : UserProfile, cards : Card[]) : Money{
  const sum : Money = {quantity : 0, currencyCode : user.currencyCode};

  // TODO: currency conversion with exchange rates
  // TODO: value is not correct, try with reduce?
  cards?.forEach(card => sum.quantity += card.price.quantity);

  return sum;
}

export async function fetchNews() : Promise<NewsItem[]> {
  /*
  console.log("fetching news from:", getNewsCallable);
  const res = await getNewsCallable({})
  .then((result) => {
    console.log("result", result);
    // Read result of the Cloud Function.
    var sanitizedMessage = result.data.text;
  })
  .catch((error) => {
    console.log("result", error);
    // Getting the Error details.
    var code = error.code;
    var message = error.message;
    var details = error.details;
    // ...
  });
  */
  const res = fetch("https://europe-west1-poketrader-4a2d4.cloudfunctions.net/api/news").then(res => res.json())

  return [];
}