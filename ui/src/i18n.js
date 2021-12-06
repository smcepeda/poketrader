import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "de",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      de: {
        translation: {
          overview: "Übersicht",
          total_value: "Totaler Wert",
          watchlist: "Meine Watchlist",
          news: "Neuigkeiten",
          time_ago: "Vor 2 Stunden",
          treasure: "Schatzkammer",
          top_cards: "Top Karten",
          cards: "Karten",
          add_cards: "KARTEN HINZUFÜGEN",
          search: "Durchsuchen",
          search_cards: "Nach Pokemons suchen..",
          settings: "Einstellungen",
          language: "Sprache",
          currency: "Währung",
          currency_code: "CHF",
          card: "Karte",
          price: "Preis",
          number: "Nummer",
          condition: "Zustand",
          edition: "Edition",
          buy: "KAUFEN",
          wishlist: "WISHLIST",
          top_movers: "Top Movers",
        },
      },
      en: {
        translation: {
          overview: "Overview",
          total_value: "Total Value",
          watchlist: "My Watchlist",
          news: "Latest News",
          time_ago: "2 hours ago",
          treasure: "Treasure",
          top_cards: "Top Cards",
          cards: "Cards",
          add_cards: "ADD CARDS",
          search: "Search",
          search_cards: "Search for Pokemons..",
          settings: "Settings",
          language: "Language",
          currency: "Currency",
          currency_code: "USD",
          card: "Card",
          price: "Price",
          number: "Number",
          condition: "Condition",
          edition: "Edition",
          buy: "BUY",
          wishlist: "WISHLIST",
          top_movers: "Top Movers",
        },
      },
      jp: {
        translation: {
          overview: "概要概要",
          total_value: "総価値",
          watchlist: "私のウォッチリスト",
          news: "最新ニュース",
          time_ago: "2時間前",
          treasure: "宝",
          top_cards: "トップカード",
          cards: "カード",
          add_cards: "カードを追加する",
          search: "探す",
          search_cards: "ポケモンを検索します。",
          settings: "設定",
          language: "言語",
          currency: "通貨",
          currency_code: "JP¥",
          card: "カード",
          price: "価格",
          number: "数",
          condition: "状態",
          edition: "版",
          buy: "買う",
          wishlist: "ウィッシュリスト",
          top_movers: "トップムーバー",
        },
      },
    },
  });

export default i18n;
