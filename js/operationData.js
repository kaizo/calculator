(function () {
    function OperationData () {
        this.reset();
    }

    OperationData.prototype.reset = function () {
        this.operator = "";
        this.operand1 = "";
        this.operand2 = "";
        this.hasDot = false;
        this.result = "";
    }

    OperationData.prototype.setResult = function (res) {
        this.result = "" + res;
    }

    OperationData.prototype.setOperator = function (op) {

        if (this.result) {
            var operand1 = this.result;
            this.reset();
			this.operand1 = operand1;
		}

		if (!this.operand1) {
			this.operand1 = "0";
		}

        this.operator = op;
        this.hasDot = false;
    };

    OperationData.prototype.addOperandValue = function (value) {
        if (this.operator) {
            this.operand2 += value;
        } else {
            this.operand1 += value;
        }
    };

    OperationData.prototype.updateOperands = function (value) {
        if (value === '.') {
            if (this.hasDot) {
                return;
            } else {
                this.hasDot = true;
            }
        }

        if (this.result) {
            this.reset();
        }

        this.addOperandValue(value);
    };

    OperationData.prototype.clearOperand = function () {
        if (this.result) {
            this.reset();
        } else if (this.operand2) {
            this.operand2 = "";
        } else if (this.operator) {
            this.operator = "";
        } else {
            this.reset();
        }
    };

    OperationData.prototype.toString = function () {
        var fullOperation = "";

		fullOperation += this.operand1;

		if (this.operator) {
			if (this.operator === "e") {
				fullOperation += "^";
			} else {
				fullOperation += " " + this.operator + " ";
			}
		}

		fullOperation += this.operand2;

		return fullOperation;
    }

    OperationData.prototype.isDigit = function (input) {
        var digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
        return digits.indexOf(input) > -1;
    };

    OperationData.prototype.isOperator = function (input) {
        var operators = ["+", "-", "*", "/", "e"];
        return operators.indexOf(input) > -1;
    }

    OperationData.prototype.parseInput = function (input) {
        if (this.result === "Error" || this.result === "Infinity") {
            this.reset();
        }

		if (this.isDigit(input)) {
			this.updateOperands(input);
		}

		if (this.isOperator(input)) {
			this.setOperator(input);
		}
    };

    window.OperationData = OperationData;
})()
