import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
IonSpinner,IonFab,IonFabButton,IonIcon,IonButtons} from '@ionic/react';
import React from 'react';
import './Home.css';
import vault from '../vault/vault';
import {RouteComponentProps} from 'react-router';
import {personCircle} from 'ionicons/icons';
import MainChart from '../components/MainChart';
import WeekdayChart from '../components/WeekdayChart';
import WeightBMI from '../components/WeightBMI';
import DailyIntro from '../components/DailyIntro';
import CalendarCard from '../components/CalendarCard';
import TotalCard from '../components/TotalCard';

interface MyProps extends RouteComponentProps<{}> {}

class Home extends React.Component<MyProps>{
    state = {
        userInfo:null,
        userData:null,
        dataPullTag:""
    }
    componentDidMount(){
        this.getAllData();
        vault.setVaultNotifier(this.getAllData);
    }
    getAllData = () =>{
        this.grabUser();
        this.grabUserData();
    }
    render(){
        if(!this.state.userInfo || !this.state.userData){
            return(
                <IonSpinner name="crescent" />
            )
        }
        let u : any = this.state.userInfo;
        let ud : any = this.state.userData;
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
                    <DailyIntro data={ud}/>
                    <WeightBMI user={u}/>
                    <MainChart data={ud} />
                    <CalendarCard data={ud}/>
                    <WeekdayChart data={ud}/>
                    <TotalCard />
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



export default Home;
