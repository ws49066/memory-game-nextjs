export default class Card {
    #index:string
    #imageName:string
    #selected:boolean
    
    constructor(index:string, image:string, selected:boolean=false){
        this.#index = index
        this.#imageName = image
        this.#selected = selected
    }   

    get index(){
        return this.#index
    }

    get image(){
        return this.#imageName
    }

    get selected(){
        return this.#selected
    }

    set selected(selected:boolean){
        this.#selected = selected
    }
}