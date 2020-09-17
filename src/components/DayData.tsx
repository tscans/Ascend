import React from 'react';
import {IonCard, IonCardContent, IonCardSubtitle, IonCardTitle} from '@ionic/react';
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
            <>
            <IonCard>
                <IonCardContent>
                    Date
                    <IonCardTitle>
                        {moment(sd.dateTime).format("MMMM Do YYYY")}
                    </IonCardTitle>
                </IonCardContent>
            </IonCard>
            <IonCard>
                <IonCardContent>
                    Weight
                    <IonCardTitle>
                        {sd.weight}
                    </IonCardTitle>
                </IonCardContent>
            </IonCard>
            <IonCard>
                <IonCardContent>
                    Calorie Intake Target
                    <IonCardTitle>
                        {this.citToWord(sd.calIntakeTarget)}
                    </IonCardTitle>
                </IonCardContent>
            </IonCard>
            <IonCard>
                <IonCardContent>
                    Calories Burned on Stairs
                    <IonCardTitle>
                        {sd.calsBurnedStairs}
                    </IonCardTitle>
                </IonCardContent>
            </IonCard>
            <IonCard>
                <IonCardContent>
                    Minutes Spent Climbing
                    <IonCardTitle>
                        {sd.minutesSpentClimbing}
                    </IonCardTitle>
                </IonCardContent>
            </IonCard>
            <IonCard>
                <IonCardContent>
                    Stairs Climbed
                    <IonCardTitle>
                        {sd.stairsClimbed}
                    </IonCardTitle>
                </IonCardContent>
            </IonCard>
            <IonCard>
                <IonCardContent>
                    Total Calories Burned
                    <IonCardTitle>
                        {sd.totalCaloriesBurned}
                    </IonCardTitle>
                </IonCardContent>
            </IonCard>
            </>
        )
    }
    citToWord = (cit:number) =>{
        if(cit === 1){
            return "1 - Very Low Calories Intake";
        }
        if(cit === 2){
            return "2 - Low Calorie Intake";
        }
        if(cit === 3){
            return "3 - High Calorie Intake";
        }
        if(cit === 4){
            return "4 - Very High Calorie Intake";
        }
    }
}

export default DayData;