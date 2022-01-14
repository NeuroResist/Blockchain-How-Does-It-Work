var widget=document.getElementById('widget');
var blockId=-1;
var stringTwo;
var pr = "";
var notebook=false;
function drawSquare(id,count,target){
    pr="";
    var randomBlock1 = "";
	var size="230px";
	var color='rgb(0,255,0)';
	for(var i=0;i<count;i++){

//ПРОИЗВОЛЬНЫЙ ТЕКСТ
    notebook = $('#notebook').prop('checked');
    if (notebook==true){
    function notebook() {
    var pr = prompt("Введите запись");
    return pr;
    }      
    pr=notebook();}
//ПРОИЗВОЛЬНЫЙ ТЕКСТ
        
        //СОЗДАНИЕ БЛОКА
		var squareDiv=document.createElement('div');
		squareDiv.style.display="inline-block";
		squareDiv.style.marginRight='10px';
        squareDiv.style.marginLeft='10px';
        squareDiv.style.marginTop='10px';
		squareDiv.style.width=size;
		squareDiv.style.height="450px";
		squareDiv.style.backgroundColor=color;
		id.appendChild(squareDiv);
        blockId++; // ID БЛОКА
        
        //ИНФОРМАЦИЯ О БЛОКЕ
        
        //1 - НОМЕР БЛОКА
        var numberBlock=document.createElement('input');
        numberBlock.style.width='50px';
        $(numberBlock).val(blockId);
        $(squareDiv).append("Номер блока:");
        squareDiv.appendChild(numberBlock);
        
        //1.5
        var randomTransaction = Math.floor(Math.random()*9)+1;
        for (var k=0;k<randomTransaction;k++){
            var name = ["Саша","Маша","Петя","Коля","Миша","Рома","Аня","Игорь","Гоша"];
            var randomName1 = Math.floor(Math.random()*9);
            var randomName2 = Math.floor(Math.random()*9);
            var randomNamber = Math.floor(Math.random()*100);
            var randomBlock = name[randomName1]+"_"+randomNamber+"=>"+name[randomName2]+"\n";
            var randomBlock1 =  randomBlock1 + randomBlock;
        }//end for 2
        if (pr!==""){randomBlock1=pr;}
        //2 - ВРЕМЯ СОЗДАНИЯ БЛОКА
        var ms = new Date();
        var ms1 = ms.getTime();
        var timeBlock=document.createElement('input');
        timeBlock.style.marginTop='5px';
        timeBlock.style.width='180px';
        $(timeBlock).val(ms1);
        $(squareDiv).append("<br>Время создания блока:");
        squareDiv.appendChild(timeBlock);
        $(squareDiv).append("<br>Nonce:");
        
        //3 - ХЭШИРОВАНИЕ  TARGET
            var shaObj = new jsSHA("SHA-256", "TEXT");
            shaObj.update(target);
            var targetHash = shaObj.getHash("HEX");
        
        //4 - ПЕРЕБОР ЗНАЧЕНИЙ, МЕНЬШИХ TARGET.
                    
        for (var j=0;j<100000000;j++){
        var allParametrs = blockId.toString()+ms1.toString()+j.toString()+randomBlock1.toString();//СОЕДИНЕНИЕ HEADER БЛОКА
            // ВЫЧИСЛЕНИЕ ХЭША HEADER БЛОКА
        var shaObj1 = new jsSHA("SHA-256", "TEXT");
        shaObj1.update(allParametrs);
        var hash = shaObj1.getHash("HEX");
            //END
        var allParametrs1 = hash.slice(0, 6); //УКОРАЧИВАНИЕ ХЭША ДО 5 СИМВОЛОВ
            allParametrs1 = parseInt(allParametrs1,16); //ПЕРЕВОД ХЭША В 16-РИЧНУЮ СИСТЕМУ
            if (allParametrs1<target)
            {
                //НАХОЖДЕНИЕ ХЭША ПРОШЛОГО БЛОКА
             var childrens = $("#widget").children().length-2;
             var lastHash = $("#widget").children().eq(childrens).children().eq(6).val();
                if (childrens==-1){
                       lastHash = "Это генезис блок.";
                }
                // КОНЕЦ
             break;
            }
        }//end for 1
        //5 - ПОЛЕ NONCE
        var nonce=document.createElement('input');
        nonce.style.width='50px';
        nonce.style.marginTop='5px';
        $(nonce).val(j);
        squareDiv.appendChild(nonce);
        
        //6 - ХЭШ HEADER БЛОКА
        var headerBlock=document.createElement('textarea');
        headerBlock.style.width='220px';
        headerBlock.style.height='45px';
        headerBlock.style.marginTop='5px';
        //$(headerBlock).prop("disabled", true)
        $(headerBlock).val(hash);
        $(squareDiv).append("<br>Хэш:");
        squareDiv.appendChild(headerBlock);        
        
        //7 - БЛОК С ТРАНЗАКЦИЯМИ
        
        //7.1 - СОЗДАНИЕ БЛОКА 
        var transaction=document.createElement('textarea');
        transaction.style.width='220px';
        transaction.style.height='150px';
        transaction.style.marginTop='5px';
        $(squareDiv).append("Транзакции:");
        
        //7.2 - ГЕНЕРИРОВАНИЕ РАНДОМНЫХ ТРАНЗАКЦИЙ И ВСТАВКА ТРАНЗАКЦИЙ
        $(transaction).val(randomBlock1);
        squareDiv.appendChild(transaction);
        
        //8 - ХЭШ ПРЕДЫДУЩЕГО БЛОКА
        $(squareDiv).append("<br>Хэш предыдущего блока:");
        var prevHash=document.createElement('textarea');
        prevHash.style.width='220px';
        prevHash.style.height='45px';
        prevHash.style.marginTop='5px';
        $(prevHash).val(lastHash);
        squareDiv.appendChild(prevHash); 
        
        randomBlock1="";  //ОБНУЛЕНИЕ ТРАНЗАКЦИЙ
        
        var provBlock = $("#widget").children().eq(-2).css("background-color");
        if (provBlock=="rgb(255, 0, 0)"){
        $("#widget").children().last().css("background-color","rgb(255, 0, 0)");
        }
        
        //=================  ДОБАВЛЕНИЕ КЛАССОВ И ТЕКСТА КОММЕНТАРИЕВ БЛОКАМ  =============================== 
        // 1.1 - ID БЛОКА
        $(numberBlock).attr('title', 'Это номер блока. Генезис блок имеет id=0. Каждый новый блок получает id прошлого блока +1'); //ТЕКСТ КОММЕНТАРИЯ 
        $(numberBlock).addClass("tips"); // ДОБАВЛЕНИЕ КЛАССА ДЛЯ КОММЕНТИРОВАНИЯ
        // 1.2 - ВРЕМЯ СОЗДАНИЯ БЛОКА
        $(timeBlock).attr('title', 'Это время создания блока в секундах. Начальной точкой отсчета является 1 января 1970 года в 0:00:00. Время каждого нового блока больше по значению, чем у прошлого.'); //ТЕКСТ КОММЕНТАРИЯ 
        $(timeBlock).addClass("tips"); // ДОБАВЛЕНИЕ КЛАССА ДЛЯ КОММЕНТИРОВАНИЯ
        // 1.3 - ВРЕМЯ СОЗДАНИЯ БЛОКА
        $(nonce).attr('title', 'Это значение показывает, сколько майнер перебрал значений хэша для того, чтобы найти новый блок. Количество таких переборов зависит от заданного поля "target", чем оно меньше - тем будет больше переборов.'); //ТЕКСТ КОММЕНТАРИЯ 
        $(nonce).addClass("tips"); // ДОБАВЛЕНИЕ КЛАССА ДЛЯ КОММЕНТИРОВАНИЯ
        // 1.4 - ХЭШ ФУНКЦИИ
        $(headerBlock).attr('title', 'Это значение является результатом хэширования полей "Номер блока","Время создания блока" и "nonce". В дальнейшем это значение передается в следущий блок в поле "Хэш предыдущего блока" для связывания блоков между собой.'); //ТЕКСТ КОММЕНТАРИЯ 
        $(headerBlock).addClass("tips"); // ДОБАВЛЕНИЕ КЛАССА ДЛЯ КОММЕНТИРОВАНИЯ
        $(transaction).attr('title', 'Это поле со свободной информацией. Любой блок может хранить информацию о чем-либо. Попробуйте активировать Режим "блокнот" и написать свой текст в блок. '); //ТЕКСТ КОММЕНТАРИЯ 
        $(transaction).addClass("tips"); // ДОБАВЛЕНИЕ КЛАССА ДЛЯ КОММЕНТИРОВАНИЯ
        $(prevHash).attr('title', 'Это поле содержит информацию о предыдущем блоке. Таким образом вся цепочка последовательно соединена хэшами предыдущих блоков.'); //ТЕКСТ КОММЕНТАРИЯ 
        $(prevHash).addClass("tips"); // ДОБАВЛЕНИЕ КЛАССА ДЛЯ КОММЕНТИРОВАНИЯ
        //===================================================================================================
        	}//end for 3
 
ppp();// Вызов функции для комментариев.

}//end func square

    //9 - ПРОВЕРКА БЛОКА НА ВАЛИДНОСТЬ (НАЖАТИЕМ КНОПКИ).
        
    //9.1 - ПРОВЕРКА НА ВАЛИДНОСТЬ БЛОКОВ СЕРЕЗ ХЭШ ПРЕДЫДУЩИХ БЛОКОВ.
    //9.2 - ЕСЛИ БЛОК НЕВАЛИДЕН (ИЗ ПРЕДЫДУЩЕГО ПУНКТА), ТО СДЕЛАТЬ БЛОК КРАСНОГО ЦВЕТА.
 function valid(){
        var validBlock = true;
     for (var d=1;d<=blockId;d++){
         var AllHash = $("#widget").children().eq(d).children();
         var AllHash1 = $(AllHash).eq(0);
         var AllHash2 = $(AllHash).eq(2);
         var AllHash3 = $(AllHash).eq(4);
         var AllHash4 = $(AllHash).eq(7);
         var AllHash5 = $(AllHash1).val()+$(AllHash2).val()+$(AllHash3).val()+$(AllHash4).val();
            var Hashing = new jsSHA("SHA-256", "TEXT");
            Hashing.update(AllHash5);
            var HashingNew = Hashing.getHash("HEX");
         console.log(HashingNew);
            var oneMoreHash = $("#widget").children().eq(d).children().eq(6).val();
    
         var prov1 = $("#widget").children().eq(d).children().eq(9).val();
         var prov2 = $("#widget").children().eq(d-1).children().eq(6).val();
             if (prov1==prov2 && HashingNew==oneMoreHash){console.log(d+"_"+blockId)} else {
             $("#widget").children().eq(d).css("background-color","rgb(255, 0, 0)");//ОКРАС В КРАСНЫЙ НЕВАЛИДНЫХ БЛОКОВ
                for (d;d<=blockId;d++) {
                     $("#widget").children().eq(d).css("background-color","rgb(255, 0, 0)");//ОКРАС В КРАСНЫЙ НЕВАЛИДНЫХ БЛОКОВ
                 }//end for
             }//end if
            }//end for
        }//end function
    //================================================================================
function ppp() {
    $( ".tips" ).focus().tooltip({
      show: {
        effect: "slideDown",
        delay: 75
      }

  } );
};
ppp();
//================================================================================