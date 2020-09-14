import React from 'react';
import {IonCard,IonButton,IonCardTitle, IonCardContent,
IonCardSubtitle} from '@ionic/react';
import moment from 'moment';
import {RouteComponentProps,withRouter} from 'react-router';


interface MyProps extends RouteComponentProps<{}> {
    data:any;
}

class DailyIntro extends React.Component<MyProps>{
    render(){
        let today = this.calculateToday();
        if(!today){
            return (
                <IonCard>
                    <IonCardContent>
                        <IonCardTitle>
                            Record Today
                        </IonCardTitle>
                        Be sure to record often for the best metrics.
                        <IonButton style={{marginTop:10}} 
                        onClick={this.toRecord}
                        color="primary">
                            Enter Info
                        </IonButton>
                    </IonCardContent>
                </IonCard>
            )
        }
        return(
            <></>
        )
    }
    toRecord = () =>{
        this.props.history.push("/new-day");
    }
    calculateToday = () =>{
        let ud : any = this.props.data;
        let val = ud.find((u:any)=>u.dateId===moment(new Date()).format("MM|DD|YYYY"));
        if(val){
            return val;
        }
        return null;
    }
}

const styles = {
    flatEven:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    lbs:{
        fontSize:12
    }
}


export default withRouter(DailyIntro);