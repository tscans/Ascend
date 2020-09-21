import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
IonSpinner,IonIcon,IonButtons, IonButton} from '@ionic/react';
import React from 'react';
import './Home.css';
import vault from '../vault/vault';
import {RouteComponentProps} from 'react-router';
import {personCircle,filterOutline} from 'ionicons/icons';
import MainChart from '../components/MainChart';
import WeekdayChart from '../components/WeekdayChart';
import WeightBMI from '../components/WeightBMI';
import DailyIntro from '../components/DailyIntro';
import CalendarCard from '../components/CalendarCard';
import TotalCard from '../components/TotalCard';
import FastWindow from '../components/FastWindow';
import FilterModal from '../components/FilterModal';
import FAQ from '../components/FAQ';

interface MyProps extends RouteComponentProps<{}> {}

class Home extends React.Component<MyProps>{
    state = {
        userInfo:null,
        userData:null,
        dataPullTag:"",
        showFilterModal:false,
        filterLogs:[1,30],
        faqModal:false
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
        let fud : any = ud;
        let {showFilterModal,faqModal} = this.state;
        let filterLogs : any = this.state.filterLogs;
        if(filterLogs){
            let left = filterLogs[0];
            let right = filterLogs[1];
            fud = ud.filter((u:any,i:number)=>{
                let rp = (ud.length - 1) - i;
                if(rp >= (left - 1) && rp <= (right - 1)){
                    return true;
                }
                return false;
            });
        }
        let isFilterable = ud.length >= 15;
        return(
            <IonPage>
                <IonContent fullscreen>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Ascend</IonTitle>
                            <IonButtons slot="end" onClick={this.toUserPage}>
                                <IonIcon slot="icon-only" icon={personCircle} />
                            </IonButtons>
                            {
                                isFilterable ? 
                                <IonButtons slot="start" onClick={this.launchFilter}>
                                    <IonIcon slot="icon-only" icon={filterOutline} />
                                </IonButtons>
                                :
                                <></>
                            }
                            
                        </IonToolbar>
                    </IonHeader>
                    <DailyIntro data={ud}/>
                    <FastWindow />
                    <WeightBMI user={u}/>
                    <MainChart data={fud} />
                    <CalendarCard data={fud}/>
                    <WeekdayChart data={fud}/>
                    <TotalCard data={ud}/>

                    <FilterModal 
                    data={ud}
                    filterLogs={this.filterLogs}
                    closeFilter={this.closeFilter}
                    showFilterModal={showFilterModal}/>
                    <IonButton
                    expand={"full"}
                    onClick={this.launchFAQ}
                    >
                        FAQ
                    </IonButton>
                    <FAQ faqModal={faqModal} closeFAQModal={this.closeFAQModal}/>
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
    toUserPage = () =>{
        this.props.history.push("/user");
    }
    launchFilter = () =>{
        this.setState({showFilterModal:true});
    }
    closeFilter = () =>{
        this.setState({showFilterModal:false});
    }
    filterLogs = (filterLogs:any) =>{
        this.setState({filterLogs});
    }
    launchFAQ = () =>{
        this.setState({faqModal:true});
    }
    closeFAQModal = () =>{
        this.setState({faqModal:false});
    }
}



export default Home;
