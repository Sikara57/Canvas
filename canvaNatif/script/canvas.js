window.onload=function()
{

    var myX=document.getElementById('abscisse');
    var myY=document.getElementById('ordonnee');
    var mySubmit=document.getElementById('sub');
    var myForm=document.getElementById('myForm');
    var myDivCanvas=document.getElementById('canvasContainer');

    var myCanvas=document.getElementById('monCanvas');
    var context=myCanvas.getContext('2d');

    myCanvas.addEventListener('mousemove',coordonnee);
    mySubmit.addEventListener('click',detectSubmit);
    myDivCanvas.addEventListener('mouseup',resizeDiv);

    myCanvas.width = 300;
    myCanvas.height = 300;

    myDivCanvas.style.width=myCanvas.width + 2 + 'px';
    myDivCanvas.style.height=myCanvas.height + 2 + 'px';

    var tabForme = [];


    function coordonnee(event)
    {
        //context.clearRect(0,0,myCanvas.width,myCanvas.height);
        var XYrect=myCanvas.getBoundingClientRect();
        var Xcurseur=Math.round(event.clientX-XYrect.left);
        var Ycurseur=Math.round(event.clientY-XYrect.top);

        myX.innerHTML='X : ' + Xcurseur;
        myY.innerHTML='Y : ' + Ycurseur;
    }

    function detectSubmit()
    {
        var x =document.getElementById('monX');       
        var y =document.getElementById('monY');   
        var forme =document.getElementById('maForme');   
        traceForm(x.value,y.value,forme.value);
        // console.log('Mon X : '+ x.value + ' / Mon Y : ' + y.value + ' / Forme : ' + forme.value);
        myForm.reset();
    }

    function traceForm(x,y,forme)
    {
        var dessinX=parseInt(x);
        var dessinY=parseInt(y);
        context.beginPath();

        switch(forme)
        {
            case 'Rond':
            {
                context.arc(dessinX,dessinY,50,0,Math.PI*2);
                context.fill();
                var forme ={
                    'x':dessinX,
                    'y':dessinY,
                    'r':50
                };
                tabForme.push(forme);
                break;
            }
            case 'Triangle':
            {   
                context.moveTo(dessinX,dessinY);
                context.lineTo(dessinX+50,dessinY-100);
                context.lineTo(dessinX+100,dessinY);
                context.lineTo(dessinX,dessinY);
                context.fill();
                var forme ={
                    'x':dessinX,
                    'y':dessinY,
                    'b':100,
                    'h':100
                };
                tabForme.push(forme);
                break;
            }
            case 'Rectangle':
            {
                context.moveTo(dessinX,dessinY);
                context.lineTo(dessinX+100,dessinY);
                context.lineTo(dessinX+100,dessinY-50);
                context.lineTo(dessinX,dessinY-50);
                context.lineTo(dessinX,dessinY);
                context.fill();
                var forme ={
                    'x':dessinX,
                    'y':dessinY,
                    'l':100,
                    'L':50
                };
                tabForme.push(forme);
                break;
            }
        }
        context.closePath();
        // console.table(tabForme);
    }

    function resizeDiv()
    {
        var myWidth=myDivCanvas.style.width;
        var myHeight=myDivCanvas.style.height;
        myCanvas.width=parseInt(myWidth.substr(-myWidth.length,3)-2);
        myCanvas.height=parseInt(myHeight.substr(-myWidth.length,3)-2);
        
        tabForme.forEach(function(element) {
            if(element.r) traceForm(element.x,element.y,'Rond');
            if(element.b) traceForm(element.x,element.y,'Triangle');
            if(element.l) traceForm(element.x,element.y,'Rectangle');
        }, this);
    }

    if(!myCanvas)
    {
        alert('Impossible de récupérer le canvas !');
        return;
    }

    if(!context)
    {
        alert('Impossible de récupérer le context du canvas !');
        return;
    }

}