export default function setActionTypeStatus(action){
   let method = action.toLowerCase();
   let endOfLine = method.substr(method.indexOf('/') + 1);
    let position = 0;
    while (true) {
        let foundPos = endOfLine.indexOf("_", position);
        if (foundPos == -1) break;
        endOfLine=endOfLine.substring(0,foundPos)+endOfLine[foundPos+1].toUpperCase()+endOfLine.substring(foundPos+2)
        position = foundPos + 1;
    }
    return endOfLine+"Status"
}