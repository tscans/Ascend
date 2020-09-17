import React from 'react';
import {IonCard,IonCardContent,IonCardSubtitle,IonCardTitle,IonIcon
} from '@ionic/react';
import {arrowForwardOutline} from 'ionicons/icons';
import calculation from '../calculation/calculation';

interface MyProps {
    user:any;
}

class WeightBMI extends React.Component<MyProps>{
    render(){
        let u = this.props.user;
        let bmi = calculation.bmiCalculation(parseInt(u.weight),parseInt(u.height));
        let bmie = calculation.bmiEvaluation(bmi);
        let tbmi = calculation.bmiCalculation(parseInt(u.targetWeight),parseInt(u.height));
        let tbmie = calculation.bmiEvaluation(tbmi);
        return(
            <IonCard>
                <IonCardContent style={styles.flatEven}>
                    <div>
                        <IonCardSubtitle>Current Weight</IonCardSubtitle>
                        <IonCardTitle>{u.weight}<span style={styles.lbs}>lbs</span></IonCardTitle>
                    </div>
                    <div>
                        <IonCardSubtitle>To Lose</IonCardSubtitle>
                        <IonCardTitle>
                            {parseFloat(u.weight) - parseFloat(u.targetWeight)}<span style={styles.lbs}>lbs</span>
                        </IonCardTitle>
                    </div>
                    <div>
                        <IonCardSubtitle>Target Weight</IonCardSubtitle>
                        <IonCardTitle>{u.targetWeight}<span style={styles.lbs}>lbs</span></IonCardTitle>
                    </div>
                </IonCardContent>
                <IonCardContent style={styles.flatEven}>
                    <div>
                        <IonCardSubtitle>BMI</IonCardSubtitle>
                        <IonCardTitle><span style={{
                            color:bmie.color
                        }}>{bmi}</span></IonCardTitle>
                        <IonCardSubtitle><span style={{
                            color:bmie.color
                        }}>{bmie.evalu}</span></IonCardSubtitle>
                    </div>
                    <div style={{paddingTop:20}}>
                        <IonIcon
                        size="large"
                        icon={arrowForwardOutline}/>
                    </div>
                    <div>
                        <IonCardSubtitle>Target BMI</IonCardSubtitle>
                        <IonCardTitle><span style={{
                            color:tbmie.color
                        }}>{tbmi}</span></IonCardTitle>
                        <IonCardSubtitle><span style={{
                            color:tbmie.color
                        }}>{tbmie.evalu}</span></IonCardSubtitle>
                    </div>
                </IonCardContent>
            </IonCard>
        )
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

export default WeightBMI;