import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
IonSpinner,IonFab,IonFabButton,IonIcon,IonButtons,IonCard,
IonCardHeader,IonCardTitle,IonCardContent,IonCardSubtitle } from '@ionic/react';
import React from 'react';
import './Home.css';
import vault from '../vault/vault';
import calculation from '../calculation/calculation';
import {RouteComponentProps} from 'react-router';
import {add,personCircle} from 'ionicons/icons';
import MainChart from '../components/MainChart';
import WeekdayChart from '../components/WeekdayChart';

interface MyProps extends RouteComponentProps<{}> {}

class Home extends React.Component<MyProps>{
    state = {
        userInfo:null,
        userData:null
    }
    componentDidMount(){
        this.grabUser();
        this.grabUserData();
    }
    render(){
        console.log(this.state);
        if(!this.state.userInfo || !this.state.userData){
            return(
                <IonSpinner name="crescent" />
            )
        }
        let u : any = this.state.userInfo;
        let ud : any = this.state.userData;
        let bmi = calculation.bmiCalculation(parseInt(u.weight),parseInt(u.height));
        let bmie = calculation.bmiEvaluation(bmi);
        let tbmi = calculation.bmiCalculation(parseInt(u.targetWeight),parseInt(u.height));
        let tbmie = calculation.bmiEvaluation(tbmi);
        return(
            <IonPage>
                <IonContent fullscreen>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Ascend</IonTitle>
                            <IonButtons slot="end">
                                <IonIcon slot="icon-only" icon={personCircle} />
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonCard>
                        <IonCardContent style={styles.flatEven}>
                            
                            <div>
                                <IonCardSubtitle>Current Weight</IonCardSubtitle>
                                <IonCardTitle>{u.weight}<span style={styles.lbs}>lbs</span></IonCardTitle>
                            </div>
                            <div>
                                <IonCardSubtitle>Target Weight</IonCardSubtitle>
                                <IonCardTitle>{u.targetWeight}<span style={styles.lbs}>lbs</span></IonCardTitle>
                            </div>
                            <div>
                                <IonCardSubtitle>To Lose</IonCardSubtitle>
                                <IonCardTitle>
                                    {parseFloat(u.weight) - parseFloat(u.targetWeight)}<span style={styles.lbs}>lbs</span>
                                </IonCardTitle>
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
                    <MainChart data={ud} />
                    <WeekdayChart data={ud}/>
                    <IonFab vertical="bottom" horizontal="end" slot="fixed">
                        <IonFabButton onClick={this.addDayData}>
                            <IonIcon icon={add} />
                        </IonFabButton>
                    </IonFab>
                </IonContent>
            </IonPage>
        )
    }
    grabUser = () =>{
        let user = vault.getUser();
        if(!user){
            this.props.history.push("/");
        }else{
            this.setState({userInfo:user});
        }
    }
    grabUserData = async () =>{
        let userData = await vault.getDayData();
        this.setState({userData});
    }
    addDayData = () =>{
        this.props.history.push("/new-day");
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

export default Home;
