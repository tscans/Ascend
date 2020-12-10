import React from 'react';
import {IonButton, IonModal, IonCard, IonCardContent} from '@ionic/react';

interface MyProps{
    faqModal:boolean;
    closeFAQModal:any;
}

class FAQ extends React.Component<MyProps>{
    closeModal = () =>{
        this.props.closeFAQModal();
    }
    renderQA = () =>{
        return QandA.map((qa:any)=>{
            return(
                <div key={qa.q} style={{marginBottom:15}}>
                    <b>Question: </b> {qa.q}
                    <br/>
                    <br/>
                    <b>Answer: </b> {qa.a}
                </div>
            )
        });
    }
    render(){
        return(
            <IonModal isOpen={this.props.faqModal}>
                <IonCard>
                    <IonCardContent style={{height:"100%"}}>
                        <div style={{overflow:'auto',height:"100%"}}>
                        {this.renderQA()}
                        </div>
                    </IonCardContent>
                </IonCard>
                <IonButton
                onClick={this.closeModal}
                >
                    Close
                </IonButton>
            </IonModal>
        )
    }
}

const QandA = [
    {
        q:"I've been doing everything the app says but I'm not losing weight.",
        a:`Well, first of all that's not a question. But there are three 
        possibilities when it comes to you not losing weight. Either the app is wrong: 
        which is unlikely but possible. We do a lot of rounding so its not perfect. Physics
        is wrong: this is not at all likely. Or you are wrong: this is very likely and you
        need to be honest with yourself about calories in calories out.`
    },
    {
        q:"Can I backup save my information in the cloud?",
        a:"No, Ascend does not have cloud services at this time."
    },
    {
        q:"Are you recording my information that I put in?",
        a:"No, Ascend does not record any of your information. All data remains on your local device."
    },
    {
        q:"Who made this app?",
        a:"The developer of this app is Tom Scanlan. You can reach him at veerscanlan@gmail.com"
    }
]

export default FAQ;