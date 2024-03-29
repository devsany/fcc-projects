import { PureComponent } from "react";

import DrumMachineData from "./DrumMachine.data.json";
import DrumMachine from "./DrumMachine.component";

/** @namespace Component/Calculator/Container */
export class DrumMachineContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      output: "Display",
    };

    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  containerFunctions = {
    onButtonClick: this.onButtonClick.bind(this),
  };

  containerProps() {
    const { output } = this.state;

    return {
      output,
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this._handleKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown, false);
  }

  _handleKeyDown = (e) => {
    const button = DrumMachineData.find((button) => e.key === button.key);
    if (button) {
      const audio = new Audio(button.audio);
      audio.currentTime = 0;
      audio.play();

      this.setState({ output: button.name });
    }
  };

  onButtonClick(e, button) {
    const audio = e.target.firstElementChild;
    audio.currentTime = 0;
    audio.play();

    this.setState({ output: button.name });
  }

  render() {
    return (
      <DrumMachine {...this.containerFunctions} {...this.containerProps()} />
    );
  }
}

export default DrumMachineContainer;
