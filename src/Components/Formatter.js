const Formatter = (string) => {
        let formattedMove = string
        let currentMove = ""
        if(formattedMove.includes("-")){
            formattedMove = formattedMove.replace("-", " ")
        }

        formattedMove.split(" ").forEach(word=>{
            let firstChar = word[0]
            formattedMove = word.replace(firstChar, firstChar.toUpperCase())
            currentMove = currentMove===""?currentMove+formattedMove: currentMove+" "+formattedMove
        })
        return currentMove
}



export default Formatter