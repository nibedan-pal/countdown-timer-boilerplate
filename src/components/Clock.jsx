import React from "react";
import "./Clock.css";
class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timeInSec: 0,
		};
	}
	formatTime(timeInSeconds) {
		var seconds = timeInSeconds % 60;
		var minutes = Math.floor(timeInSeconds / 60);

		if (seconds < 10) {
			seconds = "0" + seconds;
		}

		if (minutes < 10) {
			minutes = "0" + minutes;
		}

		return minutes + ":" + seconds;
	}

	startTimer = () => {
		const { timeInSeconds } = this.props;
		this.clock = setInterval(() => {
			this.setState({
				timeInSec: this.state.timeInSec - 1,
			});
		}, 1000);

		setTimeout(() => {
			clearInterval(this.clock);
		}, timeInSeconds * 1000);
	};

	componentDidUpdate(prevProps) {
		if (
			this.props.timeInSeconds !== prevProps.timeInSeconds &&
			this.state.timeInSec === 0
		) {
			this.setState({ timeInSec: this.props.timeInSeconds });
			this.startTimer();
		}
	}

	render() {
		const { timeInSec } = this.state;
		return (
			<div className="clock clock-container">
				<span className="clock-text clock-value">
					{this.formatTime(timeInSec)}
				</span>
			</div>
		);
	}
}

export default Clock;
