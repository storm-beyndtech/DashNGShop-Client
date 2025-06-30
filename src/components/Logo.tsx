import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Logo() {
	return (
		<Link to="/">
			<img src={logo} alt="Dash NG logo" width={55} />
		</Link>
	);
}
