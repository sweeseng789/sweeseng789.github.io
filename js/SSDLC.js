

// Start an alert
function StartAlert(alertText)
{
    alert(alertText);
}

function StringSearchCaseInsensitive(str, strToSearch)
{
    var result = str.search(new RegExp(strToSearch, "i"));
    if (result > 0)
        return true;
    return false;
}

// Check if a string is URL
function IsURL(str) 
{
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
  }

function GetTagName(obj)
{
    return obj.prop("tagName");
}

function FormatDate(toFormat, delimiter)
{
    var stringArray = toFormat.split(delimiter);
    return new Date(stringArray[2], stringArray[1], stringArray[0]);
}

function DateToString(date)
{
    var dateStr= "";

    var month = new Array();
    month[1] = "January";
    month[2] = "February";
    month[3] = "March";
    month[4] = "April";
    month[5] = "May";
    month[6] = "June";
    month[7] = "July";
    month[8] = "August";
    month[9] = "September";
    month[10] = "October";
    month[11] = "November";
    month[12] = "December";

    dateStr += month[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();

    return dateStr;
}

function ResizeMediaLinkViaWidth(newWidth, maxHeight,  mediaLink)
{
    mediaLinkHTML = $(mediaLink.html());

    var currWidth = mediaLinkHTML.attr("width");
    var currHeight = mediaLinkHTML.attr("height");
    var delta = newWidth / currWidth;

    var newHeight = currHeight * delta;
    if(newHeight > maxHeight)
    {
        newHeight = maxHeight;
    }

    mediaLinkHTML.attr("width", newWidth);
    mediaLinkHTML.attr("height", maxHeight);

    return mediaLinkHTML;
}

function Resize()
{

}

function GenerateMediaAttrFromXML(media)
{
    var tag = media.attr("tag");
    var src = media.attr("src");
    var width = media.attr("width");
    var height = media.attr("height");
    var frameBorder = media.attr("frameBorder");
    var allowfullscreen = media.attr("allowfullscreen");

    var attr = {};

    if (tag) 
    {
        attr["tag"] = tag
    }

    if(src)
    {
        attr["src"] = src;
    }
    
    if(width)
    {
        attr["width"] = width;
    }

    if(height)
    {
        attr["height"] = height;
    }

    if(frameBorder)
    {
        attr["frameBorder"] = frameBorder;
    }

    if(allowfullscreen)
    {
        attr["allowfullscreen"] = allowfullscreen;
    }
    
    return attr;
}

function SetUrlParameters(url, delimiter, ...params)
{
    params.forEach(param => 
    {
        url += delimiter + param
    });

    return url;
}

function GetURLParameter(param, delimiter)
{
    var variables = window.location.search.substr(1).split(delimiter);
    for(var i = 0; i < variables.length; ++i)
    {
        var splits = variables[i].split('='); 

        if(splits[0] == param)
        {
            return splits[1];
        }
    }
}

function LoadExcel(filePath, CB_OnLoadFinish)
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", filePath);
    xhr.responseType = "blob";
    xhr.onload = function()
    {
        UploadExcel(xhr.response, CB_OnLoadFinish);
    }
    xhr.send();
}

function UploadExcel(blob, CB_OnLoadFinish)
{
    if(typeof(FileReader) == undefined)
    {
        alert("Not supported");
        return;
    }

    var reader = new FileReader();

    if(reader.readAsBinaryString)
    {
        reader.onload = function(e)
        {
            ProcessExcel(e.target.result, CB_OnLoadFinish);
        };
        reader.readAsBinaryString(blob);
    }
    else //IE Browser
    {
        reader.onload = function(e)
        {
            var data = "";
            var bytes = new Uint8Array(e.target.result);
            bytes.forEach(element =>
            {
               data += String.fromCharCode(element); 
            });
            ProcessExcel(data, CB_OnLoadFinish);
        }
        reader.readAsArrayBuffer(blob);
    }
}

function ProcessExcel(data, CB_OnLoadFinish)
{
    var workBook = XLSX.read(data, {type: 'binary', cellDates: true, cellNF: false, cellText: false});

    var firstSheet = workBook.SheetNames[0];

    var excelRows = XLSX.utils.sheet_to_row_object_array(workBook.Sheets[firstSheet], {raw: false,dateNF: "YYYY-MM-DD"});

    var postList = new Array();
    excelRows.forEach(element =>
    {
        var post = new Post(element.ID,
                            element.Date,
                            element.MediaLink,
                            element.Text,
                            element.Tag);
        postList.push(post);
    });
    sessionStorage.setItem("PostData", JSON.stringify(postList));

    CB_OnLoadFinish();
}

function GetAllPostData()
{
    return JSON.parse(sessionStorage.getItem("PostData"));
}

function GetPostViaDate(year, month, day)
{
    var post = undefined;
    GetAllPostData().forEach(element =>
    {
        var date = new Date(element.date);

        if(date.getFullYear() == year &&
           (date.getMonth() + 1) == month &&
           date.getDate() == day)
        {
            post = element;
            return;
        }
    });

    return post;
}

function SubString(length, string)
{
    // var temp = toCheck.substr(0, count);
    // if(temp.lastIndexOf('<') > temp.lastIndexOf('>'))
    // {
    //     temp = toCheck.substr(0, 1 + toCheck.indexOf('>', temp.lastIndexOf('<')));
    // }

    // return temp;

    // var result = str.substr(0, len),
    //     lastOpening = result.lastIndexOf('<'),
    //     lastClosing = result.lastIndexOf('>');

    // if (lastOpening !== -1 && (lastClosing === -1 || lastClosing < lastOpening)) {
    //     result += str.substring(len, str.indexOf('>', len) + 1);
    // }

    // return result;


    // var openTag = 0;
    // var closeTag = 0;
    // for(var i = 0; i < str.length; ++i)
    // {

    // }

    var noHTML = string.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ');
    var subStringNoHTML = noHTML.substr(0, noHTML.indexOf(" ", length));
    var words = subStringNoHTML.split(" ");

    var outPutString = "";
    var wordIndexes = [];

    words.forEach((word, key) => {

        if (key == 0) {

            outPutString += string.substr(0, string.indexOf(word) + word.length);
            wordIndexes[key] = string.indexOf(word) + word.length;

        } else {

            let i = wordIndexes[key - 1];

            outPutString += string.substring(i, string.indexOf(word, i) + word.length);
            wordIndexes[key] = string.indexOf(word, i) + word.length;

        }
    });

    return outPutString;
}