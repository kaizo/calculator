(function () {

    var mainDisplay = document.getElementById('display');
	var secondaryDisplay = document.getElementById('operation');

    function Io(operationData) {
        this.operationData = operationData;
    };

    Io.prototype.listen = function (callback) {
        this.listenMouseInput(callback);
        this.listenKeyboardInput(callback);
    };

    Io.prototype.listenMouseInput = function (callback) {
        document.getElementById('num0').onclick = callback.bind(this, "0");
		document.getElementById('num1').onclick = callback.bind(this, "1");
		document.getElementById('num2').onclick = callback.bind(this, "2");
		document.getElementById('num3').onclick = callback.bind(this, "3");
		document.getElementById('num4').onclick = callback.bind(this, "4");
		document.getElementById('num5').onclick = callback.bind(this, "5");
		document.getElementById('num6').onclick = callback.bind(this, "6");
		document.getElementById('num7').onclick = callback.bind(this, "7");
		document.getElementById('num8').onclick = callback.bind(this, "8");
		document.getElementById('num9').onclick = callback.bind(this, "9");
		document.getElementById('dot').onclick = callback.bind(this, ".");
		document.getElementById('clear').onclick = callback.bind(this, 'Escape');
		document.getElementById('backspace').onclick = callback.bind(this, 'Backspace');
		document.getElementById('equal').onclick = callback.bind(this, '=');
		document.getElementById('plus').onclick = callback.bind(this, '+');
		document.getElementById('minus').onclick = callback.bind(this, '-');
		document.getElementById('mult').onclick = callback.bind(this, '*');
		document.getElementById('div').onclick = callback.bind(this, '/');
		document.getElementById('exp').onclick = callback.bind(this, 'e');
    };

    Io.prototype.listenKeyboardInput = function (callback) {

        document.getElementsByTagName("body")[0].onkeydown = function (ev) {
            ev.preventDefault();
            callback(ev.key);
        };
    };

    Io.prototype.updateScreen = function () {
        this.updateSecondaryDisplay();
        this.updateMainDisplay();
    };

    Io.prototype.updateMainDisplay = function () {
        var op = this.operationData;
        if (op.result) {
            mainDisplay.innerHTML = "" + op.result;
        } else if (op.operand2) {
            mainDisplay.innerHTML = "" + op.operand2;
        } else if (op.operand1) {
            mainDisplay.innerHTML = "" + op.operand1;
        } else {
            mainDisplay.innerHTML = '0';
        }
    };

    Io.prototype.updateSecondaryDisplay = function () {
        secondaryDisplay.innerHTML = this.operationData.toString();
    };

    window.Io = Io;
})()
