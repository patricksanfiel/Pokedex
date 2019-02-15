const Formatter = (string) => {
        let formattedString = string
        let currentMove = ""
        while(formattedString.includes("-")){
            formattedString = formattedString.replace("-", " ")
        }

        formattedString.split(" ").forEach(word=>{
            let firstChar = word[0]
            formattedString = word.replace(firstChar, firstChar.toUpperCase())
            currentMove = currentMove===""?currentMove+formattedString: currentMove+" "+formattedString
        })
        return currentMove
}



export default Formatter