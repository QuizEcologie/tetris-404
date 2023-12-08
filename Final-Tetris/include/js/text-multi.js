
function addMultiLineText(text, x, y, lineHeight, fitWidth, oContext, bDebug)
{
    var draw = x !== null && y !== null;

    text = text.replace(/(\r\n|\n\r|\r|\n)/g, "\n");
    sections = text.split("\n");

    var i, str, wordWidth, words, currentLine = 0,
        maxHeight = 0,
        maxWidth = 0;

    var printNextLine = function(str)
    {
        if (draw)
            oContext.fillText(str, x, y + (lineHeight * currentLine));

        currentLine++;
        wordWidth = oContext.measureText(str).width;
       
        if (wordWidth > maxWidth)
            maxWidth = wordWidth;
    };

    for (i = 0; i < sections.length; i++) 
    {
        words = sections[i].split(' ');
        index = 1;

        while (words.length > 0 && index <= words.length) 
        {
            str = words.slice(0, index).join(' ');
            wordWidth = oContext.measureText(str).width;

            if (wordWidth > fitWidth) 
            {
                if (index === 1)
                {
                   
                    str = words.slice(0, 1).join(' ');
                    words = words.splice(1);
                } 
                else 
                {
                    str = words.slice(0, index - 1).join(' ');
                    words = words.splice(index - 1);
                }

                printNextLine(str);

                index = 1;
            } 
            else
                index++;
        }

        
        if (index > 0)
            printNextLine(words.join(' '));
    }

    maxHeight = lineHeight * (currentLine);

    if (bDebug)
        oContext.strokeRect(x, y, maxWidth, maxHeight);

    if (!draw) 
    {
        return {
            height: maxHeight,
            width: maxWidth
        };
    }
};





function addTextBackground(oContext, x, y, width, height, color) 
{
    oContext.save();
    oContext.textBaseline = 'top';
    oContext.fillStyle = color;
    oContext.fillRect(x, y, width, height);
    oContext.restore();
}


