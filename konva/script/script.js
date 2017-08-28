window.onload=function()
{
    var stageWidth=500;
    var stageHeight=500;

    var compteur=0;

    var tabForm=[];

    var myCanva=document.getElementById('canva');
    myCanva.addEventListener('mouseup',fitStageIntoParentContainer);
    var mySubmit = document.getElementById('sub');
    mySubmit.addEventListener('click',detectSubmit);

    var stage = new Konva.Stage({
        container:'container', // id of container 
        width:stageWidth,
        height:stageHeight
    });

    // function update forme
    function update(activeAnchor)
    {
        var group = activeAnchor.getParent();
        var topLeft = group.get('.topLeft')[0];
        var topRight = group.get('.topRight')[0];
        var bottomRight = group.get('.bottomRight')[0];
        var bottomLeft = group.get('.bottomLeft')[0];
        var image = group.get('Rect')[0];

        var anchorX = activeAnchor.getX();
        var anchorY = activeAnchor.getY();

        switch (activeAnchor.getName()) {
            case 'topLeft':
                topRight.setY(anchorY);
                bottomLeft.setX(anchorX);
                break;
            case 'topRight':
                topLeft.setY(anchorY);
                bottomRight.setX(anchorX);
                break;
            case 'bottomRight':
                bottomLeft.setY(anchorY);
                topRight.setX(anchorX);
                break;
            case 'bottomLeft':
                bottomRight.setY(anchorY);
                topLeft.setX(anchorX);
                break;
        }

        image.position(topLeft.position());


        var width=topRight.getX() - topLeft.getX();
        var height = bottomLeft.getY() - topLeft.getY();

        if(width && height)
        {
            image.width(width);
            image.height(height);
        }

    }

    // function add anchor for resize
    function addAnchor(group, x, y, name) {
        var stage = group.getStage();
        var layer = group.getLayer();
        var anchor = new Konva.Circle({
            x: x,
            y: y,
            stroke: '#666',
            fill: '#ddd',
            strokeWidth: 2,
            radius: 8,
            name: name,
            draggable: true,
            dragOnTop: false
        });
        anchor.on('dragmove', function() {
            update(this);
            layer.draw();
        });
        anchor.on('mousedown touchstart', function() {
            group.setDraggable(false);
            this.moveToTop();
        });
        anchor.on('dragend', function() {
            group.setDraggable(true);
            layer.draw();
        });
        // add hover styling
        anchor.on('mouseover', function() {
            var layer = this.getLayer();
            document.body.style.cursor = 'pointer';
            this.setStrokeWidth(4);
            layer.draw();
        });
        anchor.on('mouseout', function() {
            var layer = this.getLayer();
            document.body.style.cursor = 'default';
            this.setStrokeWidth(2);
            layer.draw();
        });
        group.add(anchor);
    }

    // update size of canvas in application of resizing window by user
    function fitStageIntoParentContainer()
    {
        var container = document.querySelector('#canva');
        // now we need to fit stage into parent
        var containerWidth = container.offsetWidth;
        var containerHeight = container.offsetHeight;
        // to do this we need to scale the stage
        stage.width(containerWidth-4);
        stage.height(containerHeight-4);
        stage.draw();
    }

    function detectSubmit()
    {
        var myForme = document.getElementById('formCanvas').value;
        switch(myForme)
        {
            case 'rond':
            {

                break;
            }
            case 'triangle':
            {   

                break;
            }
            case 'rect':
            {
                var rect=new Konva.Rect({
                    width: 100,
                    height: 50,
                    fill: 'green',
                    stroke: 'black',
                    strokeWidth: 4,
                    text:compteur
                });

                var rectGroup = new Konva.Group({
                    x:180,
                    y:50,
                    draggable:true
                });

                var form={
                    'group': rectGroup,
                    'forme': rect
                };

                form['group'].on('dragmove',function(){
                    // console.log(rectGroup.position());
                    var vertX=document.getElementById('vertX');
                    var vertY=document.getElementById('vertY');
                    var vertTabPosition=this.position();
                    var vertTabTaille=form['forme'];
                    var vert=this.position();
                    vertX.innerHTML=vert['x'];
                    vertY.innerHTML=vert['y'];
                    vertW.innerHTML=vertTabTaille.getWidth();
                    vertH.innerHTML=vertTabTaille.getHeight();
                    vertTabPosition['x']=vert['x'];
                    vertTabPosition['y']=vert['y'];
                    // console.log(vert);
                    console.log(form['forme'].getWidth());
                });

                tabForm[compteur]=form;
                console.table(tabForm);

                layer.add(rectGroup);
                rectGroup.add(rect);
                addAnchor(rectGroup,0,0,'topLeft');
                addAnchor(rectGroup,100,0,'topRight');
                addAnchor(rectGroup,100,50,'bottomRight');
                addAnchor(rectGroup,0,50,'bottomLeft');

                compteur++;
                stage.add(layer);
                break;
            }
        }

    }


    fitStageIntoParentContainer();

    // create layer
    var layer=new Konva.Layer();

    // add the layer to the stage
    stage.add(layer);

}