
document.addEventListener("DOMContentLoaded", function () {
    const result = document.getElementById("result");
    const buttons = document.querySelectorAll(".btn");

    let expression = '';

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const value = this.value;

            switch (value) {
                case '=':
                    try {
                        result.value = eval(expression);
                    } catch (error) {
                        result.value = 'Error';
                    }
                    break;
                case 'C':
                    result.value = '';
                    expression = '';
                    break;
                case 'DEL':
                    expression = expression.slice(0, -1);
                    result.value = expression;
                    break;
                case 'X':
                    expression += '*';
                    result.value = expression;
                    break;
                case '%':
                    expression += '/100';
                    result.value = expression;
                    break;
                default:
                    expression += value;
                    result.value = expression;
            }
        });
    });
});
