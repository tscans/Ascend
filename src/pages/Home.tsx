import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
IonSpinner,IonFab,IonFabButton,IonIcon,IonButtons } from '@ionic/react';
import React from 'react';
import './Home.css';
import vault from '../vault/vault';
import {RouteComponentProps} from 'react-router';
import {add,personCircle} from 'ionicons/icons';

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
    grabUserData = () =>{
        let userData = vault.getDayData();
        this.setState({userData});
    }
    addDayData = () =>{
        this.props.history.push("/new-day");
    }
}

export default Home;
