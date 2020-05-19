(function(window, document){
    'use strict';
    /*
    Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
    As regras são:

    - Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
    diretamente;
    - O input deve iniciar com valor zero;
    - Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
    - Deve haver 4 botões para as operações principais: soma (+), subtração(-),
    multiplicação(x) e divisão(÷);
    - Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
    que irá limpar o input, deixando-o com valor 0;

    - A cada número pressionado, o input deve atualizar concatenando cada valor
    digitado, como em uma calculadora real;
    - Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
    operação no input. Se o último caractere no input já for um símbolo de alguma
    operação, esse caractere deve ser substituído pelo último pressionado.
    Exemplo:
    - Se o input tem os valores: "1+2+", e for pressionado o botão de
    multiplicação (x), então no input deve aparecer "1+2x".
    - Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
    input;
    - Ao pressionar o botão "CE", o input deve ficar zerado.
    */

   var $buttonNumber = document.querySelectorAll('[data-js="numeros"]');
   var $buttonOperation = document.querySelectorAll('[data-js="operacao"]');
   var $input = document.querySelector('[data-js="inputCal"]');
   var $operacaoIgual = document.querySelector('[data-js="operacao-igual"]');
   var $operacaoCe = document.querySelector('[data-js="operacao-ce"]');


    Array.prototype.forEach.call( $buttonNumber, function( button ){
        button.addEventListener('click', handleClickNumber, false)
    });

    Array.prototype.forEach.call( $buttonOperation, function( button ){
        button.addEventListener('click', handleClickOperation, false)
    });

    $operacaoCe.addEventListener('click', function () {
        $input.value = 0;
    }, false)

    $operacaoIgual.addEventListener('click', handleClickOperationEqual, false);

    function handleClickOperationEqual(){ 
        
        $input.value = removeOperation($input.value);
        
        var valueTotal = $input.value.match(/\d+[+x÷-]?/g);

        var resultado = valueTotal.reduce(function(total, atual){

            var primeiroValor = total.slice(0, -1);
            var operador = total.split('').pop();
            var ultimoValor = removeOperation(atual);
            var ultimoOperador = lastItem(atual) ? atual.split('').pop() : '';
            
            switch(operador){
                case '+':
                    return  ( +primeiroValor + +ultimoValor ) + ultimoOperador;
                case '-': 
                    return  ( +primeiroValor - +ultimoValor ) + ultimoOperador;
                case 'x':  
                    return  ( +primeiroValor * +ultimoValor ) + ultimoOperador;
                case '÷':  
                    return  ( +primeiroValor / +ultimoValor ) + ultimoOperador;            
     
        
            }
        });

        $input.value = resultado;

    }

    function handleClickNumber(){     
        $input.value += this.value;   
    }

    function handleClickOperation(){   
        $input.value = removeOperation($input.value);  
        $input.value += this.value;   
    }

    function removeOperation(string){
        if (lastItem(string)){
            return string.slice(0,-1);
        }
        return string;
    }

    function lastItem(number){
        var lasItem = number.split('').pop();
        if(lasItem == '+' || lasItem == '-' || lasItem == 'x' || lasItem == '÷'){
            return lasItem;
        }
    }

})(window, document);