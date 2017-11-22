import React, { Component } from "react";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import "./HeaderBar.css";

const generateKey = pre => {
	return `${pre}_${new Date().getTime()}`;
};

class HeaderBar extends Component {
	static propTypes = {
		subtitle: PropTypes.string,
		title: PropTypes.string.isRequired,
	};

	render() {
		const { subtitle, title, children } = this.props;
		const triggerKey = generateKey("trigger");
		return (
			<div className="HeaderBar">
				<input type="checkbox" name={triggerKey} id={triggerKey} />
				<label htmlFor={triggerKey}>
					<h1>
						{subtitle && <small>{subtitle}</small>}
						{title}
					</h1>
					{children && [
						<div className="up" key={"up"}>
							<i className="material-icons">keyboard_arrow_up</i>
						</div>,
						<div className="down" key={"down"}>
							<i className="material-icons">keyboard_arrow_down</i>
						</div>,
					]}
				</label>
				{children && <ul>{children}</ul>}
			</div>
		);
	}
}

export default translate()(HeaderBar);