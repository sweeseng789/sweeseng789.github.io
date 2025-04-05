/**
 * Returns shortened and appended text(with an ellipsis(optional)) to be rendered in dom if it will take more space than the  dom's clientHeight and clientWidth
 * It is recommended to set height/width, max height/max width, word-wrap:break-word of the element before calling this function
 *
 * {String} text: Text Content
 * {dom Element} renderTo : The actual element where the text is to be rendered
 * {Boolean} ellipsis: false if ellipsis is not to be appended to the end of the text
 * @returns {String} returns the new truncated text
 */
function truncateTextToFit  (text, renderTo, ellipsis) {

    //Get initial text in renderTo, to restore it later
    var originalTxtInEl = getDomText(renderTo);
  
     //Get height that a single character would take in this dom
    setDomText('A',renderTo);
    var lineHeight = renderTo.lineHeight || renderTo.scrollHeight;
  
      //Now set input text to renderTo
    setDomText(text,renderTo);
    
    //prevDiff and finalDiff hold the (scrollHeight-clientHeight) value
    var prevDiff = null;
    var finalDiff = renderTo.scrollHeight - renderTo.clientHeight;
  
    //diffCount maintains the number of times the prevDiff and finalDiff have remained equal.
    // This is needed to avoid condition where some text is truncated but the clientheight and scrollheight remains the same
    var diffCount = 0;
  
    //Ensuring that (scrollheight-clientHeight) difference is greater than zero and the diffCount has not increased to 2 to avoid any uncertain circumstances
    // such as scrollHeight always remaining greater than clientHeight
    // 2 is only an estimate
    while (finalDiff > 0 && diffCount != 2) {
      // get current text
      var txt = getDomText(renderTo);
      //Get total height of the current text
      var txtHeight = renderTo.scrollHeight;  
       // Possible number of lines given the dom client height and lineHeight
      var numOfPossibleLines = Math.floor(renderTo.clientHeight / lineHeight);
      // The current actual number of lines
      var numOfTxtLines = Math.ceil(txtHeight / lineHeight);
      // Get the approximate text in a single line of this dom
      var approxTxtInALine = Math.floor(txt.length / numOfTxtLines);
      // numOfCharsToTruncate = approximate number of chars in a line * number of lines to truncate
      var numOfCharsToTruncate = approxTxtInALine * (numOfTxtLines - numOfPossibleLines);
      //Truncate text
      var newInnerText = txt.substr(0, txt.length - numOfCharsToTruncate);
      // append ellipsis to the end if not false
      if (ellipsis !== false) {
        newInnerText = newInnerText + '...';      
      }
      //Finally replace dom text with new shortened text
      setDomText(newInnerText,renderTo);
      prevDiff = finalDiff;
      finalDiff = renderTo.scrollHeight - renderTo.clientHeight;
      if (finalDiff == prevDiff) {
        diffCount++;
      }
    }
  
    setDomText(originalTxtInEl,renderTo);
    return newInnerText || text;
  
  };
  
  /**
   * Sets the text in the Dom
   * {String}text
   * {dom Element} renderTo
   */
  function setDomText (text, renderTo) {
    if (renderTo.textContent) {
      renderTo.textContent = text;
    }
    else {
      renderTo.innerText = text;
    }
  };
  
  /**
   * Gets textContent/innerText of dom
   * {dom Element} renderTo
   * @returns {String} text
   */
  function getDomText (renderTo) {
    return (renderTo.textContent || renderTo.innerText);
  };