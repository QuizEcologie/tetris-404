


console.log("Tetris Lancement du jeu.");



Tetris.Map = function () 
{

 
    function newShape() 
    {
        var id = Math.floor( Math.random() * shapes.length );
        var shape = shapes[ id ]; 
        current = [];
        for ( var y = 0; y < 4; ++y ) 
        {
            current[ y ] = [];

            for ( var x = 0; x < 4; ++x ) 
            {
                var i = 4 * y + x;

                if ( typeof shape[ i ] != 'undefined' && shape[ i ] )
                    current[ y ][ x ] = id + 1;
                else 
                    current[ y ][ x ] = 0;
            }
        }

        
        currentX = 5;
        currentY = 0;
    }


    function init() 
    {
        for ( var y = 0; y < ROWS; ++y ) 
        {
            board[ y ] = [];

            for ( var x = 0; x < COLS; ++x ) 
            {
                board[ y ][ x ] = 0;
            }
        }
    }


   
    function getStatus() 
    {
        if (lose) 
            return true;

        return false;
    }


   
    function tick() 
    {
        if ( valid( 0, 1 ) )
            ++currentY;
       
        else 
        {
            freeze();
            clearLines();

          
            if (lose) 
            {
                console.log("Tetris : perdu !!!");

                
                dialog("Perdu.. Too Bad :( ");
                clearInterval(interval);

                
                return false;
            }
            else
                newShape();
        }
    }


    
    function dialog(text) 
    {
        ctx.fillStyle = "#800080";
        ctx.font      = "Bold 25px Arial";
        
        var width = ctx.measureText(text).width,
            x     = 10,
            y     =  50;        
        

        var nSpace = 30;
        addTextBackground(ctx, x, y, width+20, 70, '#fff' ); 
        addMultiLineText(text, x+20, y+30, nSpace, width, ctx);
    }


    function freeze() 
    {
        for ( var y = 0; y < 4; ++y ) 
        {
            for ( var x = 0; x < 4; ++x ) 
            {
                if ( current[ y ][ x ] )
                    board[ y + currentY ][ x + currentX ] = current[ y ][ x ];
            }
        }
    }


   
    function rotate( current ) 
    {
        var newCurrent = [];

        for ( var y = 0; y < 4; ++y ) 
        {
            newCurrent[ y ] = [];

            for ( var x = 0; x < 4; ++x ) 
            {
                newCurrent[ y ][ x ] = current[ 3 - x ][ y ];
            }
        }

        return newCurrent;
    }


    
    function clearLines() 
    {
        for ( var y = ROWS - 1; y >= 0; --y ) 
        {
            var rowFilled = true;
            for ( var x = 0; x < COLS; ++x ) 
            {
                if ( board[ y ][ x ] == 0 ) 
                {
                    rowFilled = false;
                    break;
                }
            }

            
            if ( rowFilled ) 
            {
                oAudio.play("winLigne");

                for ( var yy = y; yy > 0; --yy ) 
                {
                    for ( var x = 0; x < COLS; ++x ) 
                    {
                        board[ yy ][ x ] = board[ yy - 1 ][ x ];
                    }
                }
                ++y;
            }
        }
    }


    function keyPress( key ) 
    {
        
        switch ( key ) 
        {
            case 'left':
                if ( valid( -1 ) )
                    --currentX;
                break;

            case 'right':
                if ( valid( 1 ) )
                    ++currentX;
                break;

            case 'down':
                if ( valid( 0, 1 ) )
                    ++currentY;
                break;

            case 'rotate':
                var rotated = rotate( current );

                if ( valid( 0, 0, rotated ) )
                    current = rotated;
                break;
        }
    }

    
    
    function valid( offsetX, offsetY, newCurrent ) 
    {
        offsetX = offsetX || 0;
        offsetY = offsetY || 0;
        offsetX = currentX + offsetX;
        offsetY = currentY + offsetY;
        newCurrent = newCurrent || current;

        for ( var y = 0; y < 4; ++y ) 
        {
            for ( var x = 0; x < 4; ++x ) 
            {
                if ( newCurrent[ y ][ x ] ) 
                {
                    if ( typeof board[ y + offsetY ] == 'undefined'
                      || typeof board[ y + offsetY ][ x + offsetX ] == 'undefined'
                      || board[ y + offsetY ][ x + offsetX ]
                      || x + offsetX < 0
                      || y + offsetY >= ROWS
                      || x + offsetX >= COLS ) 
                    {
                        if (offsetY == 1) 
                            lose = true; 
                       
                        return false;
                    }
                }
            }
        }
        return true;
    }


    
    function newGame() 
    {
        clearInterval(interval);
        init();
        newShape();
        lose = false;
        interval = setInterval( tick, 250 );
    };


    
    return {
        "newGame"         : newGame,
        "getStatus"       : getStatus,
        "dialog"          : dialog,
        "keyPress"        : keyPress
    };

};