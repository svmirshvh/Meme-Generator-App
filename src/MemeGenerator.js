import React from "react";
import "./Meme.css"



class MemeGenerator extends React.Component {
    constructor() {

        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "https://i.imgflip.com/1bij.jpg",
            allMemeImgs: []

        }
        this.handleChange = this.handleChange.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    componentDidMount() {

        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data
                this.setState({ allMemeImgs: memes })
            })


    }

    handleChange(event) {

        const { name, value } = event.target
        this.setState(
            {
                [name]: value
            }
        )
    }
    submitHandler(event) {
        event.preventDefault()
        const randomNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randomNum].url

        this.setState({
            randomImg: randMemeImg
        })
    }

    render() {


        return (

            <div className="meme">
                <div className="title"> Meme Generator</div>
                <form >
                    <input type="text" name="topText" placeholder="type some text here" value={this.state.topText} onChange={this.handleChange} />

                    <input type="text" name="bottomText" placeholder="type some text here" value={this.state.bottomText} onChange={this.handleChange} />
                    <br />

                    <button onClick={this.submitHandler}> <strong>Generate</strong> </button>


                </form>
                <h1 className='top-text'>  {this.state.topText} </h1>
                <img src={this.state.randomImg} className="image" alt="meme" />
                <h1 className='bottom-text'>  {this.state.bottomText} </h1>
            </div>
        )
    }
}

export default MemeGenerator