(function () {
    function Calculator (operationData) {
        this.operationData = operationData;
    }

    Calculator.prototype.calculate = function () {
        var operand1 = this.operationData.operand1;
        var operand2 = this.operationData.operand2;
        var operator = this.operationData.operator;

        if (!operator || !operand1 || !operand2) {
            return;
        }
        try {
            var res;
            switch (operator) {
                case "+":
                    res = Big(operand1).plus(operand2);
                    break;
                case "-":
                    res = Big(operand1).minus(operand2);
                    break;
                case "*":
                    res = Big(operand1).times(operand2);
                    break;
                case "/":
                    res = Big(operand1).div(operand2);
                    break;
                case "e":
                    res = "" + Math.pow(+operand1, +operand2); // Big.js lib doesn't accept fractional exponents
                    break;
            }
        } catch (e) {
            console.log(e);
            if (e.message === "Infinity") {
                res = "Infinity";
            } else {
                res = "Error";
            }
        }
        this.operationData.setResult(res);
    };

    Calculator.prototype.parseInput = function (input) {
        var data = this.operationData;
        if (input === "Escape") {
            data.reset();
        } else if (input === "Backspace") {
            data.clearOperand();
        } else if (input === "Enter" || input === "=") {
            this.calculate();
        } else if (data.isOperator(input) && data.operand2 && !data.result) {
            this.calculate();
            data.setOperator(input);
        } else {
            data.parseInput(input);
        }
    }

    window.Calculator = Calculator;
})()
