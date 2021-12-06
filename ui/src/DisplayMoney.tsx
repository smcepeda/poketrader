import React from "react";
import {Money} from "./Model";

interface Props {
  money : Money;
}

interface State {
}

class DisplayMoney extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {}
  }

  render() {
    return this.props.money.quantity + " " + this.props.money.currencyCode;
  }
}

export default DisplayMoney;
