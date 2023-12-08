
var ctx;
var W = 300;
var H = 500;
var BLOCK_W;


var oMap = null,
    oGame = null,
    oAudio = null;


var COLS = 10, ROWS = 20;
var board = [];
var lose;
var interval;
var current; 
var currentX, currentY; 
var shapes = [
    [ 1, 1, 1, 1 ],
    [ 1, 1, 1, 0,
      1 ],
    [ 1, 1, 1, 0,
      0, 0, 1 ],
    [ 1, 1, 0, 0,
      1, 1 ],
    [ 1, 1, 0, 0,
      0, 1, 1 ],
    [ 0, 1, 1, 0,
      1, 1 ],
    [ 0, 1, 0, 0,
      1, 1, 1 ]
];


var colors = [
    'cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'purple'
];

var Tetris      = {};



var TETRIS = (function () 
{

    
    function init(wrapper, root) 
    {
        var canvas   = document.createElement("canvas");     
        canvas.setAttribute("width", W + "px");
        canvas.setAttribute("height", H+ "px");
        wrapper.appendChild(canvas);
        ctx  = canvas.getContext('2d');

        oAudio = new Tetris.Audio({"soundDisabled":soundDisabled});
        oMap   = new Tetris.Map();
        oGame   = new Tetris.Engine()

        
        var extension = Modernizr.audio.ogg ? 'ogg' : 'mp3';

        var audio_files = [
            ["winLigne", root + "audio/pop." + extension]
        ];

        load(audio_files, function() { loaded(); });
    
    }

    
  
    function load(arr, callback) 
    {   
       
        if (arr.length === 0) 
            callback();
        else 
        { 
            var x = arr.pop();
            oAudio.load(x[0], x[1], function() { load(arr, callback); });
        }
    };
        

    
    function loaded() 
    {
        console.log("Tetris : fichiers audio chargés.");

        oMap.newGame();

       
        document.body.onkeydown = function( e ) 
        {
           
            var keys = {
                37: 'left',
                39: 'right',
                40: 'down',
                38: 'rotate'
            };

            if ( typeof keys[ e.keyCode ] != 'undefined' ) 
            {
                oMap.keyPress( keys[ e.keyCode ] );
                oGame.render();
            }
        };


        setInterval( oGame.render, 30 );
    };


   
    function soundDisabled() 
    {
        return localStorage["soundDisabled"] === "true";
    };
    

    
    return {
          "init" : init
      };

}());

