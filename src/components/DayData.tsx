import React from 'react';
import {IonCard, IonCardContent, IonAlert, IonCardTitle} from '@ionic/react';
import moment from 'moment';
import vault from '../vault/vault';

interface MyProps {
    selectedDate:any;
}

const typeMap : any = {
    weight:"number",
    calIntakeTarget:"number",
    calsBurnedStairs:"number",
    minutesSpentClimbing:"number",
    stairsClimbed:"number",
    totalCaloriesBurned:"number"
}

class DayData extends React.Component<MyProps>{
    state = {
        editAlert:false,
        editKind:""
    }
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
            <IonCard onClick={()=>this.showEditAlert("weight")}>
                <IonCardContent>
                    Weight
                    <IonCardTitle>
                        {sd.weight}
                    </IonCardTitle>
                </IonCardContent>
            </IonCard>
            <IonCard onClick={()=>this.showEditAlert("calIntakeTarget")}>
                <IonCardContent>
                    Calorie Intake Target
                    <IonCardTitle>
                        {this.citToWord(sd.calIntakeTarget)}
                    </IonCardTitle>
                </IonCardContent>
            </IonCard>
            <IonCard onClick={()=>this.showEditAlert("calsBurnedStairs")}>
                <IonCardContent>
                    Calories Burned on Stairs
                    <IonCardTitle>
                        {sd.calsBurnedStairs}
                    </IonCardTitle>
                </IonCardContent>
            </IonCard>
            <IonCard onClick={()=>this.showEditAlert("minutesSpentClimbing")}>
                <IonCardContent>
                    Minutes Spent Climbing
                    <IonCardTitle>
                        {sd.minutesSpentClimbing}
                    </IonCardTitle>
                </IonCardContent>
            </IonCard>
            <IonCard onClick={()=>this.showEditAlert("stairsClimbed")}>
                <IonCardContent>
                    Stairs Climbed
                    <IonCardTitle>
                        {sd.stairsClimbed}
                    </IonCardTitle>
                </IonCardContent>
            </IonCard>
            <IonCard onClick={()=>this.showEditAlert("totalCaloriesBurned")}>
                <IonCardContent>
                    Total Calories Burned
                    <IonCardTitle>
                        {sd.totalCaloriesBurned}
                    </IonCardTitle>
                </IonCardContent>
            </IonCard>
            <IonAlert
                isOpen={this.state.editAlert}
                onDidDismiss={this.hideEditAlert}
                header={'Edit'}
                inputs={[
                    {
                        name: 'value',
                        type: 'text'
                    }
                ]}
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel'
                    },
                    {
                        text: 'Ok',
                        handler: ({value}:any) => {
                            this.editPoint(value);
                        }
                    }
                ]}
                />
            </>
        )
    }
    editPoint = (value:any) =>{
        if(!value){
            return;
        }
        let sd : any = this.props.selectedDate;
        sd[this.state.editKind] = typeMap[this.state.editKind] === "number" ? parseInt(value) : value;
        if(sd[this.state.editKind]){
            vault.updateValueOnLog(this.state.editKind,sd[this.state.editKind],sd.id);
        }
    }
    showEditAlert = (editKind:string) =>{
        this.setState({editAlert:true,editKind});
    }
    hideEditAlert = () =>{
        this.setState({editAlert:false});
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