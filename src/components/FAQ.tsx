import React from 'react';
import {IonButton, IonModal} from '@ionic/react';

interface MyProps{
    faqModal:boolean;
    closeFAQModal:any;
}

class FAQ extends React.Component<MyProps>{
    closeModal = () =>{
        this.props.closeFAQModal();
    }
    render(){
        return(
            <IonModal isOpen={this.props.faqModal}>
                <IonButton
                onClick={this.closeModal}
                >
                    Close
                </IonButton>
            </IonModal>
        )
    }
}

export default FAQ;