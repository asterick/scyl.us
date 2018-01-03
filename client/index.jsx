import Inferno from 'inferno';
import UI  from  "./ui/index.jsx";

import { attach, start, initialize } from "./system";

attach("system");

initialize().then(() => {
	Inferno.render(<UI />, document.getElementById("container"));
	start();
});
