import React from 'react';
import {IonCard} from '@ionic/react';

interface MyProps{
    data:any;
}

class TotalCard extends React.Component<MyProps>{
    render(){
        console.log(this.props.data);
        return(
            <IonCard>
                Total Card
            </IonCard>
        )
    }
}

export default TotalCard;