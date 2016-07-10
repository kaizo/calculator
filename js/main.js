(function () {
    var operationData = new OperationData();
    var calculator = new Calculator(operationData);
    var io = new Io(operationData);
    io.listen(function (input) {
        calculator.parseInput(input);
        io.updateScreen();
    });
})();
