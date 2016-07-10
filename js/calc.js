(function () {
	"strict mode";

	document.getElementsByTagName("body")[0].onkeydown = handleKeyPress;

	window.currDisplay = "0";
	window.currOperation = "";
	window.operand1 = "";
	window.operand2 = "";
	window.previousResult = "";
	window.hasDot = false;

	var display = document.getElementById('display');
	var operationDisplay = document.getElementById('operation');

	function applyDisplayValue () {
		console.log("applyDisplayValue");
		display.innerHTML = currDisplay;
		operationDisplay.innerHTML = stringifyOperation();
	}

	function reset () {
		console.log("reset");
		currDisplay = "0";
		currOperation = "";
		operand1 = "";
		operand2 = "";
		hasDot = false;
		applyDisplayValue();
	}

	function stringifyOperation () {
		var fullOperation = "";

		fullOperation += operand1;

		if (currOperation) {
			if (currOperation === "e") {
				fullOperation += "^";
			} else {
				fullOperation += " " + currOperation + " ";
			}
		}

		fullOperation += operand2;

		return fullOperation;
	}

	function addDisplayValue (val) {
		console.log("addDisplayValue", val);
		if (val != '.' && currDisplay === "0") {
			currDisplay = "";
		}
		currDisplay += val;
		applyDisplayValue();
	}

	function handleKeyPress (ev) {
		console.log("handleKeyPress");
		handleInput(ev.key);
	}

	function setOperation (op) {
		console.log("setOperation", op);
		if (previousResult && !operand1) {
			operand1 = previousResult;
		}

		if (!operand1) {
			operand1 = "0";
		}

		if (currOperation && operand1 && operand2) {
			calculate();
		}

		currOperation = op;
		applyDisplayValue();
		currDisplay = "0";
		hasDot = false;


	}

	function calculate () {
		console.log("calculate");
		if (!currOperation || !operand1 || !operand2) {
			return;
		}
		var res;
		switch (currOperation) {
			case "+":
				res = Big(operand1).plus(operand2).toString();
				break;
			case "-":
				res = Big(operand1).minus(operand2).toString();
				break;
			case "*":
				res = Big(operand1).times(operand2).toString();
				break;
			case "/":
				res = Big(operand1).div(operand2).toString();
				break;
			case "e":
				res = Big(operand1).pow(+operand2).toString();
				break;
			default:
				return;
		}

		currDisplay = res;
		applyDisplayValue();

		operand1 = res;
		operand2 = "";

		previousResult = res;
		currDisplay = "0";
		currOperation = null;
		operand1 = "";
		operand2 = "";
	};

	function addOperandValue (val) {
		console.log("addOperandValue", val);
		if (currOperation) {
			operand2 += val;
		} else {
			operand1 += val;
		}
	}

	function updateOperand (val) {
		if (val === '.') {
			if (hasDot) {
				return;
			} else {
				hasDot = true;
			}
		}

		addOperandValue(val);
		addDisplayValue(val);
	}

	function handleInput (val) {
		console.log("handleInput", val);
		var nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
		var operations = ["+", "-", "*", "/", "e"];
		if (nums.indexOf(val) > -1) {
			updateOperand(val);
		}

		if (operations.indexOf(val) > -1) {
			setOperation(val);
		}

		if (val === "Escape") {
			reset();
		}

		if (val === "Enter" || val === "=") {
			calculate();
		}
	}

	function addClickEvents () {
		console.log("addClickEvents");
		document.getElementById('num0').onclick = handleInput.bind(this, "0");
		document.getElementById('num1').onclick = handleInput.bind(this, "1");
		document.getElementById('num2').onclick = handleInput.bind(this, "2");
		document.getElementById('num3').onclick = handleInput.bind(this, "3");
		document.getElementById('num4').onclick = handleInput.bind(this, "4");
		document.getElementById('num5').onclick = handleInput.bind(this, "5");
		document.getElementById('num6').onclick = handleInput.bind(this, "6");
		document.getElementById('num7').onclick = handleInput.bind(this, "7");
		document.getElementById('num8').onclick = handleInput.bind(this, "8");
		document.getElementById('num9').onclick = handleInput.bind(this, "9");
		document.getElementById('dot').onclick = handleInput.bind(this, ".");
		document.getElementById('clear').onclick = handleInput.bind(this, 'Escape');
		document.getElementById('equal').onclick = handleInput.bind(this, '=');
		document.getElementById('plus').onclick = handleInput.bind(this, '+');
		document.getElementById('minus').onclick = handleInput.bind(this, '-');
		document.getElementById('mult').onclick = handleInput.bind(this, '*');
		document.getElementById('div').onclick = handleInput.bind(this, '/');
		document.getElementById('exp').onclick = handleInput.bind(this, 'e');
	}

	addClickEvents();
})();
