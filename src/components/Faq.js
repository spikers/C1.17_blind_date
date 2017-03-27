import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';

const div = {
    width: "90%",
    margin: "5% auto"
}
const question = {
    lineHeight: '200%',
    fontWeight: 'bold',
    color: 'rgb(194, 24, 91)',
    fontSize: '4vw'
}
const answer = {
    lineHeight: '200%',
}

class Faq extends Component {
    render(){
        return(
            <div>
                <AppBar
                    title="FAQ"
                />
                <div style={div}>
                    <p style={question}>Q: How does WYNK work and how is it different from the others? </p>
                    <p style={answer}>We plan the dating for you by providing the activity and a place to eat</p>
                    <p style={question}>Q: I connected with a match. Now what do I do?</p>
                    <p style={answer}>Click the chatting icon on the bottom right corner, talk to your match and pick a day to meet up!</p>
                    <p style={question}>Q: How do I delete my account?</p>
                    <p style={answer}>Sorry, you can't...</p>
                    <p style={question}>Q: I'm having problems logging in.</p>
                    <p style={answer}>Please contact Tim Feng for technical issues. timfeng@wynk.world</p>
                    <p style={question}>Q: I'm having other technical issues.</p>
                    <p style={answer}>Please contact Tim Feng for technical issues. timfeng@wynk.world</p>
                </div>
            </div>
        )
    }
}
export default Faq;