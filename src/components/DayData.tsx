import React from 'react';
import {IonCard, IonCardContent, IonCardSubtitle} from '@ionic/react';
import moment from 'moment';

interface MyProps {
    selectedDate:any;
}

class DayData extends React.Component<MyProps>{
    render(){
        if(!this.props.selectedDate){
            return <></>;
        }
        console.log(this.props.selectedDate);
        let sd : any = this.props.selectedDate;
        return(
            <IonCard>
                <IonCardContent>
                    <IonCardSubtitle>
                        {moment(sd.dateTime).format("MMMM Do YYYY")}
                    </IonCardSubtitle>
                    
                </IonCardContent>
            </IonCard>
        )
    }
}

export default DayData;